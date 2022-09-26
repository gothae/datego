package com.example.datego.repository;

import com.example.datego.vo.entity.Image;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
@Repository

public interface ImageRepository extends JpaRepository<Image, Integer> {
    List<Image> findBySpotId(int spotId);
}
