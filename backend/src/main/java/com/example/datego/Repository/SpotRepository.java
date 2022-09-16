package com.example.datego.Repository;

import com.example.datego.vo.entity.Spot;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SpotRepository extends JpaRepository<Spot, Integer> {
    List<Spot> findAllByDongId(int dongId);
}
