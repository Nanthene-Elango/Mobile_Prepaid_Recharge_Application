package com.prepaidgo.MobiComm.Controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestController;

import com.prepaidgo.MobiComm.Model.RevokedToken;
import com.prepaidgo.MobiComm.Repository.PlansRepository;
import com.prepaidgo.MobiComm.Repository.RevokedTokenRepository;


@RestController
@PreAuthorize("hasAuthority('ADMIN')")
public class AdminController {
	
	RevokedTokenRepository revokedTokenRepo;
	PlansRepository plansRepo;

	public AdminController(RevokedTokenRepository revokedTokenRepo , PlansRepository plansRepo) {
		this.revokedTokenRepo = revokedTokenRepo;
		this.plansRepo = plansRepo;
		
	}
	
	@PostMapping("admin/logout")
	public ResponseEntity<String> logout(@RequestHeader("Authorization") String token) {
		token = token.substring(7);
		revokedTokenRepo.save(new RevokedToken(token));
		return ResponseEntity.ok("Logged out successfully.");
	}

}
