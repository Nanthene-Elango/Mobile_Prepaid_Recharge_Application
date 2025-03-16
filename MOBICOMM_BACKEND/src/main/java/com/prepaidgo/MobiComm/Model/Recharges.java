package com.prepaidgo.MobiComm.Model;

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
public class Recharges {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int rechargeId;
	
	@Column(nullable=false)
	private LocalDateTime dateOfRecharge;
	
	@Column(nullable=false)
	private LocalDateTime dateOfExpiry;
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name="userId" , referencedColumnName="userId" , nullable=false)
	private Users user;
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name="planId", referencedColumnName="planId" , nullable=false)
	private Plans plan;
	
	public Recharges() {
		super();
	}

	public Recharges(int rechargeId, LocalDateTime dateOfRecharge, LocalDateTime dateOfExpiry, Users user, Plans plan) {
		super();
		this.rechargeId = rechargeId;
		this.dateOfRecharge = dateOfRecharge;
		this.dateOfExpiry = dateOfExpiry;
		this.user = user;
		this.plan = plan;
	}

	public int getRechargeId() {
		return rechargeId;
	}

	public void setRechargeId(int rechargeId) {
		this.rechargeId = rechargeId;
	}

	public LocalDateTime getDateOfRecharge() {
		return dateOfRecharge;
	}

	public void setDateOfRecharge(LocalDateTime dateOfRecharge) {
		this.dateOfRecharge = dateOfRecharge;
	}

	public LocalDateTime getDateOfExpiry() {
		return dateOfExpiry;
	}

	public void setDateOfExpiry(LocalDateTime dateOfExpiry) {
		this.dateOfExpiry = dateOfExpiry;
	}

	public Users getUser() {
		return user;
	}

	public void setUser(Users user) {
		this.user = user;
	}

	public Plans getPlan() {
		return plan;
	}

	public void setPlan(Plans plan) {
		this.plan = plan;
	}
	
}
