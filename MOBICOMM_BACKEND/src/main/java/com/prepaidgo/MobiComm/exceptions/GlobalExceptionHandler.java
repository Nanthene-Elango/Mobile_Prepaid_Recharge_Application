package com.prepaidgo.MobiComm.exceptions;

import java.util.HashMap;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {

	@ExceptionHandler(PlanNotFoundException.class)
	public ResponseEntity<Map<String , Object>> handerPlanNotFoundException(PlanNotFoundException ex){
		Map<String , Object> response = new HashMap<>();
		response.put("error" , ex);
		response.put("message", ex.getMessage());
		response.put("status" , HttpStatus.NOT_FOUND.value());
		
		return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
	}
	
	@ExceptionHandler(InvalidCredentialsException.class)
	public ResponseEntity<Map<String , Object>> handerInvalidCredentialsException(PlanNotFoundException ex){
		Map<String , Object> response = new HashMap<>();
		response.put("error" , ex);
		response.put("message", ex.getMessage());
		response.put("status" , HttpStatus.NOT_FOUND.value());
		
		return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
	}
	
	@ExceptionHandler(NoUserFoundException.class)
	public ResponseEntity<Map<String , Object>> handlerNoUserFoundException(NoUserFoundException ex){
		Map<String , Object> response = new HashMap<>();
		response.put("error", ex);
		response.put("message", ex.getMessage());
		response.put("status", HttpStatus.NOT_FOUND.value());
		
		return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
	}
	
	@ExceptionHandler(NullPointerException.class)
	public ResponseEntity<Map<String,Object>> handlerNullPointerException(NullPointerException ex){
		Map<String,Object> response = new HashMap<>();
		response.put("error", ex);
		response.put("message",ex.getMessage());
		response.put("status", HttpStatus.BAD_REQUEST.value());
		
		return new ResponseEntity<>(response,HttpStatus.BAD_REQUEST);
	}
	
	@ResponseStatus(HttpStatus.BAD_REQUEST)
	@ExceptionHandler(MethodArgumentNotValidException.class)
	public Map<String, String> handleValidationExceptions(MethodArgumentNotValidException ex) {
	    Map<String, String> errors = new HashMap<>();
	    ex.getBindingResult().getFieldErrors().forEach(error ->
	        errors.put(error.getField(), error.getDefaultMessage())
	    );
	    return errors;
	}
}

