package com.example.datego.dto.req;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class ChangeSpotReq {
    List<Integer> spots;
}
