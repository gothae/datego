package com.example.datego.dto.res;

import com.example.datego.vo.CategoryVO;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class CategoryRes {
    private List<CategoryVO> cafes;
    private List<CategoryVO> drinks;
}
