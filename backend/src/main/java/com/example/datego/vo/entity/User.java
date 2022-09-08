package com.example.datego.vo.entity;

import com.example.datego.vo.entity.Enum.Gender;
import com.example.datego.vo.entity.Enum.Domain;
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
@Table(name = "User")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_id", columnDefinition = "BIGINT")
    private int userId;

    @Column(name = "email", unique = true, length = 45)
    private String email;

    @Column(name = "nickname", length = 45)
    private String nickName;

    @Enumerated
    @Column(name = "gender")
    private Gender gender;
    @Column(name = "age", columnDefinition = "INT")
    private int age;

    @Enumerated
    @Column(name = "domain")
    private Domain domain;
}
