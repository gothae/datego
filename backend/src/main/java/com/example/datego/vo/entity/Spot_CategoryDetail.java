package com.example.datego.vo.entity;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "spot_category_detail")
public class Spot_CategoryDetail {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", columnDefinition = "INT")
    private int id;

    @ManyToOne()
    @JoinColumn(name = "category_detail_id")
    private CategoryDetail categoryDetail;

    @ManyToOne()
    @JoinColumn(name = "spot_id")
    private Spot spot;
}
