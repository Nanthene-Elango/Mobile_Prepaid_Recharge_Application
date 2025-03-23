package com.prepaidgo.MobiComm.DTO;

import java.time.LocalDateTime;

import com.prepaidgo.MobiComm.entity.Recharges;

public class RechargesDTO {

	private LocalDateTime rechargeDate;
	private LocalDateTime expiryDate;
	private PlansDTO plan;
	
	public RechargesDTO() {
		super();
	}
	
	public RechargesDTO(Recharges recharge) {
		super();
		this.rechargeDate = recharge.getDateOfRecharge();
		this.expiryDate = recharge.getDateOfExpiry();
		this.plan = new PlansDTO(recharge.getPlan());
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
	public PlansDTO getPlan() {
		return plan;
	}
	public void setPlan(PlansDTO plan) {
		this.plan = plan;
	}

}
