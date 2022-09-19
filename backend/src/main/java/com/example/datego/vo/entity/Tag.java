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
@Table(name = "tag")
public class Tag {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", columnDefinition = "INT")
    private int id;

    @Column(name = "name", length = 45)
    private String name;

    @Column(name = "description", length = 45)
    private String description;

    @Column(name = "image_link")
    private String imageLink;

    @OneToMany(mappedBy = "tag")
    private List<Spot_Tag> spotTagList;

    @ManyToOne
    @JoinColumn(name="category_id")
    private Category category;

    private int count;
}
