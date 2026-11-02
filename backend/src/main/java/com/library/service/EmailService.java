package com.library.service;

public interface EmailService {
    /**
     * Gửi mã OTP xác thực tới hộp thư Email thật của người dùng qua giao thức SMTP.
     *
     * @param toEmail Địa chỉ email nhận mã
     * @param otpCode Mã OTP 6 chữ số
     * @param purpose Mục đích gửi (REGISTER, LOGIN_2FA, RESET_PASSWORD)
     * @return EmailSendResult chứa trạng thái và thông điệp chi tiết
     */
    EmailSendResult sendOtpEmail(String toEmail, String otpCode, String purpose);

    record EmailSendResult(boolean success, String message) {}
}
