package com.example.datego.repository;

import com.example.datego.vo.entity.Spot_Tag;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface Spot_TagRepository extends JpaRepository<Spot_Tag, Integer> {
    List<Spot_Tag> findBySpotId(int spotId);
}
