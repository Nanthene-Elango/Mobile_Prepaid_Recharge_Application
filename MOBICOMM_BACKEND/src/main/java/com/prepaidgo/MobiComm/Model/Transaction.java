package com.prepaidgo.MobiComm.Model;

import java.math.BigDecimal;
import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;


@Entity
public class Transaction {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int transactionId;
	
	@Column(unique=true , nullable=false)
	private String transactionNumber;
	
	@Column(name="amount")
	private BigDecimal amount;
	
	@ManyToOne
	@JoinColumn(name="payerId",referencedColumnName="userId")
	private Users payer;
	
	@Column(name="transactionDate")
	private LocalDateTime transactionDate;
	
	@Column(nullable=false)
	private String paymentMode;
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name="rechargeId" , referencedColumnName="rechargeId" , nullable=false)
	private Recharges recharge;
	
	@Column(name="status",nullable=false)
	private String status;

	public Transaction() {
		super();
	}

	public Transaction(int transactionId, String transactionNumber, BigDecimal amount, Users payer,
			LocalDateTime transactionDate, String paymentMode, Recharges recharge, String status) {
		super();
		this.transactionId = transactionId;
		this.transactionNumber = transactionNumber;
		this.amount = amount;
		this.payer = payer;
		this.transactionDate = transactionDate;
		this.paymentMode = paymentMode;
		this.recharge = recharge;
		this.status = status;
	}

	public int getTransactionId() {
		return transactionId;
	}

	public void setTransactionId(int transactionId) {
		this.transactionId = transactionId;
	}

	public String getTransactionNumber() {
		return transactionNumber;
	}

	public void setTransactionNumber(String transactionNumber) {
		this.transactionNumber = transactionNumber;
	}

	public BigDecimal getAmount() {
		return amount;
	}

	public void setAmount(BigDecimal amount) {
		this.amount = amount;
	}

	public Users getPayer() {
		return payer;
	}

	public void setPayer(Users payer) {
		this.payer = payer;
	}

	public LocalDateTime getTransactionDate() {
		return transactionDate;
	}

	public void setTransactionDate(LocalDateTime transactionDate) {
		this.transactionDate = transactionDate;
	}

	public String getPaymentMode() {
		return paymentMode;
	}

	public void setPaymentMode(String paymentMode) {
		this.paymentMode = paymentMode;
	}

	public Recharges getRecharge() {
		return recharge;
	}

	public void setRecharge(Recharges recharge) {
		this.recharge = recharge;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}
	
}
