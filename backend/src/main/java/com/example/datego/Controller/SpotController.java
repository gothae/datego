package com.example.datego.Controller;

import com.example.datego.Http.ApiResponse;
import com.example.datego.Service.SpotService;
import com.example.datego.Service.SpotServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/courses")
public class SpotController {
    // return spotDetailDto
    @Autowired
    SpotService spotService;

    @GetMapping("/spots/{spotId}")
    public ApiResponse getSpotDetail(@PathVariable("spotId") int spotId) throws Exception{
        return spotService.getSpotDetail(spotId);
    }
}
