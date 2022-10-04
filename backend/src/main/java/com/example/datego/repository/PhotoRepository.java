package com.example.datego.repository;

import com.example.datego.vo.entity.Photo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface PhotoRepository extends JpaRepository<Photo, Integer> {
    Optional<Photo> findByUserspot_Id(int user_spot_id);

}
