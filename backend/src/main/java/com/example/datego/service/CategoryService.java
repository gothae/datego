package com.example.datego.service;

import com.example.datego.http.ApiResponse;
import com.example.datego.repository.TagRepository;
import com.example.datego.dto.res.CategoryRes;
import com.example.datego.vo.CategoryVO;
import com.example.datego.vo.entity.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class CategoryService {
    private final TagRepository tagRepository;

    public ApiResponse getCategoryList() {
        ApiResponse apiResponse = new ApiResponse();
        CategoryRes categories = new CategoryRes();
       List<Tag> cafe = tagRepository.findAllByCafe();
       List<Tag> drink = tagRepository.findAllByDrink();
       List<CategoryVO> cafeList = new ArrayList<>();
        List<CategoryVO> drinkList = new ArrayList<>();
       for(Tag tag : cafe){
            cafeList.add(new CategoryVO(tag.getId(),2,tag.getName(), tag.getImageLink()));
       }
       for(Tag tag : drink){
           drinkList.add(new CategoryVO(tag.getId(),3,tag.getName(), tag.getImageLink()));
       }
       categories.setCafes(cafeList);
       categories.setDrinks(drinkList);
        apiResponse.setResponseData(categories);
        return apiResponse;
    }
}
