package com.prepaidgo.MobiComm.DTO;

import java.time.LocalDate;

import com.prepaidgo.MobiComm.entity.Address;
import com.prepaidgo.MobiComm.entity.Users;

public class SubscriberDTO {

	private int subscriberId;
	private String fullName;
	private String address;
	private String email;
	private String phoneNumber;
	private String status;
	private LocalDate dob;
	private LocalDate dateOfRegistration;
	private String gender;
	
	
	public SubscriberDTO() {
		super();
	}
	public SubscriberDTO(Users user) {
		super();
		this.subscriberId = user.getUserId();
		this.fullName = user.getFullName();
		setAddress(user.getAddress());
		this.email = user.getEmail();
		this.phoneNumber = user.getPhoneNumber();
		this.status = user.getStatus();
		this.dob = user.getDob();
		this.dateOfRegistration = user.getDateOfRegistration();
		this.gender = user.getGender();
	}
	
	public int getSubscriberId() {
		return subscriberId;
	}
	public void setSubscriberId(int subscriberId) {
		this.subscriberId = subscriberId;
	}
	public String getFullName() {
		return fullName;
	}
	public void setFullName(String fullName) {
		this.fullName = fullName;
	}
	public String getAddress() {
		return this.address;
	}
	public void setAddress(Address address) {
		this.address = address.getDoorNo() + "," + address.getStreet() + "," + address.getCity() + "," + address.getState() + "-" + address.getPincode();
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
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	public LocalDate getDob() {
		return dob;
	}
	public void setDob(LocalDate dob) {
		this.dob = dob;
	}
	public LocalDate getDateOfRegistration() {
		return dateOfRegistration;
	}
	public void setDateOfRegistration(LocalDate dateOfRegistration) {
		this.dateOfRegistration = dateOfRegistration;
	}
	public String getGender() {
		return gender;
	}
	public void setGender(String gender) {
		this.gender = gender;
	}
	
}
