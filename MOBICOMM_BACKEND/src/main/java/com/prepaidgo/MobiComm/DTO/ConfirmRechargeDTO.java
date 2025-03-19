package com.prepaidgo.MobiComm.DTO;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public class ConfirmRechargeDTO {

	@Min(value = 1, message = "Payer ID must be a positive number")
	private Integer payerId;
	
	@NotNull(message = "Recipient Id should not be null")
	@Min(value = 1, message = "Recipient ID must be a positive number")
	private int recipientId;
	
	@NotNull(message = "Plan Id should not be null")
	@Min(value = 1, message = "Plan ID must be a positive number")
	private int planId;
	
	@NotBlank(message = "Payment method should not be empty/null")
	private String paymentMethod;
	
	public ConfirmRechargeDTO() {
		super();
	}

	public ConfirmRechargeDTO(int planId ,int recipientId, Integer payerId , String paymentMethod) {
		this.recipientId = recipientId;
		this.planId = planId;
		this.payerId = payerId;
		this.paymentMethod = paymentMethod;
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

	public String getPaymentMethod() {
		return paymentMethod;
	}

	public void setPaymentMethod(String paymentMethod) {
		this.paymentMethod = paymentMethod;
	}

	public Integer getPayerId() {
		return payerId;
	}

	public void setPayerId(Integer payerId) {
		this.payerId = payerId;
	}

}
