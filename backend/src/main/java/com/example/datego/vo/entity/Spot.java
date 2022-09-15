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
@Table(name = "spot")
public class Spot {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", columnDefinition = "INT")
    private int id;

    @Column(name = "name", unique = true, length = 45)
    private String name;

    @Column(name = "address", length = 45)
    private String address;

    @Column(name = "latitude", precision = 11, scale = 8)
    private BigDecimal latitude;

    @Column(name = "longitude", precision = 11, scale = 8)
    private BigDecimal longitude;

    @Column(name = "rate", columnDefinition = "INT")
    private int rate;

    @Column(name = "quest", columnDefinition = "TEXT")
    private String quest;

    @OneToMany(mappedBy = "spot")
    private List<Image> imageList;

    @OneToMany(mappedBy = "spot")
    private List<Menu> menuList;

    @OneToMany(mappedBy = "spot")
    private List<Spot_Tag> spotTagList;

    @OneToMany(mappedBy = "spot")
    private List<User_Spot> userSpotList;

    @OneToMany(mappedBy = "spot")
    private List<Spot_CategoryDetail> spotCategoryDetailList;

    @ManyToOne()
    @JoinColumn(name = "category_id")
    private Category category;

    @ManyToOne()
    @JoinColumn(name = "dong_id")
    private Dong dong;
}
