package com.prepaidgo.MobiComm.DTO;

public class RechargeDTO {

	private Integer payerId;
	private int recipientId;
	private int planId;
	private String paymenMode;
	
	public RechargeDTO() {
		super();
	}

	public RechargeDTO(int recipientId, int planId , Integer payerId , String paymentMode) {
		this.recipientId = recipientId;
		this.planId = planId;
		this.payerId = payerId;
		this.paymenMode = paymentMode;
	}

	public Integer getRecipientId() {
		return recipientId;
	}

	public void setRecipientId(int recipientId) {
		this.recipientId = recipientId;
	}

	public int getPlanId() {
		return planId;
	}

	public void setPlanId(int planId) {
		this.planId = planId;
	}

	public String getPaymenMode() {
		return paymenMode;
	}

	public void setPaymenMode(String paymenMode) {
		this.paymenMode = paymenMode;
	}

	public Integer getPayerId() {
		return payerId;
	}

	public void setPayerId(Integer payerId) {
		this.payerId = payerId;
	}

}
