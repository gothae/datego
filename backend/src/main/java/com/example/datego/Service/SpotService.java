package com.example.datego.Service;

import com.example.datego.Dto.SpotDetailDto;
import com.example.datego.Http.ApiResponse;

public interface SpotService {
    ApiResponse getSpotDetail(int spotId) throws Exception ;
}
