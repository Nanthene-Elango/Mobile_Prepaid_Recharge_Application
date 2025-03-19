package com.prepaidgo.MobiComm.DTO;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public class AdminDetailsUpdateDTO {

	@NotNull(message = "User ID cannot be null")
	private int userId;
	
	@NotBlank(message = "New Value cannot be null")
	private String newvalue;
	
	public AdminDetailsUpdateDTO() {
		super();
	}

	public AdminDetailsUpdateDTO(int userId, String newvalue) {
		super();
		this.userId = userId;
		this.newvalue = newvalue;
	}
	
	public int getUserId() {
		return userId;
	}
	public void setUserId(int userId) {
		this.userId = userId;
	}
	public String getNewvalue() {
		return newvalue;
	}
	public void setNewvalue(String newvalue) {
		this.newvalue = newvalue;
	}
	
	
}
