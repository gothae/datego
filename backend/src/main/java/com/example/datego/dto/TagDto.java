package com.example.datego.Dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Getter
@AllArgsConstructor
@Builder
public class TagDto {
    String name;
    String description;
    int count;
}
