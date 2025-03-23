package com.prepaidgo.MobiComm.service;

import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.prepaidgo.MobiComm.DTO.AdminDTO;
import com.prepaidgo.MobiComm.exceptions.InvalidCredentialsException;
import com.prepaidgo.MobiComm.exceptions.NoUserFoundException;
import com.prepaidgo.MobiComm.repository.UsersRepository;

@Service
public class AdminService {

	UsersRepository usersRepo;
	PasswordEncoder passwordEncoder;
	
	public AdminService(UsersRepository usersRepo , PasswordEncoder passwordEncoder) {
		this.usersRepo = usersRepo;
		this.passwordEncoder = passwordEncoder;
	}

	public ResponseEntity<?> getAdminDetails(int adminId) {
		if (usersRepo.existsById(adminId)) {
			return ResponseEntity.ok().body(new AdminDTO(usersRepo.findById(adminId).get()));
		}
		else {
			throw new NoUserFoundException("No User Found with this admin Id!");
		}
	}

	public ResponseEntity<?> updateEmail(int userId , String email) {
		try {
			if (usersRepo.existsByEmail(email)) {
				return ResponseEntity.badRequest().body("Email Already Exist!");
			}
			usersRepo.updateEmailByUserId(userId , email);
			return ResponseEntity.ok().body("Email Updated Successfully!");
		}
		catch(Exception e) {
			throw new InvalidCredentialsException(e.getMessage());
		}
	}
	

	public ResponseEntity<?> updateUsername(int userId , String username) {
		try {
			if (usersRepo.existsByUsername(username)) {
				return ResponseEntity.badRequest().body("Username Already Exist!");
			}
			usersRepo.updateUsernameByUserId(userId , username);
			return ResponseEntity.ok().body("username Updated Successfully!");
		}
		catch(Exception e) {
			throw new InvalidCredentialsException(e.getMessage());
		}
	}
	
	public ResponseEntity<?> updatePassword(int userId , String password) {
		try {
			password = passwordEncoder.encode(password);
			usersRepo.updatePasswordByUserId(userId , password);
			return ResponseEntity.ok().body("password Updated Successfully!");
		}
		catch(Exception e) {
			throw new InvalidCredentialsException(e.getMessage());
		}
	}

	
}
