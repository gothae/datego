package com.example.datego.Repository;

import com.example.datego.vo.entity.Menu;
import com.example.datego.vo.entity.Tag;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TagRepository extends JpaRepository<Tag, Integer> {
    List<Tag> findById(int id);
}
