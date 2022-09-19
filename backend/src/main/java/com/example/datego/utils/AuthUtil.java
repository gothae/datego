package com.example.datego.utils;


import com.example.datego.Repository.UserRepository;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

@RequiredArgsConstructor
@Component
public class AuthUtil {
    private final UserRepository userRepository;
    public Integer memberAuth(){
        Integer userId = null;
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        try{
            userId = Integer.parseInt(((UserDetails)authentication.getPrincipal()).getUsername());
            if(!userRepository.existsById(userId)){
                throw new RuntimeException();
            }
        }
        catch(Exception e){
            e.printStackTrace();
        }
        return userId;
    }
}
