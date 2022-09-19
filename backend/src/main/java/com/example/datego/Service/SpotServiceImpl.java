package com.example.datego.Service;

import com.example.datego.Dto.ImageDto;
import com.example.datego.Dto.MenuDto;
import com.example.datego.dto.SpotDetailDto;
import com.example.datego.Dto.TagDto;
import com.example.datego.Http.ApiResponse;
import com.example.datego.Repository.ImageRepository;
import com.example.datego.Repository.MenuRepository;
import com.example.datego.Repository.SpotRepository;
import com.example.datego.Repository.Spot_TagRepository;
import com.example.datego.Repository.TagRepository;
import com.example.datego.vo.entity.Image;
import com.example.datego.vo.entity.Spot;
import com.example.datego.vo.entity.Spot_Tag;
import com.example.datego.vo.entity.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.*;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Service
public class SpotServiceImpl implements SpotService{

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

    @Override
    @Transactional
    public ApiResponse getSpotDetail(int spotId) throws Exception{
        ApiResponse response = new ApiResponse();

        Optional<Spot> tempSpot = Optional.ofNullable(spotRepository.findSpotById(spotId));
        if (tempSpot.isEmpty()) throw new Exception();
        Spot spot = tempSpot.get();
        Stream<MenuDto> menuStream = menuRepository.findMenusBySpotId(spotId).stream().map(
                menu -> MenuDto.builder()
                        .name(menu.getName())
                        .price(menu.getPrice())
                        .build()
                        );
        List<MenuDto> menus = menuStream.collect(Collectors.toList());

        List<Spot_Tag> spot_tags = spot_tagRepository.findBySpotId((spotId));
        List<TagDto> tags = new ArrayList<>();
        for (int i = 0; i < spot_tags.size(); i++) {
            Spot_Tag temp = spot_tags.get(i);
            tags.add(TagDto.builder()
                    .name(temp.getTag().getName())
                    .description(temp.getTag().getDescription())
                    .count(temp.getCount())
                    .build());
        }

        Stream<String> imageStream =  imageRepository.findBySpotId(spotId).stream().map(
                image -> image.getImageLink()
        );
        List<String> images = imageStream.collect(Collectors.toList());

        SpotDetailDto dto = SpotDetailDto.builder()
                    .id(spot.getId())
                    .name(spot.getName())
                    .address(spot.getAddress())
                    .phone(spot.getPhone())
                    .latitube(spot.getLatitude())
                    .longitude(spot.getLongitude())
                    .rate(spot.getRate())
//                    .menus(menus)
//                    .tags(tags)
                    .images(images)
                    .build();

        response.setResponseData(dto);
        return response;
    }
}
