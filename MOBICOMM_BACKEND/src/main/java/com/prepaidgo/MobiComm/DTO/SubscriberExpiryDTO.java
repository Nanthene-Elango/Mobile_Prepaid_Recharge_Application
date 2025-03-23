package com.prepaidgo.MobiComm.DTO;

import java.time.LocalDateTime;

import com.prepaidgo.MobiComm.entity.Recharges;

public class SubscriberExpiryDTO {

	private int subscriberId;
	private String fullName;
	private String phoneNumber;
	private PlansDTO plan;
	private LocalDateTime rechargeDate;
	private LocalDateTime expiryDate;
	
	public SubscriberExpiryDTO() {
		super();
	}

	public SubscriberExpiryDTO(Recharges recharge) {
		super();
		this.subscriberId = recharge.getUser().getUserId();
		this.fullName = recharge.getUser().getFullName();
		this.phoneNumber = recharge.getUser().getPhoneNumber();
		this.plan = new PlansDTO(recharge.getPlan());
		this.rechargeDate = recharge.getDateOfRecharge();
		this.expiryDate = recharge.getDateOfExpiry();
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

	public String getPhoneNumber() {
		return phoneNumber;
	}

	public void setPhoneNumber(String phoneNumber) {
		this.phoneNumber = phoneNumber;
	}

	public PlansDTO getPlan() {
		return plan;
	}

	public void setPlan(PlansDTO plan) {
		this.plan = plan;
	}

	public LocalDateTime getRechargeDate() {
		return rechargeDate;
	}

	public void setRechargeDate(LocalDateTime rechargeDate) {
		this.rechargeDate = rechargeDate;
	}

	public LocalDateTime getExpiryDate() {
		return expiryDate;
	}

	public void setExpiryDate(LocalDateTime expiryDate) {
		this.expiryDate = expiryDate;
	}
	
}
