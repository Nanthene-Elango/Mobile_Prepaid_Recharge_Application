package com.prepaidgo.MobiComm.DTO;

import java.math.BigDecimal;
import java.time.LocalDateTime;

import com.prepaidgo.MobiComm.Model.Transaction;

public class TransactionDTO {

	private String transationNumber;
	private LocalDateTime date;
	private BigDecimal amount;
	private String paymentMethod;
	private String mobileNumber;
	private PlansDTO planDetail;
	
	public TransactionDTO() {
		super();
	}
	public TransactionDTO(Transaction transaction) {
		this.transationNumber = transaction.getTransactionNumber();
		this.date = transaction.getTransactionDate();
		this.paymentMethod = transaction.getPaymentMode();
		this.amount = transaction.getAmount();
		this.mobileNumber = transaction.getRecharge().getUser().getPhoneNumber();
		this.planDetail = new PlansDTO(transaction.getRecharge().getPlan());
	}
	public String getTransationNumber() {
		return transationNumber;
	}
	public void setTransationNumber(String transationNumber) {
		this.transationNumber = transationNumber;
	}
	public LocalDateTime getDate() {
		return date;
	}
	public void setDate(LocalDateTime date) {
		this.date = date;
	}
	public String getPaymentMethod() {
		return paymentMethod;
	}
	public void setPaymentMethod(String paymentMethod) {
		this.paymentMethod = paymentMethod;
	}
	public String getMobileNumber() {
		return mobileNumber;
	}
	public void setMobileNumber(String mobileNumber) {
		this.mobileNumber = mobileNumber;
	}
	public PlansDTO getPlanDetail() {
		return planDetail;
	}
	public void setPlanDetail(PlansDTO planDetail) {
		this.planDetail = planDetail;
	}
	public BigDecimal getAmount() {
		return amount;
	}
	public void setAmount(BigDecimal amount) {
		this.amount = amount;
	}	
	
}
