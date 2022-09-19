package com.example.datego.controller;

import com.example.datego.http.ApiResponse;
import com.example.datego.service.SpotService;
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
