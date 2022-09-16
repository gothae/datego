package com.example.datego.Service;

import com.example.datego.Config.Properties.AppProperties;
import com.example.datego.Http.ApiResponse;
import com.example.datego.Repository.RefreshTokenRepository;
import com.example.datego.Repository.SpotRepository;
import com.example.datego.Repository.UserRepository;
import com.example.datego.Repository.User_SpotRepository;
import com.example.datego.dto.req.LoginReq;
import com.example.datego.dto.res.UserImageRes;
import com.example.datego.oauth.token.AuthToken;
import com.example.datego.oauth.token.AuthTokenProvider;
import com.example.datego.utils.CookieUtil;
import com.example.datego.vo.UserImageVO;
import com.example.datego.vo.entity.Enum.Gender;
import com.example.datego.vo.entity.Enum.ProviderType;
import com.example.datego.vo.entity.RefreshToken;
import com.example.datego.vo.entity.Spot;
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

    public ApiResponse getUserImages(int dongId, int userId) {
        ApiResponse result= new ApiResponse();
        UserImageRes userImageRes = new UserImageRes();
        List<UserImageVO> userImageVOs = new ArrayList<>();
        List<User_Spot> user_spotList = user_spotRepository.findAllByDongIdAndUserId(dongId, userId);
        for(User_Spot user_spot : user_spotList){
            userImageVOs.add(new UserImageVO(
                    spotRepository.findById(user_spot.getSpot().getId()).get().getName(),
                    user_spot.getImageLink()
                    ));
        }
        userImageRes.setImageList(userImageVOs);
        result.setResponseData(userImageRes);

        return result;
    }

    public ApiResponse userLogin(HttpServletRequest request, HttpServletResponse response, LoginReq loginReq) {
        ApiResponse apiResponse = new ApiResponse();
        Optional<User> user = userRepository.findByEmail(loginReq.getEmail());
        //유저가 있음
        if(user.isPresent()){
            // 도메인이 다르면!
            if(!user.get().getDomain().equals(ProviderType.valueOf(loginReq.getDomain()))){
                apiResponse.setCode(HttpStatus.BAD_REQUEST.value());
                apiResponse.setMessage("다른 플랫폼으로 로그인해주세요.");
                return apiResponse;
            }
        }
        //유저 정보 저장 후 JWT 리턴해주기
        else{
            User newUser = User.builder()
                    .age(loginReq.getAge())
                    .email(loginReq.getEmail())
                    .domain(ProviderType.valueOf(loginReq.getDomain()))
                    .gender(Gender.valueOf(loginReq.getGender()))
                    .build();
            userRepository.save(newUser);
        }
        Date now = new Date();
        String id = Integer.toString(userRepository.findByEmail(loginReq.getEmail()).get().getId());
        AuthToken accessToken = authTokenProvider.createAuthToken(id, new Date(now.getTime() + appProperties.getAuth().getTokenExpiry()));

        long refreshTokeExpiry = appProperties.getAuth().getRefreshTokenExpiry();

        AuthToken refreshToken = authTokenProvider.createAuthToken(appProperties.getAuth().getTokenSecret()
                , new Date(now.getTime() + refreshTokeExpiry));

        Optional<RefreshToken> oldRefreshToken = refreshTokenRepository.findByEmail(loginReq.getEmail());
        // 있으면 갱신해줌
        if(oldRefreshToken.isPresent()){
            RefreshToken token = refreshTokenRepository.findById(oldRefreshToken.get().getId()).get();
            token = RefreshToken.builder()
                    .email(token.getEmail())
                    .token(refreshToken.getToken())
                    .build();
            refreshTokenRepository.save(token);
        }
        // 없으면 생성
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
        apiResponse.setResponseData(map);

        return apiResponse;
    }

    public ApiResponse userLogout(HttpServletRequest request, HttpServletResponse response) {
        CookieUtil.deleteCookie(request, response, REFRESH_TOKEN);
        return new ApiResponse();
    }
}
