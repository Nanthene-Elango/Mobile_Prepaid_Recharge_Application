package com.prepaidgo.MobiComm.DTO;

import java.math.BigDecimal;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.prepaidgo.MobiComm.Model.Plans;


@JsonIgnoreProperties(ignoreUnknown = true)
public class PlansDTO {

	private int planId;
    private String category;
    private BigDecimal price;
    private String data;
    private String calls;
    private String sms;
    private String validity;
    private String benefits;
    private String status;
    public PlansDTO() {
		super();
	}

	public PlansDTO(Plans plan) {
        this.planId = plan.getPlanId();
        this.category = new CategoriesDTO(plan.getCategory()).getCategory();
        this.price = plan.getPrice();
        this.data = plan.getData();
        this.validity = plan.getValidity();
        this.benefits = plan.getBenefits();
        this.status = plan.getStatus();
        this.calls = plan.getCalls();
        this.sms = plan.getSms();
    }

	public int getPlanId() {
		return planId;
	}

	public void setPlanId(int planId) {
		this.planId = planId;
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

    
}
