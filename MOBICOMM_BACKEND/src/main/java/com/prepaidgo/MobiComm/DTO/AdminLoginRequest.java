package com.prepaidgo.MobiComm.DTO;


public class AdminLoginRequest {

	private String username;
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

