package com.prepaidgo.MobiComm.DTO;

import java.time.LocalDateTime;

public class ActivePlanDTO {

	private PlansDTO plan;
	private LocalDateTime rechargeDate;
	private LocalDateTime expiryDate;
	
	
	
	public ActivePlanDTO(PlansDTO plan, LocalDateTime rechargeDate, LocalDateTime expiryDate) {
		super();
		this.plan = plan;
		this.rechargeDate = rechargeDate;
		this.expiryDate = expiryDate;
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
		expiryDate = expiryDate;
	}
	
	
}
