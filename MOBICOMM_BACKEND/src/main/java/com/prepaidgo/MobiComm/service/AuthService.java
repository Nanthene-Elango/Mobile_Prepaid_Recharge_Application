package com.prepaidgo.MobiComm.service;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.prepaidgo.MobiComm.DTO.AdminDTO;
import com.prepaidgo.MobiComm.DTO.AdminRegisterRequest;
import com.prepaidgo.MobiComm.Model.Users;
import com.prepaidgo.MobiComm.Repository.RolesRepository;
import com.prepaidgo.MobiComm.Repository.UsersRepository;
import com.prepaidgo.MobiComm.exceptions.InvalidCredentialsException;
import com.prepaidgo.MobiComm.security.JwtUtil;

@Service
public class AuthService {


	UsersRepository usersRepo;
	PasswordEncoder passwordEncoder;
	JwtUtil jwtUtil;
	RolesRepository rolesRepo;
	
	public AuthService(UsersRepository usersRepo , PasswordEncoder passwordEncoder , JwtUtil jwtUtil , RolesRepository rolesRepo) {
		this.usersRepo = usersRepo;
		this.passwordEncoder = passwordEncoder;
		this.jwtUtil = jwtUtil;
		this.rolesRepo = rolesRepo;
	}
	
	public ResponseEntity<?> authenticate(String username, String password) {
		
		Users admin = usersRepo.findByUsername(username).get();
		
		if (admin != null && passwordEncoder.matches(password , admin.getPassword())) {
			return ResponseEntity.status(HttpStatus.OK).body(Map.of(
				    "accessToken", jwtUtil.generateToken(username, "ADMIN"),
				    "admin",admin.getUserId()
				));
		}
		else {
			throw new InvalidCredentialsException("Invalid Username/Password!");
		}
	}

	public ResponseEntity<?> registerAdmin(AdminRegisterRequest request) {
		System.out.println(request.getUsername());
		if (usersRepo.existsByUsername(request.getUsername())) {
			throw new InvalidCredentialsException("Username Already Exists!");
		}
		else if(usersRepo.existsByPhoneNumber(request.getPhoneNumber())) {
			throw new InvalidCredentialsException("PhoneNumber Already Exits!");
		}
		else if(usersRepo.existsByEmail(request.getEmail())) {
			throw new InvalidCredentialsException("Email Already Exist!");
		}
		else {
			Users user = new Users();
			user.setFullName(request.getFullName());
			user.setPhoneNumber(request.getPhoneNumber());
			user.setEmail(request.getEmail());
			user.setRole(rolesRepo.findById(1).get());
			user.setStatus("ACTIVE");
			user.setUsername(request.getUsername());
			user.setPassword(passwordEncoder.encode(request.getPassword()));
			usersRepo.save(user);
			return ResponseEntity.status(HttpStatus.CREATED).body("Admin Registered Successfully");
		}
	}


}
