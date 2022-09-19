package com.example.datego.Controller;

import com.example.datego.Http.ApiResponse;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/spots")
public class ReviewController {

    @GetMapping("{spotId}/reviews")
    public ApiResponse getSpotReviews(@PathVariable("spotId") int spotId) {
        return new ApiResponse();
    }
}
