package com.prepaidgo.MobiComm.DTO;

import jakarta.validation.constraints.NotBlank;

public class AdminRegisterRequest {

	@NotBlank(message = "Username Should not be empty/null")
	private String username;
	
	@NotBlank(message = "Password Should not be empty/null")
	private String password;

	@NotBlank(message = "email Should not be empty/null")
	private String email;
	
	@NotBlank(message = "PhoneNumber Should not be empty/null")
	private String phoneNumber;

	@NotBlank(message = "Full name Should not be empty/null")
	private String fullName;
	
	public AdminRegisterRequest() {
		super();
	}
	
	public AdminRegisterRequest(String username, String password, String email, String phoneNumber, String fullName) {
		super();
		this.username = username;
		this.password = password;
		this.email = email;
		this.phoneNumber = phoneNumber;
		this.fullName = fullName;
	}
	
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getPhoneNumber() {
		return phoneNumber;
	}
	public void setPhoneNumber(String phoneNumber) {
		this.phoneNumber = phoneNumber;
	}
	public String getFullName() {
		return fullName;
	}
	public void setFullName(String fullName) {
		this.fullName = fullName;
	}
	
}
