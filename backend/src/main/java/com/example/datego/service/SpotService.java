package com.example.datego.service;

import com.example.datego.dto.req.ChangeSpotReq;
import com.example.datego.dto.req.MissionReq;
import com.example.datego.dto.res.ChangeSpotRes;
import com.example.datego.dto.res.MissionRes;
import com.example.datego.dto.res.SearchSpotRes;
import com.example.datego.dto.res.SpotDetailRes;
import com.example.datego.http.ApiResponse;
import com.example.datego.repository.*;
import com.example.datego.vo.ChangeSpotVO;
import com.example.datego.vo.MenuVO;
import com.example.datego.vo.SpotVO;
import com.example.datego.vo.TagVO;
import com.example.datego.vo.entity.*;
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
    private final PhotoRepository photoRepository;
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

        List<Spot_Tag> spot_tags = spot_tagRepository.findTop5BySpotIdOrderByCountDesc(spotId);
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
                .rate((double)spot.getRate()/spot.getCount())
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

    public ApiResponse savePhotos(String url, int userSpotIdx) {
        User_Spot user_spot = user_spotRepository.findById(userSpotIdx).get();
        Photo photo = Photo.builder()
                .photoLink(url)
                .user_spot(user_spot)
                .build();
        photoRepository.save(photo);
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

            spotVOList.add(new SpotVO(spot.getId(), spot.getName(), spot.getRate(), spot.getAddress(), url));
        }
        searchSpotRes.setSpots(spotVOList);
        apiResponse.setResponseData(searchSpotRes);
        return apiResponse;
    }

    public ApiResponse getChangeSpot(ChangeSpotReq changeSpotReq, int spotId, int page) {
        ApiResponse apiResponse = new ApiResponse();
        List<Integer> spots2 = changeSpotReq.getSpots();
        spots2.remove(Integer.valueOf(spotId));
        int i = page*5;
        ChangeSpotRes changeSpotRes = new ChangeSpotRes();
        List<ChangeSpotVO> spots = new ArrayList<>();
        int num = 5;
        if(spots2.size() <6){
            num = spots2.size();
        }
        for(int k=0;k<num;k++){
            int spotIndex = spots2.get(k);
            Spot spot = spotRepository.findSpotById(spotIndex);
            List<String> tags = new ArrayList<>();
            tags.add(spot.getCategory().getName());
            List<Spot_Tag> spot_tags = spot_tagRepository.findTop3BySpotIdOrderByCountDesc(spotIndex);
            for(Spot_Tag st : spot_tags){
                tags.add(st.getTag().getName());
            }
            ChangeSpotVO changeSpotVO = new ChangeSpotVO();
            changeSpotVO.setId(spot.getId());
            changeSpotVO.setAddress(spot.getAddress());
            changeSpotVO.setImage(spot.getImageList().get(0).getImageLink());
            changeSpotVO.setName(spot.getName());
            changeSpotVO.setPrice(spot.getMenuList().get(0).getPrice());
            changeSpotVO.setLatitude(spot.getLatitude());
            changeSpotVO.setLongitude(spot.getLongitude());
            changeSpotVO.setRate(spot.getRate());
            changeSpotVO.setTags(tags);

            spots.add(changeSpotVO);
        }
        changeSpotRes.setSpots(spots);
        apiResponse.setResponseData(changeSpotRes);

        return apiResponse;
    }
}

