package com.prepaidgo.MobiComm.DTO;

import java.math.BigDecimal;
import java.util.List;

public class FilterCriteria {
	
    private BigDecimal maxPrice;
    private List<String> selectedData;
    private List<String> selectedValidity;

    public BigDecimal getMaxPrice() {
        return maxPrice;
    }

    public void setMaxPrice(BigDecimal maxPrice) {
        this.maxPrice = maxPrice;
    }

    public List<String> getSelectedData() {
        return selectedData;
    }

    public void setSelectedData(List<String> selectedData) {
        this.selectedData = selectedData;
    }

    public List<String> getSelectedValidity() {
        return selectedValidity;
    }

    public void setSelectedValidity(List<String> selectedValidity) {
        this.selectedValidity = selectedValidity;
    }
}
