package com.backend.budgetboss.account.exception;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ProblemDetail;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.parameters.P;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.io.IOException;

@RestControllerAdvice
public class AccountExceptionHandler {
    private final Logger logger = LoggerFactory.getLogger(AccountExceptionHandler.class);
    @ExceptionHandler(IOException.class)
    public ProblemDetail handleIOException(IOException e) {
        logger.error(e.getMessage());

        ProblemDetail problemDetail = ProblemDetail.forStatusAndDetail(HttpStatus.INTERNAL_SERVER_ERROR, e.getMessage());
        problemDetail.setTitle("IO Exception");

        return problemDetail;
    }

    @ExceptionHandler(TokenCreationException.class)
    public ResponseEntity<ProblemDetail> handleTokenCreationException(TokenCreationException e) {
        logger.error(e.getMessage());

        ProblemDetail problemDetail = ProblemDetail.forStatusAndDetail(HttpStatus.BAD_REQUEST, e.getMessage());
        problemDetail.setTitle("Token Creation Exception");

        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(problemDetail);
    }
}
