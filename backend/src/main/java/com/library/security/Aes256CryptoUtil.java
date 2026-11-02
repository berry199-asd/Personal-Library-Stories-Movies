package com.library.security;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.crypto.Cipher;
import javax.crypto.SecretKey;
import javax.crypto.SecretKeyFactory;
import javax.crypto.spec.GCMParameterSpec;
import javax.crypto.spec.PBEKeySpec;
import javax.crypto.spec.SecretKeySpec;
import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.SecureRandom;
import java.security.spec.KeySpec;
import java.util.Base64;
import java.util.HexFormat;

/**
 * Tiện ích mã hóa chuẩn AES-256-GCM (Galois/Counter Mode) & Băm toàn vẹn SHA-256
 * dùng để bảo vệ tin nhắn E2EE, ghi chú riêng tư và dữ liệu nhạy cảm.
 */
@Component
public class Aes256CryptoUtil {

    private static final String AES_ALGORITHM = "AES/GCM/NoPadding";
    private static final int GCM_IV_LENGTH = 12; // 96 bits chuẩn NIST cho AES-GCM
    private static final int GCM_TAG_LENGTH = 128; // 128 bits authentication tag
    private static final int AES_KEY_SIZE = 256;
    private static final int PBKDF2_ITERATIONS = 65536;

    private final SecretKey masterKey;
    private final SecureRandom secureRandom = new SecureRandom();

    public Aes256CryptoUtil(
            @Value("${app.security.aes-secret:PersonalLibraryStoriesMoviesAes256SecretKey2026!}") String secret,
            @Value("${app.security.aes-salt:PersonalLibraryAes256Salt2026}") String salt
    ) {
        this.masterKey = deriveAes256Key(secret, salt);
    }

    public SecretKey deriveAes256Key(String passphrase, String salt) {
        try {
            SecretKeyFactory factory = SecretKeyFactory.getInstance("PBKDF2WithHmacSHA256");
            KeySpec spec = new PBEKeySpec(
                    passphrase.toCharArray(),
                    salt.getBytes(StandardCharsets.UTF_8),
                    PBKDF2_ITERATIONS,
                    AES_KEY_SIZE
            );
            byte[] keyBytes = factory.generateSecret(spec).getEncoded();
            return new SecretKeySpec(keyBytes, "AES");
        } catch (Exception e) {
            throw new IllegalStateException("Không thể khởi tạo khóa AES-256", e);
        }
    }

    public EncryptedPayload encrypt(String plainText) {
        if (plainText == null) {
            plainText = "";
        }
        try {
            byte[] iv = new byte[GCM_IV_LENGTH];
            secureRandom.nextBytes(iv);

            Cipher cipher = Cipher.getInstance(AES_ALGORITHM);
            GCMParameterSpec parameterSpec = new GCMParameterSpec(GCM_TAG_LENGTH, iv);
            cipher.init(Cipher.ENCRYPT_MODE, masterKey, parameterSpec);

            byte[] cipherBytes = cipher.doFinal(plainText.getBytes(StandardCharsets.UTF_8));
            String cipherBase64 = Base64.getEncoder().encodeToString(cipherBytes);
            String ivHex = HexFormat.of().formatHex(iv);
            String sha256 = sha256Hex(plainText);

            return new EncryptedPayload(cipherBase64, ivHex, "AES-256-GCM", sha256);
        } catch (Exception e) {
            throw new IllegalStateException("Lỗi mã hóa AES-256-GCM", e);
        }
    }

    public String decrypt(String cipherBase64, String ivHex) {
        if (cipherBase64 == null || cipherBase64.isBlank() || ivHex == null || ivHex.isBlank()) {
            return "";
        }
        try {
            byte[] iv = HexFormat.of().parseHex(ivHex);
            byte[] cipherBytes = Base64.getDecoder().decode(cipherBase64);

            Cipher cipher = Cipher.getInstance(AES_ALGORITHM);
            GCMParameterSpec parameterSpec = new GCMParameterSpec(GCM_TAG_LENGTH, iv);
            cipher.init(Cipher.DECRYPT_MODE, masterKey, parameterSpec);

            byte[] plainBytes = cipher.doFinal(cipherBytes);
            return new String(plainBytes, StandardCharsets.UTF_8);
        } catch (Exception e) {
            throw new IllegalStateException("Không thể giải mã dữ liệu AES-256-GCM (Khóa hoặc IV không hợp lệ)", e);
        }
    }

    public String sha256Hex(String input) {
        try {
            MessageDigest digest = MessageDigest.getInstance("SHA-256");
            byte[] hash = digest.digest((input == null ? "" : input).getBytes(StandardCharsets.UTF_8));
            return HexFormat.of().formatHex(hash);
        } catch (Exception e) {
            throw new IllegalStateException("Lỗi băm SHA-256", e);
        }
    }

    public record EncryptedPayload(
            String cipherText,
            String iv,
            String algorithm,
            String sha256Hash
    ) {}
}
