package com.prepaidgo.MobiComm.Model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;

@Entity
@Table(name="benefits" , uniqueConstraints = {
		@UniqueConstraint(columnNames = {"calls", "sms" , "unlimited_5g" , "subscription" , "weekendDoubleData" , "weekendFreeData"})
})
public class Benefits {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int benefitsId;
	
	@Column(name="calls")
	private String calls;

	@Column(name="sms")
	private String sms;
	
	@Column(name="unlimited_5g")
	private boolean unlimited_5G;
	
	@Column(name="subscription")
	private String subscription;
	
	@Column(name="weekendDoubleData")
	private boolean weekendDoubleData;
	
	@Column(name="weekendFreeData")
	private boolean weekendFreeData;
	
	public Benefits() {
		super();
	}

	public Benefits(int benefitsId, String calls, String sms, boolean unlimited_5g, String subscription,
			boolean weekendDoubleData, boolean weekendFreeData) {
		super();
		this.benefitsId = benefitsId;
		this.calls = calls;
		this.sms = sms;
		unlimited_5G = unlimited_5g;
		this.subscription = subscription;
		this.weekendDoubleData = weekendDoubleData;
		this.weekendFreeData = weekendFreeData;
	}

	public int getBenefitsId() {
		return benefitsId;
	}

	public void setBenefitsId(int benefitsId) {
		this.benefitsId = benefitsId;
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

	public boolean isUnlimited_5G() {
		return unlimited_5G;
	}

	public void setUnlimited_5G(boolean unlimited_5g) {
		unlimited_5G = unlimited_5g;
	}

	public String getSubscription() {
		return subscription;
	}

	public void setSubscription(String subscription) {
		this.subscription = subscription;
	}

	public boolean isWeekendDoubleData() {
		return weekendDoubleData;
	}

	public void setWeekendDoubleData(boolean weekendDoubleData) {
		this.weekendDoubleData = weekendDoubleData;
	}

	public boolean isWeekendFreeData() {
		return weekendFreeData;
	}

	public void setWeekendFreeData(boolean weekendFreeData) {
		this.weekendFreeData = weekendFreeData;
	}

	@Override
	public String toString() {
		return "Benefits [benefitsId=" + benefitsId + ", calls=" + calls + ", sms=" + sms + ", unlimited_5G="
				+ unlimited_5G + ", subscription=" + subscription + ", weekendDoubleData=" + weekendDoubleData
				+ ", weekendFreeData=" + weekendFreeData + "]";
	}

}
