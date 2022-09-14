package com.example.datego.vo.entity;

import com.example.datego.vo.entity.Enum.Gender;
import com.example.datego.vo.entity.Enum.ProviderType;
import com.example.datego.vo.entity.Enum.Role;
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
@Table(name = "user")
public class SpotDetail {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", columnDefinition = "INT")
    private int id;

    @ManyToOne()
    @JoinColumn(name = "category_detail_id")
    private User user;

    @ManyToOne()
    @JoinColumn(name = "spot_id")
    private Spot spot;
}
