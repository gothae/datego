package com.example.datego.vo;

import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.util.List;

@Getter
@Setter
public class ChangeSpotVO {
    private int id;
    private String name;
    private String image;
    private String address;
    private List<String> tags;
    private double rate;
    private int price;
    private BigDecimal latitude;
    private BigDecimal longitude;
}
