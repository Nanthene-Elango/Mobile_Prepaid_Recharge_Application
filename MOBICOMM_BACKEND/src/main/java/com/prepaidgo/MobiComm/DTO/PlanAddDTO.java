package com.prepaidgo.MobiComm.DTO;

import java.math.BigDecimal;

import com.prepaidgo.MobiComm.Model.Categories;

public class PlanAddDTO {

	private String category;
	private BigDecimal price;
    private String data;
    private String calls;
    private String sms;
    private String validity;
    private String benefits;
    
	public PlanAddDTO() {
		super();
		// TODO Auto-generated constructor stub
	}
	public PlanAddDTO(String category, BigDecimal price, String data, String calls, String sms, String validity,
			String benefits) {
		super();
		this.category = category;
		this.price = price;
		this.data = data;
		this.calls = calls;
		this.sms = sms;
		this.validity = validity;
		this.benefits = benefits;
	}
	public String getCategory() {
		return category;
	}
	public void setCategory(String category) {
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
    
    
}
