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
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
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
}
