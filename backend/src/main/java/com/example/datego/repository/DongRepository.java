package com.example.datego.repository;

import com.example.datego.vo.entity.Dong;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface DongRepository extends JpaRepository<Dong, Integer> {
    List<Dong> findAll();
}
