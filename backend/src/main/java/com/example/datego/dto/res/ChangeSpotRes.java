package com.example.datego.dto.res;

import com.example.datego.vo.ChangeSpotVO;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class ChangeSpotRes {
    List<ChangeSpotVO> spots;
}
