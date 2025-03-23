package com.prepaidgo.MobiComm.DTO;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.prepaidgo.MobiComm.entity.Categories;

@JsonIgnoreProperties(ignoreUnknown = true)
@JsonInclude(JsonInclude.Include.NON_NULL)
public class CategoriesDTO {

	private String category;
	
	public CategoriesDTO() {
		
	}
	
	public CategoriesDTO(Categories category) {
		this.category = category.getCategory();
	}

	public String getCategory() {
		return category;
	}

	public void setCategory(String category) {
		this.category = category;
	}
	
}
