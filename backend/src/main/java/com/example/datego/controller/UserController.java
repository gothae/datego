package com.example.datego.controller;

import com.example.datego.dto.req.UserInfoReq;
import com.example.datego.http.ApiResponse;
import com.example.datego.service.UserService;
import com.example.datego.dto.req.LoginReq;
import com.example.datego.utils.AuthUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@RestController
@RequiredArgsConstructor
@RequestMapping("/users")
public class UserController {
    private final UserService userService;
    private final AuthUtil authUtil;

    @GetMapping("/images/{dongId}")
    public ApiResponse getUserImages(@PathVariable(value = "dongId") int dongId){
        int userIdx = authUtil.memberAuth();
        return userService.getUserImages(dongId, userIdx);
    }

    @PostMapping("/login")
    public ApiResponse login(HttpServletRequest request, HttpServletResponse response, @RequestBody LoginReq loginReq){
        return userService.userLogin(request, response, loginReq);
    }

    @PostMapping("/info")
    public ApiResponse saveUserInfo(HttpServletRequest request, HttpServletResponse response, @RequestBody UserInfoReq userInfoReq){
        return userService.saveUserInfos(request, response, userInfoReq);
    }

    @PostMapping("/logout")
    public ApiResponse logout(HttpServletRequest request, HttpServletResponse response){
        return userService.userLogout(request, response);
    }

    @PostMapping("/signout")
    public ApiResponse signout(HttpServletRequest request, HttpServletResponse response) {
        int userIdx = authUtil.memberAuth();
        return userService.userSignout(request, response, userIdx);
    }
}
