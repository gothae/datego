package com.example.datego.repository;

import com.example.datego.vo.entity.Spot;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;



public interface SpotRepository extends JpaRepository<Spot, Integer> {
    Spot findSpotById(int id);
    Page<Spot> findAllByNameContaining(String name, Pageable pageable);
}
