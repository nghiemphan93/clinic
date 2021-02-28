package com.springbootjwtpostgres.backend.exceptionhandlers;

import com.springbootjwtpostgres.backend.payload.response.ExceptionResponse;
import com.springbootjwtpostgres.backend.security.jwt.AuthEntryPointJwt;
import org.omg.CORBA.portable.ApplicationException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.NoHandlerFoundException;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import static org.springframework.data.crossstore.ChangeSetPersister.*;
import static org.springframework.web.client.HttpClientErrorException.*;
import static org.springframework.web.client.HttpClientErrorException.Unauthorized;

@ControllerAdvice
public class ExceptionHelper extends ResponseEntityExceptionHandler {
    private static final Logger logger = LoggerFactory.getLogger(ExceptionHelper.class);

//    @org.springframework.web.bind.annotation.ExceptionHandler(value = {Unauthorized.class})
//    public ResponseEntity<Object> handleUnauthorizedException(Unauthorized ex) {
//        logger.error("Unauthorized Exception: " + ex.getMessage());
//        return new ResponseEntity<Object>(ex.getMessage(), HttpStatus.BAD_REQUEST);
//    }

    private ResponseEntity<ExceptionResponse> buildResponseEntity(HttpStatus status, String message, String debugMessage) {
        return new ResponseEntity<>(new ExceptionResponse(status, message, debugMessage), status);
    }

    @ExceptionHandler({AccessDeniedException.class})
    public ResponseEntity<ExceptionResponse> handleAccessDeniedException(
            AccessDeniedException ex, WebRequest request) {
        System.out.println("not permited....");
        return buildResponseEntity(HttpStatus.FORBIDDEN, ex.getMessage(), ex.getLocalizedMessage());
    }

    @ExceptionHandler({ApplicationException.class})
    public ResponseEntity<ExceptionResponse> handleNotFoundException(
            ApplicationException ex) {
        System.out.println("not founding....");
        return buildResponseEntity(HttpStatus.NOT_FOUND, ex.getMessage(), ex.getLocalizedMessage());
    }

    @ExceptionHandler({Exception.class})
    public ResponseEntity<ExceptionResponse> handleGeneralException(
            Exception ex) {
        System.out.println("global exception...");
        return buildResponseEntity(HttpStatus.BAD_REQUEST, ex.getMessage(), ex.getLocalizedMessage());
    }
}
