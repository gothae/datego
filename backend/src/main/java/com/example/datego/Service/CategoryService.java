package com.example.datego.Service;

import com.example.datego.Http.ApiResponse;
import com.example.datego.Repository.CategoryRepository;
import com.example.datego.Repository.TagRepository;
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
            cafeList.add(new CategoryVO(tag.getName(), tag.getImageLink()));
       }
       for(Tag tag : drink){
           drinkList.add(new CategoryVO(tag.getName(), tag.getImageLink()));
       }
       categories.setCafe(cafeList);
       categories.setDrink(drinkList);
        apiResponse.setResponseData(categories);
        return apiResponse;
    }
}