package com.example.datego.dto.res;

import com.example.datego.vo.SpotVO;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class SearchSpotRes {
    private List<SpotVO> spotList;
}
