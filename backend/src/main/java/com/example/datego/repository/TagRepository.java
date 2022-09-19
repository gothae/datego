package com.example.datego.repository;

import com.example.datego.vo.entity.Tag;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface TagRepository extends JpaRepository<Tag, Integer> {
    @Query(nativeQuery = true, value = "select * from tag t left join category c on t.category_id = c.id " +
            "where t.category_id=2 order by count desc LIMIT 5")
    List<Tag> findAllByCafe();

    @Query(nativeQuery = true, value = "select * from tag t left join category c on t.category_id = c.id " +
            "where t.category_id=3 order by count desc LIMIT 5")
    List<Tag> findAllByDrink();

    Tag findById(int id);
}
