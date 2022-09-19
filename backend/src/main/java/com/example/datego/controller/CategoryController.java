package com.example.datego.controller;

import com.example.datego.http.ApiResponse;
import com.example.datego.service.CategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class CategoryController {
    private final CategoryService categoryService;
    @GetMapping("/categories")
    public ApiResponse getCategories(){
        return categoryService.getCategoryList();
    }
}
