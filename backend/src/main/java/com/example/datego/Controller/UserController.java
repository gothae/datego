package com.example.datego.Controller;

import com.example.datego.Http.ApiResponse;
import com.example.datego.Service.UserService;
import com.example.datego.dto.req.LoginReq;
import com.example.datego.utils.AuthUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
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
        int userId=2;
        return userService.getUserImages(dongId, userId);
    }

    @PostMapping("/login")
    public ApiResponse login(HttpServletRequest request, HttpServletResponse response, @RequestBody LoginReq loginReq){
        return userService.userLogin(request, response, loginReq);
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
