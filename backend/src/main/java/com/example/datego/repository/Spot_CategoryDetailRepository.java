package com.example.datego.repository;

import com.example.datego.vo.entity.Spot_CategoryDetail;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface Spot_CategoryDetailRepository extends JpaRepository<Spot_CategoryDetail, Integer> {
}
