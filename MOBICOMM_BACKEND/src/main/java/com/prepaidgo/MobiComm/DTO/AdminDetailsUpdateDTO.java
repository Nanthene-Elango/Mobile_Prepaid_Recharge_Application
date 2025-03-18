package com.prepaidgo.MobiComm.DTO;

public class AdminDetailsUpdateDTO {

	private int userId;
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
