package com.prepaidgo.MobiComm.Repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.prepaidgo.MobiComm.Model.Transaction;

@Repository
public interface TransactionRepository extends JpaRepository<Transaction , Integer>{

	Optional<Transaction> findByTransactionNumber(String transactionNumber);

}
