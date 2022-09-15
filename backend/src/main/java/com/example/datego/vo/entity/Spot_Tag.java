package com.example.datego.vo.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.math.BigDecimal;
import java.util.List;

@Entity
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "spot_tag")
public class Spot_Tag {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", columnDefinition = "INT")
    private int id;

    @Column(name = "int")
    private int count;

    @ManyToOne()
    @JoinColumn(name = "tag_id")
    private Tag tag;

    @ManyToOne()
    @JoinColumn(name = "spot_id")
    private Spot spot;

}
