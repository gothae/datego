package com.example.datego.dto.res;

import com.example.datego.vo.MenuVO;
import com.example.datego.vo.TagVO;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

import java.math.BigDecimal;
import java.util.List;

@Getter
@AllArgsConstructor
@Builder
public class SpotDetailRes {
    int id;
    String name;
    String address;
    String phone;
    double rate;
    String quest;
    int price;
    BigDecimal latitude;
    BigDecimal longitude;
    List<MenuVO> menus;
    List<TagVO> tags;
    List<String> images;
}
