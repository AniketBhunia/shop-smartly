package com.stackroute.reviewservice.service;

import com.stackroute.reviewservice.exception.ProIdNotFoundException;
import com.stackroute.reviewservice.model.Review;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface ReviewService {
    void saveReview(Review review, byte[] imageBytes);
    List<Review> getLimitedReviews(int limit);
    Page<Review> getAll(Pageable pageable);
    List<Review> getReviewsByProductId(String productId);
}
