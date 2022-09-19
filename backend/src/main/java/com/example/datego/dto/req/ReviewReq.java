package com.example.datego.dto.req;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class ReviewReq {
    private List<Integer> reviewIds;
    private int rate;
}
