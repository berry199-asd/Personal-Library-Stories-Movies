package com.library.exception;

import org.springframework.http.HttpStatus;

public class AccessDeniedCustomException extends AppException {

    public AccessDeniedCustomException(String message) {
        super(HttpStatus.FORBIDDEN, message);
    }
}
