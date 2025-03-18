package com.prepaidgo.MobiComm.Controller;

import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestController;

import com.prepaidgo.MobiComm.DTO.AdminDetailsUpdateDTO;
import com.prepaidgo.MobiComm.Model.RevokedToken;
import com.prepaidgo.MobiComm.Repository.PlansRepository;
import com.prepaidgo.MobiComm.Repository.RevokedTokenRepository;
import com.prepaidgo.MobiComm.service.AdminService;


@RestController
@PreAuthorize("hasAuthority('ADMIN')")
public class AdminController {
	
	RevokedTokenRepository revokedTokenRepo;
	PlansRepository plansRepo;
	AdminService adminService;

	public AdminController(RevokedTokenRepository revokedTokenRepo , PlansRepository plansRepo , AdminService adminService) {
		this.revokedTokenRepo = revokedTokenRepo;
		this.plansRepo = plansRepo;
		this.adminService = adminService;
	}
	
	@PostMapping("admin/profile")
	public ResponseEntity<?> getAdminDetails(@RequestBody Map<String,Integer> request){
		return adminService.getAdminDetails(request.get("adminId"));
	}
	
	@PostMapping("admin/logout")
	public ResponseEntity<String> logout(@RequestHeader("Authorization") String token) {
		token = token.substring(7);
		revokedTokenRepo.save(new RevokedToken(token));
		return ResponseEntity.ok("Logged out successfully.");
	}

	@PutMapping("admin/update/email")
	public ResponseEntity<?> updateEmail(@RequestBody AdminDetailsUpdateDTO request){
		return adminService.updateEmail(request.getUserId() , request.getNewvalue());
	}
	
	@PutMapping("admin/update/username")
	public ResponseEntity<?> updateUsername(@RequestBody AdminDetailsUpdateDTO request){
		return adminService.updateUsername(request.getUserId() , request.getNewvalue());
	}
	
	@PutMapping("admin/update/password")
	public ResponseEntity<?> updatePassword(@RequestBody AdminDetailsUpdateDTO request){
		return adminService.updatePassword(request.getUserId() , request.getNewvalue());
	}
}
