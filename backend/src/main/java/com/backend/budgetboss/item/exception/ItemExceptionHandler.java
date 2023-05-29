package com.backend.budgetboss.item.exception;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ProblemDetail;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.io.IOException;

@RestControllerAdvice
public class ItemExceptionHandler {
    private final Logger logger = LoggerFactory.getLogger(ItemExceptionHandler.class);

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

        return new ResponseEntity<>(problemDetail, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(AccountRequestException.class)
    public ResponseEntity<ProblemDetail> handleItemExceptionHandler(AccountRequestException e) {
        logger.error(e.getMessage());

        ProblemDetail problemDetail = ProblemDetail.forStatusAndDetail(e.getStatus(), e.getMessage());
        problemDetail.setTitle("Item Exception Handler");

        return new ResponseEntity<>(problemDetail, e.getStatus());
    }
}
