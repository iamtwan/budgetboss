package com.backend.budgetboss.item.exception;

import com.backend.budgetboss.token.exception.TokenCreationException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
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

    @ExceptionHandler(AccountRequestException.class)
    public ResponseEntity<ProblemDetail> handleItemExceptionHandler(AccountRequestException e) {
        logger.error(e.getMessage());

        ProblemDetail problemDetail = ProblemDetail.forStatusAndDetail(e.getStatus(), e.getMessage());
        problemDetail.setTitle("Item Exception Handler");

        return new ResponseEntity<>(problemDetail, e.getStatus());
    }

    @ExceptionHandler(ItemDoesNotBelongToUserException.class)
    public ResponseEntity<ProblemDetail> handleItemDoesNotBelongToUserException(ItemDoesNotBelongToUserException e) {
        logger.error(e.getMessage());

        ProblemDetail problemDetail = ProblemDetail.forStatusAndDetail(HttpStatus.FORBIDDEN, e.getMessage());
        problemDetail.setTitle("Item Exception Handler");

        return new ResponseEntity<>(problemDetail, HttpStatus.FORBIDDEN);
    }
}
