package com.stackroute.sellerservice.repository;


import com.stackroute.sellerservice.model.Seller;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface SellerRepository extends MongoRepository<Seller,Integer> {


    Optional<Seller> findBySellerEmail(String email);
}
