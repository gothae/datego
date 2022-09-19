package com.example.datego.repository;

import com.example.datego.vo.entity.Menu;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MenuRepository extends JpaRepository<Menu, Integer> {
    List<Menu> findMenusBySpotId(int spotId);
}
