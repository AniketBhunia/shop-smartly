package com.stackroute.reviewservice.repository;

import com.stackroute.reviewservice.model.Review;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
@Repository
public interface ReviewRepository extends MongoRepository<Review, Integer> {
    @Query("{\"bool\": {\"must\": [{\"match\": {\"product_id\": \"?0\"}}]}}")
      List<Review> findByProduct_id(String product_id);

}
