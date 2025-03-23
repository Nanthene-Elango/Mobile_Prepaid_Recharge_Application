package com.prepaidgo.MobiComm.controller;

import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.prepaidgo.MobiComm.exceptions.NoUserFoundException;
import com.prepaidgo.MobiComm.repository.UsersRepository;
import com.prepaidgo.MobiComm.security.JwtUtil;
import com.prepaidgo.MobiComm.service.OTPService;

@RestController
@RequestMapping("auth/otp")
public class OTPController {

    private final OTPService otpService;
    private final UsersRepository usersRepository;
    private final JwtUtil jwtUtil;

    public OTPController(OTPService otpService , UsersRepository usersRepository , JwtUtil jwtUtil) {
        this.otpService = otpService;
        this.usersRepository = usersRepository;
        this.jwtUtil = jwtUtil;
    }

    @PostMapping("/generate")
    public ResponseEntity<?> generateOTP(@RequestBody Map<String,String> request) {
    	if (usersRepository.existsByPhoneNumber(request.get("phoneNumber").trim())) {
    		String otp = otpService.generateOTP(request.get("phoneNumber").trim());
            return ResponseEntity.ok(Map.of("otp",otp));
    	}
    	else {
    		throw new NoUserFoundException("User does not exist!");
    	}
        
    }

    @PostMapping("/verify")
    public ResponseEntity<?> verifyOTP(@RequestBody Map<String,String> request) {
        boolean isValid = otpService.verifyOTP(request.get("phoneNumber").trim() , request.get("otp"));
        if (isValid) {
        	 String phoneNumber = request.get("phoneNumber").trim();
             return ResponseEntity.status(HttpStatus.OK).body(Map.of(
 				    "accessToken", jwtUtil.generateToken(phoneNumber, "SUBSCRIBER")
 				));
        }
        else {
        	return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Map.of("error" , 
        			"OTP Expired / Invalid"));
        }
    }
}
