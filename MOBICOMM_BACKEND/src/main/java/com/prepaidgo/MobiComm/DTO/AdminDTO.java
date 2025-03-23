package com.prepaidgo.MobiComm.DTO;

import com.prepaidgo.MobiComm.entity.Users;

public class AdminDTO {

	private String username;
	private String password;
	private String email;
	private String phoneNumber;
	private String fullName;
	
	public AdminDTO() {
		super();
	}
	
	public AdminDTO(Users user) {
		super();
		this.username = user.getUsername();
		this.password = user.getPassword();
		this.email = user.getEmail();
		this.phoneNumber = user.getPhoneNumber();
		this.fullName = user.getFullName();
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
