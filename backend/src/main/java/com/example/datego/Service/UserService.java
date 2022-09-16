package com.example.datego.Service;

import com.example.datego.Http.ApiResponse;
import com.example.datego.dto.res.UserImageRes;
import com.example.datego.vo.UserImageVO;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class UserService {
    public ApiResponse getUserImages(int dongId, int userId) {
        ApiResponse result= new ApiResponse();
        UserImageRes userImageRes = new UserImageRes();
        List<UserImageVO> userImageVOs = new ArrayList<>();
        userImageVOs.add(new UserImageVO("hi","hi"));
        userImageVOs.add(new UserImageVO("hi2","hi2"));
        userImageRes.setImageList(userImageVOs);
        result.setResponseData(userImageRes);

        return result;
    }
}
