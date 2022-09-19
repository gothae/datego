package com.example.datego.http;

import lombok.Getter;
import lombok.Setter;
import org.springframework.http.HttpStatus;

@Getter
@Setter
public class ApiResponse {
    private int code = HttpStatus.OK.value();
    private String message = "SUCCESS";
    private Object responseData;

    public ApiResponse() {}

    public ApiResponse(int code, String message, Object responseData) {
        this.setCode(code);
        this.setMessage(message);
        this.responseData = responseData;
    }
    public void setMessage(String message) {
        this.message = message;
    }

    public void setResponseData(Object value) {
        this.responseData=value;
    }
}
