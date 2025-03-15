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
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
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
	
}
