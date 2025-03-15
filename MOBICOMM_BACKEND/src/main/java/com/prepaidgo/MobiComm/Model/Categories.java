package com.prepaidgo.MobiComm.Model;

import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

@Entity
@Table(name="categories")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"}) 
public class Categories {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int categoryId;
	
	@Column(name="category" , nullable=false , unique=true)
	private String category;
	
	@OneToMany(mappedBy = "category", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
	@JsonIgnore
//	@JsonBackReference
	private List<Plans> plans;

	public Categories() {
		super();
	}

	public Categories(int categoryId, String category) {
		super();
		this.categoryId = categoryId;
		this.category = category;
	}

	public int getCategoryId() {
		return categoryId;
	}

	public void setCategoryId(int categoryId) {
		this.categoryId = categoryId;
	}

	public String getCategory() {
		return category;
	}

	public void setCategory(String category) {
		this.category = category;
	}

	public List<Plans> getPlans() {
		return plans;
	}

	public void setPlans(List<Plans> plans) {
		this.plans = plans;
	}
	
	@Override
	public String toString() {
		return "category= " + category;
	}
}
