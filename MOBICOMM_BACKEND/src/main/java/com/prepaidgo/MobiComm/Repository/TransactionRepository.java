package com.prepaidgo.MobiComm.Repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.prepaidgo.MobiComm.Model.Transaction;

@Repository
public interface TransactionRepository extends JpaRepository<Transaction , Integer>{

	Optional<Transaction> findByTransactionNumber(String transactionNumber);

	 @Query("SELECT t FROM Transaction t WHERE t.payer.userId = :payerId")
	 List<Transaction> findAllByPayerId(@Param("payerId") int payerId);

}
