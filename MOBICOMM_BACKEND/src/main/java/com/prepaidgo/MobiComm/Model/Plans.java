package com.prepaidgo.MobiComm.Model;

import java.math.BigDecimal;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

@Entity
public class Plans {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int planId;
	
	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name="categoryId", referencedColumnName="categoryId")
	@JsonManagedReference
	private Categories category;
	
	@Column(name="price" , nullable=false)
	private BigDecimal price;
	
	@Column(name="data" , nullable=false)
	private String data;
	
	@Column(name="calls")
	private String calls;
	
	@Column(name="sms")
	private String sms;
	
	@Column(name="validity")
	private String validity;
	
	@Column(name="Benefits")
	private String benefits;
	
	@Column(name="status" , columnDefinition = "VARCHAR(20) DEFAULT 'ACTIVE'")
	private String status;
	
	public Plans() {
		super();
	}

	public Plans(int planId, Categories category, BigDecimal price, String data, String validity,
			String benefits, String status) {
		super();
		this.planId = planId;
		this.category = category;
		this.price = price;
		this.data = data;
		this.validity = validity;
		this.benefits = benefits;
		this.status = status;
	}

	public int getPlanId() {
		return planId;
	}

	public void setPlanId(int planId) {
		this.planId = planId;
	}

	public Categories getCategory() {
		return category;
	}

	public void setCategory(Categories category) {
		this.category = category;
	}

	public BigDecimal getPrice() {
		return price;
	}

	public void setPrice(BigDecimal price) {
		this.price = price;
	}

	public String getData() {
		return data;
	}

	public void setData(String data) {
		this.data = data;
	}

	public String getValidity() {
		return validity;
	}

	public void setValidity(String validity) {
		this.validity = validity;
	}

	public String getBenefits() {
		return benefits;
	}

	public void setBenefits(String benefits) {
		this.benefits = benefits;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public String getCalls() {
		return calls;
	}

	public void setCalls(String calls) {
		this.calls = calls;
	}

	public String getSms() {
		return sms;
	}

	public void setSms(String sms) {
		this.sms = sms;
	}

	@Override
	public String toString() {
		return "Plans [planId=" + planId + ", category=" + category + ", price=" + price + ", data=" + data
				+ ", validity=" + validity + ", benefits=" + benefits + ", status="
				+ status + "]";
	}

}
