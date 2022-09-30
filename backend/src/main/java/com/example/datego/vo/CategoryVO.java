package com.example.datego.vo;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class CategoryVO {
    private int id;
    private int categoryId;
    private String name;
    private String image;
}
