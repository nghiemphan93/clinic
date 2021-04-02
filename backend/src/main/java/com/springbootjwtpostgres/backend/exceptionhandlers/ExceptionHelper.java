package com.springbootjwtpostgres.backend.exceptionhandlers;

import com.springbootjwtpostgres.backend.payload.response.ExceptionResponse;
import javassist.NotFoundException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

@ControllerAdvice
public class ExceptionHelper extends ResponseEntityExceptionHandler {
    private static final Logger logger = LoggerFactory.getLogger(ExceptionHelper.class);

    public ResponseEntity<ExceptionResponse> buildResponseEntity(HttpStatus status, String message, String debugMessage) {
        return new ResponseEntity<>(new ExceptionResponse(status, message, debugMessage), status);
    }

    @ExceptionHandler({UsernameNotFoundException.class})
    public ResponseEntity<ExceptionResponse> handleUsernameNotFoundException(
            UsernameNotFoundException ex, WebRequest request) {
        logger.error(ex.getMessage());
        return buildResponseEntity(HttpStatus.NOT_FOUND, ex.getMessage(), ex.getLocalizedMessage());
    }

    @ExceptionHandler({AccessDeniedException.class})
    public ResponseEntity<ExceptionResponse> handleAccessDeniedException(
            AccessDeniedException ex, WebRequest request) {
        logger.error(ex.getMessage());
        return buildResponseEntity(HttpStatus.FORBIDDEN, ex.getMessage(), ex.getLocalizedMessage());
    }

    @ExceptionHandler({AuthenticationException.class})
    public ResponseEntity<ExceptionResponse> handleUnauthorizedException(
            AuthenticationException ex, WebRequest request) {
        logger.error(ex.getMessage());
        return buildResponseEntity(HttpStatus.UNAUTHORIZED, ex.getMessage(), ex.getLocalizedMessage());
    }

    @ExceptionHandler({NotFoundException.class})
    public ResponseEntity<ExceptionResponse> handleNotFoundException(
            NotFoundException ex) {
        logger.error(ex.getMessage());
        return buildResponseEntity(HttpStatus.NOT_FOUND, ex.getMessage(), ex.getLocalizedMessage());
    }

    @ExceptionHandler({Exception.class})
    public ResponseEntity<ExceptionResponse> handleGeneralException(
            Exception ex) {
        logger.error(ex.getMessage());
        return buildResponseEntity(HttpStatus.BAD_REQUEST, ex.getMessage(), ex.getLocalizedMessage());
    }
}
