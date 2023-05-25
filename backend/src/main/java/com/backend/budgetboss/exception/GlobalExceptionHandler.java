package com.backend.budgetboss.exception;

import org.jetbrains.annotations.NotNull;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.*;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import java.util.ArrayList;
import java.util.List;

@RestControllerAdvice
public class GlobalExceptionHandler extends ResponseEntityExceptionHandler {
    private final Logger logger = LoggerFactory.getLogger(GlobalExceptionHandler.class);

    @ExceptionHandler(UsernameNotFoundException.class)
    public ProblemDetail handleUsernameNotFoundException (UsernameNotFoundException e) {
        logger.error(e.getMessage());

        ProblemDetail problemDetail = ProblemDetail.forStatusAndDetail(HttpStatus.NOT_FOUND, e.getMessage());
        problemDetail.setTitle("User not found");

        return problemDetail;
    }

    @Override
    protected ResponseEntity<Object> handleMethodArgumentNotValid(MethodArgumentNotValidException ex, @NotNull HttpHeaders headers, HttpStatusCode status, WebRequest request) {
        List<String> errors = new ArrayList<>();

        for (FieldError error : ex.getBindingResult().getFieldErrors()) {
            errors.add(error.getDefaultMessage());
        }

        ProblemDetail problemDetail = ProblemDetail.forStatus(HttpStatus.BAD_REQUEST);
        problemDetail.setTitle("Validation failed");
        problemDetail.setDetail("One or more fields are invalid. See 'errors' property for more details.");
        problemDetail.setProperty("errors", errors);

        return handleExceptionInternal(ex, problemDetail, headers, HttpStatus.BAD_REQUEST, request);
    }
}
