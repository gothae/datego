package com.example.datego.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

import java.math.BigDecimal;
import java.util.List;

@Getter
@AllArgsConstructor
@Builder
public class SpotDetailDto {
    int id;
    String name;
    String imageLink;
    String address;
    String phone;
    double rate;
    int price;
    BigDecimal latitube;
    BigDecimal longitude;
//    List<MenuDto> menus;
//    List<TagDto> tags;
    List<String> images;
}
