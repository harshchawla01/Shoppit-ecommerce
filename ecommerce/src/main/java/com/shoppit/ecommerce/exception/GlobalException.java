//package com.shoppit.ecommerce.exception;
//
//import java.net.http.HttpHeaders;
//import java.time.LocalDateTime;
//import java.util.LinkedHashMap;
//import java.util.Map;
//
//import org.springframework.http.HttpStatus;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.MethodArgumentNotValidException;
//import org.springframework.web.bind.annotation.ControllerAdvice;
//import org.springframework.web.bind.annotation.ExceptionHandler;
//import org.springframework.web.context.request.WebRequest;
//import org.springframework.web.servlet.NoHandlerFoundException;
//import org.slf4j.Logger;
//import org.slf4j.LoggerFactory;
//
//
//
//@ControllerAdvice
//public class GlobalException {
//
//    private static final Logger log = LoggerFactory.getLogger(GlobalException.class);
//
//    @ExceptionHandler(UserException.class)
//    public ResponseEntity<ErrorDetails> UserExceptionHandler(UserException ue, WebRequest req){
//
//        ErrorDetails err= new ErrorDetails(ue.getMessage(),req.getDescription(false),LocalDateTime.now()); // The status code given here will reflect in the message
//        log.error("UserException: {}", ue.getMessage(), ue);
//
//        return new ResponseEntity<ErrorDetails>(err,HttpStatus.BAD_REQUEST); // The status given here will reflect as the actual status
//
//    }
//
//    @ExceptionHandler(ProductException.class)
//    public ResponseEntity<ErrorDetails> ProductExceptionHandler(ProductException ue, WebRequest req){
//
//        ErrorDetails err= new ErrorDetails(ue.getMessage(),req.getDescription(false),LocalDateTime.now());
//
//        return new ResponseEntity<ErrorDetails>(err,HttpStatus.BAD_REQUEST);
//
//    }
//
//    @ExceptionHandler(CartItemException.class)
//    public ResponseEntity<ErrorDetails> CartItemExceptionHandler(CartItemException ue, WebRequest req){
//
//        ErrorDetails err= new ErrorDetails(ue.getMessage(),req.getDescription(false),LocalDateTime.now());
//
//        return new ResponseEntity<ErrorDetails>(err,HttpStatus.BAD_REQUEST);
//
//    }
//
//    @ExceptionHandler(OrderException.class)
//    public ResponseEntity<ErrorDetails> OrderExceptionHandler(OrderException ue,
//                                                              WebRequest req){
//
//        ErrorDetails err= new ErrorDetails(ue.getMessage(),
//                req.getDescription(false),LocalDateTime.now());
//
//        return new ResponseEntity<ErrorDetails>(err,HttpStatus.BAD_REQUEST);
//
//    }
//
//    @ExceptionHandler(SellerException.class)
//    public ResponseEntity<ErrorDetails> handleSellerException(SellerException ex, WebRequest req) {
//        ErrorDetails err= new ErrorDetails(ex.getMessage(),
//                req.getDescription(false),
//                LocalDateTime.now());
//
//        return new ResponseEntity<ErrorDetails>(err,HttpStatus.BAD_REQUEST);
//    }
//
//    @ExceptionHandler(MethodArgumentNotValidException.class)
//    public ResponseEntity<ErrorDetails> methodArgumentNotValidExceptionHandler(MethodArgumentNotValidException me){
//        ErrorDetails err=new ErrorDetails(me.getBindingResult().getFieldError().getDefaultMessage(),"validation error",LocalDateTime.now());
//        return new ResponseEntity<ErrorDetails>(err,HttpStatus.BAD_REQUEST);
//    }
//
//    @ExceptionHandler(NoHandlerFoundException.class)
//    public ResponseEntity<Object> handleNoHandlerFoundException(NoHandlerFoundException ex, HttpHeaders headers, HttpStatus status, WebRequest request) {
//        Map<String, Object> body = new LinkedHashMap<>();
//        body.put("message", "Endpoint not found");
//
//        return new ResponseEntity<>(body, HttpStatus.NOT_FOUND);
//    }
//
//
//
//    @ExceptionHandler(RuntimeException.class)
//    public ResponseEntity<String> handleRuntimeException(RuntimeException ex) {
//        return new ResponseEntity<>(ex.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
//    }
//
//    @ExceptionHandler(Exception.class)
//    public ResponseEntity<ErrorDetails> otherExceptionHandler(Exception e, WebRequest req){
//        ErrorDetails error=new ErrorDetails(e.getMessage(),req.getDescription(false),LocalDateTime.now());
//
//        return new ResponseEntity<ErrorDetails>(error,HttpStatus.INTERNAL_SERVER_ERROR);
//    }
//
//}

package com.shoppit.ecommerce.exception;

import java.net.http.HttpHeaders;
import java.time.LocalDateTime;
import java.util.LinkedHashMap;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.NoHandlerFoundException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@ControllerAdvice
public class GlobalException {

    private static final Logger log = LoggerFactory.getLogger(GlobalException.class);

    @ExceptionHandler(UserException.class)
    public ResponseEntity<ErrorDetails> UserExceptionHandler(UserException ue, WebRequest req){
        log.error("UserException: {}", ue.getMessage(), ue);
        ErrorDetails err= new ErrorDetails(ue.getMessage(),req.getDescription(false),LocalDateTime.now());
        return new ResponseEntity<ErrorDetails>(err,HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(ProductException.class)
    public ResponseEntity<ErrorDetails> ProductExceptionHandler(ProductException pe, WebRequest req){
        log.error("ProductException: {}", pe.getMessage(), pe);
        ErrorDetails err= new ErrorDetails(pe.getMessage(),req.getDescription(false),LocalDateTime.now());
        return new ResponseEntity<ErrorDetails>(err,HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(CartItemException.class)
    public ResponseEntity<ErrorDetails> CartItemExceptionHandler(CartItemException cie, WebRequest req){
        log.error("CartItemException: {}", cie.getMessage(), cie);
        ErrorDetails err= new ErrorDetails(cie.getMessage(),req.getDescription(false),LocalDateTime.now());
        return new ResponseEntity<ErrorDetails>(err,HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(OrderException.class)
    public ResponseEntity<ErrorDetails> OrderExceptionHandler(OrderException oe, WebRequest req){
        log.error("OrderException: {}", oe.getMessage(), oe);
        ErrorDetails err= new ErrorDetails(oe.getMessage(), req.getDescription(false), LocalDateTime.now());
        return new ResponseEntity<ErrorDetails>(err,HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(SellerException.class)
    public ResponseEntity<ErrorDetails> handleSellerException(SellerException se, WebRequest req) {
        log.error("SellerException: {}", se.getMessage(), se);
        ErrorDetails err= new ErrorDetails(se.getMessage(), req.getDescription(false), LocalDateTime.now());
        return new ResponseEntity<ErrorDetails>(err,HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ErrorDetails> methodArgumentNotValidExceptionHandler(MethodArgumentNotValidException me){
        String errorMessage = me.getBindingResult().getFieldError().getDefaultMessage();
        log.error("Validation Error: {}", errorMessage, me);
        ErrorDetails err=new ErrorDetails(errorMessage, "validation error", LocalDateTime.now());
        return new ResponseEntity<ErrorDetails>(err,HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(NoHandlerFoundException.class)
    public ResponseEntity<Object> handleNoHandlerFoundException(NoHandlerFoundException ex, HttpHeaders headers, HttpStatus status, WebRequest request) {
        log.error("No handler found for: {} {}", ex.getHttpMethod(), ex.getRequestURL(), ex);
        Map<String, Object> body = new LinkedHashMap<>();
        body.put("message", "Endpoint not found");
        body.put("path", ex.getRequestURL());
        body.put("timestamp", LocalDateTime.now());

        return new ResponseEntity<>(body, HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(RuntimeException.class)
    public ResponseEntity<String> handleRuntimeException(RuntimeException ex) {
        log.error("Runtime Exception: {}", ex.getMessage(), ex);
        return new ResponseEntity<>(ex.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ErrorDetails> otherExceptionHandler(Exception e, WebRequest req){
        log.error("Unhandled Exception: {}", e.getMessage(), e);
        ErrorDetails error=new ErrorDetails(e.getMessage(), req.getDescription(false), LocalDateTime.now());
        return new ResponseEntity<ErrorDetails>(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
}