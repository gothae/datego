package com.example.datego.Repository;

import com.example.datego.vo.entity.Image;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ImageRepository extends JpaRepository<Image, Integer> {
    List<Image> findBySpotId(int spotId);
}
