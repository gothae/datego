package com.example.datego.Service;

import com.example.datego.dto.SpotDetailDto;
import com.example.datego.Http.ApiResponse;

public interface SpotService {
    ApiResponse getSpotDetail(int spotId) throws Exception ;
}
