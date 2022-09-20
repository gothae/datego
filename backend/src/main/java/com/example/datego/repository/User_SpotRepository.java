package com.example.datego.repository;

import com.example.datego.vo.entity.User_Spot;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface User_SpotRepository extends JpaRepository<User_Spot, Integer> {
    @Query(nativeQuery = true, value = "select * from user_spot c left join spot s on c.spot_id = s.id where s.dong_id = :dongId and c.user_id = :userId")
    public List<User_Spot> findAllByDongIdAndUserId(@Param("dongId") int dongId, @Param("userId") int userId);

    public Optional<User_Spot> findByUserIdAndSpotId(int userId, int spotId);

    @Query(nativeQuery = true, value = "select COUNT(us.id) from user_spot us left join spot s on us.spot_id = s.id where user_id = :userId and dong_id= :dongId")
    public int findByDong(@Param("userId") int userId, @Param("dongId") int dongId);


}
