package com.prepaidgo.MobiComm.DTO;

import jakarta.validation.constraints.NotBlank;

public class AdminLoginRequest {

	@NotBlank(message = "Username Should not be empty/null")
	private String username;
	
	@NotBlank(message = "Password Should not be empty/null")
	private String password;
	
	public AdminLoginRequest(String username, String password) {
		super();
		this.username = username;
		this.password = password;
	}
	public AdminLoginRequest() {
		super();
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
	
	
}

