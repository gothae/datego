package com.example.datego.dto.req;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class LoginReq {
    private String email;
    private String domain;
    private int age;
    private String nickName;
    private String gender;
}
