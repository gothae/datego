package com.example.datego.vo.entity;

import com.example.datego.vo.entity.Enum.Role;
import com.example.datego.vo.entity.Enum.Status;
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
@Table(name = "user")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", columnDefinition = "INT")
    private int id;

    @Column(name = "email", unique = true, length = 45)
    private String email;

    @Column(name = "nickname", length = 45)
    private String nickname;

    @Enumerated(EnumType.STRING)
    @Column(name = "gender")
    private Gender gender;

    @Column(name = "age", columnDefinition = "INT")
    private int age;

    @Enumerated(EnumType.STRING)
    @Column(name="role")
    private Role role;

    @Enumerated(EnumType.STRING)
    @Column(name = "domain")
    private ProviderType domain;

    @OneToMany(mappedBy = "user")
    private List<User_Spot> userSpotList;

    @Enumerated(EnumType.STRING)
    private Status status;

    public void userDel(){
        this.status=Status.DELETE;
    }

    public enum Gender {
        M, F
    }
    public enum ProviderType {
        KAKAO, GOOGLE, NAVER
    }
}
