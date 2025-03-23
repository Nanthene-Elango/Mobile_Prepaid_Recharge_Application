package com.prepaidgo.MobiComm.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.prepaidgo.MobiComm.entity.RevokedToken;

public interface RevokedTokenRepository extends JpaRepository<RevokedToken , String> {

}
