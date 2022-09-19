package com.example.datego.Repository;

import com.example.datego.vo.entity.Enum.ProviderType;
import com.example.datego.vo.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import javax.swing.text.html.Option;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Integer> {
    Optional<User> findByEmail(String email);
    Optional<User> findByEmailAndDomain(String email, ProviderType domain);
}
