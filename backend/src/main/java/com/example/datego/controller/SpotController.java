package com.example.datego.controller;

import com.example.datego.dto.req.MissionReq;
import com.example.datego.http.ApiResponse;
import com.example.datego.service.SpotService;
import com.example.datego.utils.AuthUtil;
import com.example.datego.utils.S3Uploader;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/courses")
@RequiredArgsConstructor
public class SpotController {
    // return spotDetailDto
    @Autowired
    SpotService spotService;
    private final AuthUtil authUtil;
    private final S3Uploader s3Uploader;

    @GetMapping("/spots/{spotId}")
    public ApiResponse getSpotDetail(@PathVariable("spotId") int spotId) throws Exception{
        return spotService.getSpotDetail(spotId);
    }

    @GetMapping("/start")
    public ApiResponse getMissions(@RequestBody MissionReq missionReq) throws Exception{
        return spotService.getSpotMissions(missionReq);
    }

    @PostMapping("/spots/{userSpotId}")
    public ApiResponse savePhoto(@PathVariable("userSpotId") int userSpotId,@RequestParam MultipartFile file) throws Exception{
        int userIdx = authUtil.memberAuth();
        String url ="";
        try{
            url = s3Uploader.upload(file,"DateGo");
        } catch (Exception e){
            e.printStackTrace();
        }
        return spotService.savePhotos(url, userSpotId);
    }

    @GetMapping("/spots")
    public ApiResponse searchSpot(@RequestParam(value = "name") String name,
                                  @RequestParam(value="page", required = false) String page){
        return spotService.searchSpots(name, page);
    }
}
