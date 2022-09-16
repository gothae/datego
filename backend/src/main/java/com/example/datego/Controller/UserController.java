package com.example.datego.Controller;

import com.example.datego.Http.ApiResponse;
import com.example.datego.Service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;

    @GetMapping("/images/{dongId}")
    public ApiResponse getUserImages(@PathVariable(value = "dongId") int dongId){
        int userId=0;
        return userService.getUserImages(dongId, userId);
    }
}
