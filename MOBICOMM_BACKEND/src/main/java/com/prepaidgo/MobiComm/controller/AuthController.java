package com.prepaidgo.MobiComm.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.prepaidgo.MobiComm.DTO.AdminLoginRequest;
import com.prepaidgo.MobiComm.DTO.AdminRegisterRequest;
import com.prepaidgo.MobiComm.repository.RevokedTokenRepository;
import com.prepaidgo.MobiComm.service.AuthService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/auth")
public class AuthController {

	AuthService authService;
	RevokedTokenRepository revokedTokenRepository;
	
	public AuthController(AuthService authService , RevokedTokenRepository revokedTokenRepository)
	{
		this.authService = authService;
		this.revokedTokenRepository = revokedTokenRepository;
	}
	
	@PostMapping("admin/register")
	public ResponseEntity<?> adminRegister(@Valid @RequestBody AdminRegisterRequest request){
		return authService.registerAdmin(request);
	}
	
	@PostMapping("admin/login")
	public ResponseEntity<?> adminLogin(@Valid @RequestBody AdminLoginRequest request){
		String username = request.getUsername();
		String password = request.getPassword();
		
		return authService.authenticate(username , password);
	}
}
