package com.itsm.itsm_backend.dto;

import java.util.List;

public class OrderRequest {
    // CHANGED from Long to Integer to match the Component's ID type
    private List<Integer> componentIds;
    private String shippingAddress;

    // Getters and Setters
    // CHANGED from Long to Integer
    public List<Integer> getComponentIds() { return componentIds; }
    public void setComponentIds(List<Integer> componentIds) { this.componentIds = componentIds; }
    public String getShippingAddress() { return shippingAddress; }
    public void setShippingAddress(String shippingAddress) { this.shippingAddress = shippingAddress; }
}