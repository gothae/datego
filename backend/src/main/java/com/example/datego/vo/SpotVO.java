package com.example.datego.vo;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
@AllArgsConstructor
public class SpotVO {
    private String name;
    private int rate;
    private String image;
    private String address;
}
