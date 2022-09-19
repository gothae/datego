package com.example.datego.Controller;

import com.example.datego.Http.ApiResponse;
import com.example.datego.Service.CategoryService;
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
