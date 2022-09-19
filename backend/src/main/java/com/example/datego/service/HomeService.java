package com.example.datego.service;

import com.example.datego.http.ApiResponse;
import com.example.datego.repository.DongRepository;
import com.example.datego.repository.User_SpotRepository;
import com.example.datego.vo.DongVO;
import com.example.datego.vo.entity.Dong;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class HomeService {
    private final DongRepository dongRepository;

    private final User_SpotRepository user_spotRepository;

    public ApiResponse getDongsInfo(int userId) {
        ApiResponse apiResponse = new ApiResponse();
        List<Dong> dongs = dongRepository.findAll();
        List<DongVO> dongVOs= new ArrayList<>();
        for (Dong dong : dongs) {
            int temp = user_spotRepository.findByDong(userId, dong.getId());

            dongVOs.add(DongVO.builder()
                    .id(dong.getId())
                    .name(dong.getName())
                    .count(temp)
                    .build());
        }
        apiResponse.setResponseData(dongVOs);
        return apiResponse;
    }
}
