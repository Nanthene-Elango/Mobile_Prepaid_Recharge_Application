package com.prepaidgo.MobiComm.Model;

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
public class Support {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int supportId;
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name="userId" , referencedColumnName="userId" , nullable=false)
	private Users user;
	
	@Column(name="category" , nullable=false)
	private String category;
	
	@Column(name="description" , nullable=false)
	private String description;
	
	@Column(name="status" , nullable=false , columnDefinition = "VARCHAR(20) DEFAULT 'PENDING'")
	private String status;
}
