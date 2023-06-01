package com.backend.budgetboss.manualaccount.exception;

import com.backend.budgetboss.account.exception.AccountNotFoundException;
import com.backend.budgetboss.account.exception.AccountOwnershipException;
import com.backend.budgetboss.account.exception.AccountRequestException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ProblemDetail;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class ManualAccountExceptionHandler {
    private final Logger logger = LoggerFactory.getLogger(ManualAccountExceptionHandler.class);

    @ExceptionHandler(ManualAccountNotFoundException.class)
    public ProblemDetail handleManualAccountNotFoundException(ManualAccountNotFoundException e) {
        logger.error(e.getMessage());

        ProblemDetail problemDetail = ProblemDetail.forStatusAndDetail(HttpStatus.NOT_FOUND, e.getMessage());
        problemDetail.setTitle("Manual Account Not Found");

        return problemDetail;
    }

    @ExceptionHandler(ManualAccountOwnershipException.class)
    public ProblemDetail handleManualAccountOwnershipException(ManualAccountOwnershipException e) {
        logger.error(e.getMessage());

        ProblemDetail problemDetail = ProblemDetail.forStatusAndDetail(HttpStatus.FORBIDDEN, e.getMessage());
        problemDetail.setTitle("Manual Account Ownership Exception");

        return problemDetail;
    }
}
