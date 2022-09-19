package com.example.datego.vo.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.List;

@Entity
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "category")
public class Category {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", columnDefinition = "INT")
    private int id;

    @Column(name = "name", length = 45)
    private String name;

    @OneToMany(mappedBy = "category")
    private List<CategoryDetail> categoryDetailList;

    @OneToMany(mappedBy = "category")
    private List<Spot> spotList;

    @OneToMany(mappedBy = "category")
    private List<Tag> tagList;
}
