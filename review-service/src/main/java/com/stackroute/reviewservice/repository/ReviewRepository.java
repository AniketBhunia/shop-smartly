package com.stackroute.reviewservice.repository;

import com.stackroute.reviewservice.model.Review;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
@Repository
public interface ReviewRepository extends MongoRepository<Review, Integer> {
      List<Review> findByProductId(int productId);
}
