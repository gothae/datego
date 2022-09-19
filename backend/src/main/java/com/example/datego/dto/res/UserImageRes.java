package com.example.datego.dto.res;

import com.example.datego.vo.UserImageVO;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class UserImageRes {
    private List<UserImageVO> photos;
}
