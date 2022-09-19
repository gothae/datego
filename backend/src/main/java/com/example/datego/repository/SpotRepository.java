package com.example.datego.repository;

import com.example.datego.vo.entity.Spot;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SpotRepository extends JpaRepository<Spot, Integer> {
    Spot findSpotById(int id);
}
