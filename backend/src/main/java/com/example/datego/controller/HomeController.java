package com.example.datego.controller;

import com.example.datego.http.ApiResponse;
import com.example.datego.service.HomeService;
import com.example.datego.utils.AuthUtil;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/main")
@RequiredArgsConstructor
public class HomeController {

    private final AuthUtil authUtil;

    private final HomeService homeService;

    @GetMapping("")
    public ApiResponse getSpotDetail() throws Exception{
        int userId = authUtil.memberAuth();
        return homeService.getDongsInfo(userId);
    }

}
