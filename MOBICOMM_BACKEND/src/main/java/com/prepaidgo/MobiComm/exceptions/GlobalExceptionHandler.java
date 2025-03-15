package com.prepaidgo.MobiComm.exceptions;

import java.util.HashMap;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
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
}

