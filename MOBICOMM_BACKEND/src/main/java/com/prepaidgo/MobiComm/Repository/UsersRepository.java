package com.prepaidgo.MobiComm.Repository;

import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.prepaidgo.MobiComm.Model.Users;

import jakarta.transaction.Transactional;

@Repository
public interface UsersRepository extends JpaRepository<Users,Integer>{

	public Optional<Users> findByPhoneNumber(String phoneNumber);
	public Optional<Users> findByUsername(String username);
	public boolean existsByEmail(String email);
    public boolean existsByPhoneNumber(String phoneNumber);
    public boolean existsByUsername(String username);
    
    @Query("SELECT s FROM Users s WHERE s.role.role = 'SUBSCRIBER'")
	public List<Users> findAllSubscribers();
    
    @Modifying
    @Transactional
    @Query("UPDATE Users u SET u.email = :email WHERE u.userId = :userId")
	public int updateEmailByUserId(@Param("userId") int userId, @Param("email") String email);
    
    @Modifying
    @Transactional
    @Query("UPDATE Users u SET u.username = :username WHERE u.userId = :userId")
	public int updateUsernameByUserId(@Param("userId") int userId, @Param("username") String username);
    
    @Modifying
    @Transactional
    @Query("UPDATE Users u SET u.password = :password WHERE u.userId = :userId")
    void updatePasswordByUserId(@Param("userId") int userId, @Param("password") String password);
    
    @Query("SELECT u.fullName FROM Users u WHERE u.userId = :userId")
	public String getSubscriberFullName(@Param("userId") int userId);
    
    @Query("SELECT u.email FROM Users u WHERE u.userId = :userId")
	public String findEmail(@Param("userId") int userId);

}
