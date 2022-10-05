package com.example.datego.controller;

import com.example.datego.dto.req.ReviewReq;
import com.example.datego.http.ApiResponse;
import com.example.datego.service.CategoryService;
import com.example.datego.service.ReviewService;
import com.example.datego.utils.AuthUtil;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/spots")
@AllArgsConstructor
public class ReviewController {

    private final ReviewService reviewService;

    private final AuthUtil authUtil;

    @GetMapping("{spotId}/reviews")
    public ApiResponse getSpotReviews(@PathVariable("spotId") int spotId) {

        return reviewService.getReviews(spotId);
    }

    @PostMapping("{userSpotId}/reviews")
    public ApiResponse postSpotReviews(@PathVariable("userSpotId") int userSpotId, @RequestBody ReviewReq reviewReq) {
        int userId = authUtil.memberAuth();
        return reviewService.postReviews(userSpotId, reviewReq);
    }

}
