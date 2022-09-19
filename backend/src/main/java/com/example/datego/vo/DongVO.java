package com.example.datego.vo;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Getter
@AllArgsConstructor
@Builder
public class DongVO {
    int id;
    String name;
    int count;
}
