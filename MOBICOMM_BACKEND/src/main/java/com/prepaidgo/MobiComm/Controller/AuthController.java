package com.prepaidgo.MobiComm.Controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.prepaidgo.MobiComm.DTO.AdminLoginRequest;
import com.prepaidgo.MobiComm.DTO.AdminRegisterRequest;
import com.prepaidgo.MobiComm.Model.RevokedToken;
import com.prepaidgo.MobiComm.Repository.RevokedTokenRepository;
import com.prepaidgo.MobiComm.service.AuthService;

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
	public ResponseEntity<?> adminRegister(@RequestBody AdminRegisterRequest request){
		return authService.registerAdmin(request);
	}
	
	@PostMapping("admin/login")
	public ResponseEntity<?> adminLogin(@RequestBody AdminLoginRequest request){
		String username = request.getUsername();
		String password = request.getPassword();
		
		return authService.authenticate(username , password);
	}
	
	@PostMapping("admin/logout")
	public ResponseEntity<String> logout(@RequestHeader("Authorization") String token) {
		token = token.substring(7);
		revokedTokenRepository.save(new RevokedToken(token));
		return ResponseEntity.ok("Logged out successfully.");
	}

}
