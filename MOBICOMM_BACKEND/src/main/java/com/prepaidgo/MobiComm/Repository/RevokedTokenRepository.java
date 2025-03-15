package com.prepaidgo.MobiComm.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.prepaidgo.MobiComm.Model.RevokedToken;

public interface RevokedTokenRepository extends JpaRepository<RevokedToken , String> {

}
