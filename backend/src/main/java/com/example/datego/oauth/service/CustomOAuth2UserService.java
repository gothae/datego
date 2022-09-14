package com.example.datego.oauth.service;

import com.example.datego.Repository.UserRepository;
import com.example.datego.oauth.entity.UserPrincipal;
import com.example.datego.oauth.info.OAuth2UserInfo;
import com.example.datego.oauth.info.OAuth2UserInfoFactory;
import com.example.datego.vo.entity.Enum.ProviderType;
import com.example.datego.vo.entity.Enum.Role;
import com.example.datego.vo.entity.User;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.InternalAuthenticationServiceException;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CustomOAuth2UserService extends DefaultOAuth2UserService {
    private final UserRepository memberRepository;
    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
        OAuth2User user = super.loadUser(userRequest);

        try {
            return process(userRequest, user);
        } catch (AuthenticationException ex) {
            throw ex;
        } catch (Exception ex) {
            ex.printStackTrace();
            throw new InternalAuthenticationServiceException(ex.getMessage(), ex.getCause());
        }
    }

    private OAuth2User process(OAuth2UserRequest userRequest, OAuth2User user) {
        ProviderType providerType = ProviderType.valueOf(userRequest.getClientRegistration().getRegistrationId().toUpperCase());

        OAuth2UserInfo userInfo = OAuth2UserInfoFactory.getOAuth2UserInfo(providerType, user.getAttributes());

        Optional<User> savedUser = memberRepository.findByEmail(userInfo.getEmail());
        if (savedUser.isPresent()) {
            // 그 외로 먼저 가입된 계정이 있을 때 다른 걸로 로그인하라고 띄워준다.
            if (!providerType.equals(savedUser.get().getDomain())) {
                return null;
            }
        }


        // 신규 가입 계정인 경우
        else {
            User newMember = createUser(userInfo, providerType);
            return UserPrincipal.create(newMember);
        }

        return UserPrincipal.create(savedUser.get());
    }

    private User createUser(OAuth2UserInfo userInfo, ProviderType providerType) {
        User member = User.builder()
                .email(userInfo.getEmail())
                .nickname(userInfo.getNickName())
                .role(Role.MEMBER)
                .domain(providerType)
                .build();
        memberRepository.save(member);
        return member;
    }
}
