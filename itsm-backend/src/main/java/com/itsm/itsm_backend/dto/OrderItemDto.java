package com.itsm.itsm_backend.dto;

import com.itsm.itsm_backend.entity.OrderItem;
import lombok.Data;
import java.math.BigDecimal;

@Data
public class OrderItemDto {
    private String componentType;
    private String componentName;
    private BigDecimal price;

    public OrderItemDto(OrderItem orderItem) {
        this.componentType = orderItem.getComponent().getComponentType().name();
        this.componentName = orderItem.getComponent().getComponentName();
        this.price = orderItem.getComponent().getPrice();
    }
}

