package com.prepaidgo.MobiComm.Repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.prepaidgo.MobiComm.Model.Users;

@Repository
public interface UsersRepository extends JpaRepository<Users,Integer>{

	public Optional<Users> findByPhoneNumber(String phoneNumber);
	public Optional<Users> findByUsername(String username);
	public boolean existsByEmail(String email);
    public boolean existsByPhoneNumber(String phoneNumber);
    public boolean existsByUsername(String username);
    
    @Query("SELECT s FROM Users s WHERE s.role.role = 'SUBSCRIBER'")
	public List<Users> findAllSubscribers();
}
