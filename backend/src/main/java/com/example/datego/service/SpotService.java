package com.example.datego.service;

import com.example.datego.dto.req.MissionReq;
import com.example.datego.dto.res.MissionRes;
import com.example.datego.dto.res.SearchSpotRes;
import com.example.datego.dto.res.SpotDetailRes;
import com.example.datego.http.ApiResponse;
import com.example.datego.repository.*;
import com.example.datego.vo.MenuVO;
import com.example.datego.vo.SpotVO;
import com.example.datego.vo.TagVO;
import com.example.datego.vo.entity.Spot;
import com.example.datego.vo.entity.Spot_Tag;
import com.example.datego.vo.entity.User;
import com.example.datego.vo.entity.User_Spot;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.awt.print.Pageable;
import java.util.*;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Service
@RequiredArgsConstructor
public class SpotService {

    @Autowired
    SpotRepository spotRepository;

    @Autowired
    MenuRepository menuRepository;

    @Autowired
    ImageRepository imageRepository;

    @Autowired
    Spot_TagRepository spot_tagRepository;

    @Autowired
    TagRepository tagRepository;

    private final User_SpotRepository user_spotRepository;
    private final UserRepository userRepository;

    @Transactional
    public ApiResponse getSpotDetail(int spotId) throws Exception {
        ApiResponse response = new ApiResponse();

        Optional<Spot> tempSpot = Optional.ofNullable(spotRepository.findSpotById(spotId));
        if (tempSpot.isEmpty()) throw new Exception();
        Spot spot = tempSpot.get();
        Stream<MenuVO> menuStream = menuRepository.findMenusBySpotId(spotId).stream().map(
                menu -> MenuVO.builder()
                        .name(menu.getName())
                        .price(menu.getPrice())
                        .build()
        );
        List<MenuVO> menus = menuStream.collect(Collectors.toList());

        List<Spot_Tag> spot_tags = spot_tagRepository.findBySpotId((spotId));
        List<TagVO> tags = new ArrayList<>();
        for (int i = 0; i < spot_tags.size(); i++) {
            Spot_Tag temp = spot_tags.get(i);
            tags.add(TagVO.builder()
                    .name(temp.getTag().getName())
                    .description(temp.getTag().getDescription())
                    .count(temp.getCount())
                    .build());
        }

        Stream<String> imageStream = imageRepository.findBySpotId(spotId).stream().map(
                image -> image.getImageLink()
        );
        List<String> images = imageStream.collect(Collectors.toList());

        SpotDetailRes dto = SpotDetailRes.builder()
                .id(spot.getId())
                .name(spot.getName())
                .address(spot.getAddress())
                .phone(spot.getPhone())
                .latitube(spot.getLatitude())
                .longitude(spot.getLongitude())
                .rate(spot.getRate())
                .menus(menus)
                .tags(tags)
                .images(images)
                .build();

        response.setResponseData(dto);
        return response;
    }

    public ApiResponse getSpotMissions(MissionReq missionReq) {
        ApiResponse apiResponse = new ApiResponse();
        List<String> missions = new ArrayList<>();
        for (Integer id : missionReq.getSpotIds()) {
            missions.add(spotRepository.findSpotById(id).getQuest());
        }
        MissionRes missionRes = new MissionRes();
        missionRes.setQuests(missions);
        apiResponse.setResponseData(missionRes);
        return apiResponse;
    }

    public ApiResponse savePhotos(String url, int userIdx, int spotIdx) {
        Spot spot = spotRepository.findSpotById(spotIdx);
        User user = userRepository.findById(userIdx).get();
        User_Spot user_spot = User_Spot.builder()
                .spot(spot)
                .user(user)
                .imageLink(url)
                .build();
        user_spotRepository.save(user_spot);
        return new ApiResponse();
    }

    public ApiResponse searchSpots(String name, String page) {
        int pageNum = Integer.parseInt(page);
        PageRequest pageRequest = PageRequest.of(pageNum, 5);
        SearchSpotRes searchSpotRes = new SearchSpotRes();
        ApiResponse apiResponse = new ApiResponse();
        List<Spot> spotList = spotRepository.findAllByNameContaining(name, pageRequest).stream().collect(Collectors.toList());
        List<SpotVO> spotVOList = new ArrayList<>();
        for (Spot spot : spotList) {
            String url=null;
            if(spot.getImageList().size()!=0){
                url = spot.getImageList().get(0).getImageLink();
            }

            spotVOList.add(new SpotVO(spot.getName(), spot.getRate(), spot.getAddress(), url));
        }
        searchSpotRes.setSpotList(spotVOList);
        apiResponse.setResponseData(searchSpotRes);
        return apiResponse;
    }
}

