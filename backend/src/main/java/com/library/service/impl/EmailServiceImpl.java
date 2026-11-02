package com.library.service.impl;

import com.library.service.EmailService;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.MailAuthenticationException;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class EmailServiceImpl implements EmailService {

    private final JavaMailSender mailSender;

    @Value("${spring.mail.username:your-email@gmail.com}")
    private String fromEmail;

    @Override
    public EmailSendResult sendOtpEmail(String toEmail, String otpCode, String purpose) {
        if (fromEmail == null || fromEmail.contains("your-email@gmail.com") || fromEmail.isBlank()) {
            log.warn("⚠️ [SMTP Warning] Chưa cấu hình thông tin gửi email thật (spring.mail.username / spring.mail.password).");
            return new EmailSendResult(false, "Chưa cấu hình tài khoản gửi email SMTP trong backend application.properties.");
        }

        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");

            helper.setFrom(fromEmail, "Mê Truyện");
            helper.setTo(toEmail);

            String subject = switch (purpose != null ? purpose.toUpperCase() : "DEFAULT") {
                case "LOGIN_2FA" -> "Mã xác thực 2 lớp (2FA) đăng nhập - Mê Truyện";
                case "RESET_PASSWORD" -> "Mã OTP đặt lại mật khẩu - Mê Truyện";
                default -> "Mã xác thực OTP đăng ký tài khoản - Mê Truyện";
            };
            helper.setSubject(subject);

            String html = """
                <div style="font-family: Arial, sans-serif; max-width: 560px; margin: 0 auto; background: #0f0a1c; color: #f1f5f9; padding: 28px; border-radius: 14px; border: 1px solid #3b2a54;">
                    <div style="text-align: center; margin-bottom: 20px;">
                        <h2 style="color: #a78bfa; margin: 0;">MÊ TRUYỆN STORIES UNBOUND</h2>
                        <p style="color: #94a3b8; font-size: 13px; margin: 4px 0 0;">Xác thực tài khoản người dùng</p>
                    </div>
                    <div style="background: #191228; padding: 20px; border-radius: 10px; border: 1px solid #4c356e; text-align: center;">
                        <p style="margin-top: 0; font-size: 14px; color: #cbd5e1;">Mã xác thực OTP của bạn là:</p>
                        <div style="font-size: 32px; font-weight: bold; letter-spacing: 6px; color: #34d399; margin: 16px 0; font-family: monospace;">%s</div>
                        <p style="font-size: 12px; color: #a78bfa; margin-bottom: 0;">Mã có hiệu lực trong vòng <b>5 phút</b>. Tuyệt đối không chia sẻ mã này với bất kỳ ai.</p>
                    </div>
                    <p style="font-size: 11px; color: #64748b; margin-top: 24px; text-align: center;">Nếu bạn không yêu cầu mã này, vui lòng bỏ qua email.</p>
                </div>
            """.formatted(otpCode);

            helper.setText(html, true);
            mailSender.send(message);
            log.info("✅ [SMTP Success] Đã gửi mã OTP thành công tới email: {}", toEmail);
            return new EmailSendResult(true, "Đã gửi mã OTP thành công tới email!");
        } catch (MailAuthenticationException authEx) {
            log.error("❌ [SMTP Auth Error] Google từ chối mật khẩu thông thường: {}", authEx.getMessage());
            return new EmailSendResult(false, "Lỗi xác thực Gmail: Google không chấp nhận mật khẩu thường. Bạn cần bật 'Xác minh 2 bước' và tạo 'Mật khẩu ứng dụng' (16 chữ số) cho tài khoản Gmail.");
        } catch (Exception ex) {
            log.error("❌ [SMTP Error] Gặp lỗi khi gửi email qua SMTP: {}", ex.getMessage());
            return new EmailSendResult(false, "Lỗi gửi email qua SMTP: " + ex.getMessage());
        }
    }
}
