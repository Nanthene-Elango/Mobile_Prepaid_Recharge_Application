package com.prepaidgo.MobiComm.Controller;

import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.prepaidgo.MobiComm.Repository.UsersRepository;
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

    @PostMapping("/generate/{userId}")
    public ResponseEntity<?> generateOTP(@PathVariable int userId) {
    	if (usersRepository.existsById(userId)) {
    		String otp = otpService.generateOTP(userId);
            return ResponseEntity.ok(Map.of("otp",otp));
    	}
    	else {
    		return ResponseEntity.badRequest().body("No User Found!");
    	}
        
    }

    @PostMapping("/verify/{userId}")
    public ResponseEntity<?> verifyOTP(@PathVariable int userId, @RequestBody Map<String,String> request) {
        boolean isValid = otpService.verifyOTP(userId, request.get("otp"));
        if (isValid) {
        	 String phoneNumber = usersRepository.findById(userId).get().getPhoneNumber();
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
