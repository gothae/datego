package com.example.datego.service;

import com.example.datego.config.properties.AppProperties;
import com.example.datego.dto.req.UserInfoReq;
import com.example.datego.http.ApiResponse;
import com.example.datego.repository.*;
import com.example.datego.dto.req.LoginReq;
import com.example.datego.dto.res.UserImageRes;
import com.example.datego.oauth.token.AuthToken;
import com.example.datego.oauth.token.AuthTokenProvider;
import com.example.datego.utils.CookieUtil;
import com.example.datego.vo.UserImageVO;
import com.example.datego.vo.entity.Enum.Role;
import com.example.datego.vo.entity.Enum.Status;
import com.example.datego.vo.entity.Photo;
import com.example.datego.vo.entity.RefreshToken;
import com.example.datego.vo.entity.User;
import com.example.datego.vo.entity.User_Spot;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.*;

@Service
@RequiredArgsConstructor
public class UserService {
    private final static String REFRESH_TOKEN = "refresh_token";
    private final User_SpotRepository user_spotRepository;
    private final SpotRepository spotRepository;
    private final UserRepository userRepository;
    private final AuthTokenProvider authTokenProvider;
    private final AppProperties appProperties;
    private final RefreshTokenRepository refreshTokenRepository;
    private final PhotoRepository photoRepository;

    public ApiResponse getUserImages(int dongId, int userId) {
        ApiResponse result= new ApiResponse();
        UserImageRes userImageRes = new UserImageRes();
        List<UserImageVO> userImageVOs = new ArrayList<>();
        List<User_Spot> user_spotList = user_spotRepository.findAllByDongIdAndUserId(dongId, userId);
        for(User_Spot user_spot : user_spotList){
            Optional<Photo> myPhoto = photoRepository.findByUserspot_Id(user_spot.getId());
            if(myPhoto.isEmpty()){
                continue;
            }
            userImageVOs.add(new UserImageVO(
                    spotRepository.findById(user_spot.getSpot().getId()).get().getName(),
                    myPhoto.get().getPhotoLink()
                    ));
        }
        userImageRes.setPhotos(userImageVOs);
        result.setResponseData(userImageRes);

        return result;
    }

    public ApiResponse userLogin(HttpServletRequest request, HttpServletResponse response, LoginReq loginReq) {
        ApiResponse apiResponse = new ApiResponse();
        Optional<User> user = userRepository.findByEmail(loginReq.getEmail());
        Role role = Role.ADMIN;
        //????????? ??????
        if(user.isPresent()){
            // ???????????? ?????????!
            if(!user.get().getDomain().equals(User.ProviderType.valueOf(loginReq.getDomain()))){
                apiResponse.setCode(HttpStatus.BAD_REQUEST.value());
                apiResponse.setMessage("?????? ??????????????? ?????????????????????.");
                return apiResponse;
            }
            // ???????????? ????????? JWT ??????
            else{
                Date now = new Date();
                int id = userRepository.findByEmail(loginReq.getEmail()).get().getId();
                role = userRepository.findByEmail(loginReq.getEmail()).get().getRole();
                AuthToken accessToken = authTokenProvider.createAuthToken(id, role.toString(), new Date(now.getTime() + appProperties.getAuth().getTokenExpiry()));

                long refreshTokeExpiry = appProperties.getAuth().getRefreshTokenExpiry();

                AuthToken refreshToken = authTokenProvider.createAuthToken(appProperties.getAuth().getTokenSecret()
                        , new Date(now.getTime() + refreshTokeExpiry));

                Optional<RefreshToken> oldRefreshToken = refreshTokenRepository.findByEmail(loginReq.getEmail());
                // ????????? ????????????
                if(oldRefreshToken.isPresent()){
                    RefreshToken token = oldRefreshToken.get();
                    token.updateToken(refreshToken.getToken());
                    refreshTokenRepository.save(token);
                }
                // ????????? ??????
                else{
                    refreshTokenRepository.save(RefreshToken.builder()
                            .token(refreshToken.getToken())
                            .email(loginReq.getEmail())
                            .build());
                }
                int cookieMaxAge = (int) refreshTokeExpiry/60;
                CookieUtil.deleteCookie(request, response, REFRESH_TOKEN);
                CookieUtil.addCookie(response, REFRESH_TOKEN, refreshToken.getToken(), cookieMaxAge);
                Map<String, String> map = new HashMap<>();
                map.put("accessToken", accessToken.getToken());
                map.put("id",Integer.toString(id));
                apiResponse.setResponseData(map);

                return apiResponse;
            }
        }
        //????????? ?????? ????????? ?????????????????? return ?????? ??????
        else{
            apiResponse.setCode(201);
            apiResponse.setMessage("?????? ????????? ???????????????");
            return apiResponse;
        }

    }

    public ApiResponse userLogout(HttpServletRequest request, HttpServletResponse response) {
        CookieUtil.deleteCookie(request, response, REFRESH_TOKEN);
        return new ApiResponse();
    }

    public ApiResponse userSignout(HttpServletRequest request, HttpServletResponse response, int userIdx) {
        CookieUtil.deleteCookie(request, response, REFRESH_TOKEN);
        User user = userRepository.findById(userIdx).get();
        user.userDel();
        userRepository.save(user);
        return new ApiResponse();


    }

    public ApiResponse saveUserInfos(HttpServletRequest request, HttpServletResponse response, UserInfoReq userInfoReq) {
        ApiResponse apiResponse = new ApiResponse();
        // User??? ?????? ????????????
        User newUser = User.builder()
                .age(userInfoReq.getAge())
                .email(userInfoReq.getEmail())
                .domain(User.ProviderType.valueOf(userInfoReq.getDomain()))
                .gender(User.Gender.valueOf(userInfoReq.getGender()))
                .nickname(userInfoReq.getNickName())
                .status(Status.YES)
                .role(Role.MEMBER)
                .build();
        userRepository.save(newUser);

        // JWT ???????????????
        Date now = new Date();
        int id = userRepository.findByEmail(userInfoReq.getEmail()).get().getId();
        Role role = userRepository.findByEmail(userInfoReq.getEmail()).get().getRole();
        AuthToken accessToken = authTokenProvider.createAuthToken(id, role.toString(), new Date(now.getTime() + appProperties.getAuth().getTokenExpiry()));

        // refreshToken ???????????????
        long refreshTokeExpiry = appProperties.getAuth().getRefreshTokenExpiry();
        AuthToken refreshToken = authTokenProvider.createAuthToken(appProperties.getAuth().getTokenSecret()
                , new Date(now.getTime() + refreshTokeExpiry));

        // refreshToken ??????
        refreshTokenRepository.save(RefreshToken.builder()
                .token(refreshToken.getToken())
                .email(userInfoReq.getEmail())
                .build());

        int cookieMaxAge = (int) refreshTokeExpiry/60;
        CookieUtil.deleteCookie(request, response, REFRESH_TOKEN);
        CookieUtil.addCookie(response, REFRESH_TOKEN, refreshToken.getToken(), cookieMaxAge);
        Map<String, String> map = new HashMap<>();
        map.put("accessToken", accessToken.getToken());
        map.put("id",Integer.toString(id));
        apiResponse.setResponseData(map);

        return apiResponse;
    }
}
