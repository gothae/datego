package com.example.datego.oauth.service;

import com.example.datego.repository.UserRepository;
import com.example.datego.oauth.entity.UserPrincipal;
import com.example.datego.vo.entity.User;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CustomUserDetailsService implements UserDetailsService {

private final UserRepository userRepository;
@Override
public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        User user = userRepository.findByEmail(email).get();
        if (user == null) {
        throw new UsernameNotFoundException("Can not find username.");
        }
        return UserPrincipal.create(user);
        }
}