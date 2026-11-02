package com.library.security;

import com.library.exception.BadRequestException;
import com.library.service.EmailService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.security.SecureRandom;
import java.time.Instant;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Service
@RequiredArgsConstructor
@Slf4j
public class OtpVerificationService {

    private static final long OTP_TTL_SECONDS = 300; // 5 phút
    private static final int MAX_ATTEMPTS = 5;

    private final Aes256CryptoUtil cryptoUtil;
    private final EmailService emailService;
    private final SecureRandom secureRandom = new SecureRandom();
    private final Map<String, OtpRecord> otpStore = new ConcurrentHashMap<>();

    public OtpDispatchResult generateAndSendOtp(String email, String purpose) {
        String normalizedKey = buildKey(email, purpose);
        int code = 100000 + secureRandom.nextInt(900000);
        String otpCode = String.valueOf(code);
        String otpHash = cryptoUtil.sha256Hex(otpCode + ":" + normalizedKey);
        Instant expiresAt = Instant.now().plusSeconds(OTP_TTL_SECONDS);

        otpStore.put(normalizedKey, new OtpRecord(otpHash, expiresAt, 0, false));

        // Tiến hành gửi email thật qua SMTP
        EmailService.EmailSendResult sendResult = emailService.sendOtpEmail(email.trim(), otpCode, purpose);
        if (!sendResult.success()) {
            log.info("ℹ️ [OTP Info] Email chưa được gửi qua SMTP: {}. Mã OTP cho tài khoản {}: {}", sendResult.message(), email, otpCode);
        }

        return new OtpDispatchResult(email.trim().toLowerCase(), purpose, OTP_TTL_SECONDS, expiresAt.toString(), sendResult.success(), sendResult.message());
    }

    public boolean verifyOtp(String email, String purpose, String otpCode) {
        String normalizedKey = buildKey(email, purpose);
        OtpRecord record = otpStore.get(normalizedKey);
        if (record == null) {
            throw new BadRequestException("Chưa có mã OTP nào được tạo cho email này hoặc mã đã hết hạn.");
        }
        if (Instant.now().isAfter(record.expiresAt())) {
            otpStore.remove(normalizedKey);
            throw new BadRequestException("Mã OTP đã hết hạn (quá 5 phút). Vui lòng yêu cầu gửi lại mã mới.");
        }
        if (record.attempts() >= MAX_ATTEMPTS) {
            otpStore.remove(normalizedKey);
            throw new BadRequestException("Bạn đã nhập sai mã OTP quá 5 lần. Vui lòng yêu cầu mã OTP mới.");
        }

        String candidateHash = cryptoUtil.sha256Hex(otpCode.trim() + ":" + normalizedKey);
        if (!candidateHash.equals(record.otpHash())) {
            otpStore.put(normalizedKey, new OtpRecord(record.otpHash(), record.expiresAt(), record.attempts() + 1, false));
            throw new BadRequestException("Mã OTP không chính xác. Vui lòng kiểm tra lại.");
        }

        otpStore.put(normalizedKey, new OtpRecord(record.otpHash(), record.expiresAt(), record.attempts(), true));
        return true;
    }

    private String buildKey(String email, String purpose) {
        return (email == null ? "" : email.trim().toLowerCase()) + "::" + (purpose == null ? "REGISTER" : purpose.trim().toUpperCase());
    }

    private record OtpRecord(String otpHash, Instant expiresAt, int attempts, boolean verified) {}

    public record OtpDispatchResult(
            String email,
            String purpose,
            long expiresInSeconds,
            String expiresAt,
            boolean sentViaSmtp,
            String smtpMessage
    ) {}
}
