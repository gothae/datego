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
@Table(name = "category_detail")
public class CategoryDetail {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", columnDefinition = "INT")
    private int id;

    @ManyToOne()
    @JoinColumn(name = "category_id")
    private Category category;

    @Column(name = "name", length = 45)
    private String name;

    @Column(name = "image_link", length = 45)
    private String imageLink;

    @OneToMany(mappedBy = "category_detail")
    private List<SpotDetail> spotDetailList;
}
