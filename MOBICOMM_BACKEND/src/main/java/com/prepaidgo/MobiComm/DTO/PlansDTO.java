package com.prepaidgo.MobiComm.DTO;

import java.math.BigDecimal;
import java.util.ArrayList;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;

import com.prepaidgo.MobiComm.Model.Plans;


@JsonIgnoreProperties(ignoreUnknown = true)
@JsonInclude(JsonInclude.Include.NON_NULL)
public class PlansDTO {

	private int planId;
    private String category;
    private BigDecimal price;
    private String data;
    private String validity;
    private String description;
    private ArrayList<String> benefits;
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
        this.description = plan.getDescription();
        this.benefits = new ArrayList<>();
        if (plan.getBenefits().isUnlimited_5G()) {
        	benefits.add("Unlimited 5G");
        }
        if (plan.getBenefits().getCalls() != null) {
        	benefits.add(plan.getBenefits().getCalls());
        }
        if (plan.getBenefits().getSms() != null) {
        	benefits.add(plan.getBenefits().getSms());
        }
        if (plan.getBenefits().getSubscription() != null) {
        	benefits.add(plan.getBenefits().getSubscription() + " Subscription");
        }
        if (plan.getBenefits().isWeekendDoubleData()) {
        	benefits.add("Weekend Double Data");
        }
        if (plan.getBenefits().isWeekendFreeData()) {
        	benefits.add("Weekend Free Data");
        }
        this.status = plan.getStatus();
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

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public ArrayList<String> getBenefits() {
		return benefits;
	}

	public void setBenefits(ArrayList<String> benefits) {
		this.benefits = benefits;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}
    
}
