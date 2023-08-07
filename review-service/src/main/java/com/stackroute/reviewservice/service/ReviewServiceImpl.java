package com.stackroute.reviewservice.service;

import com.stackroute.reviewservice.exception.ProIdNotFoundException;
import com.stackroute.reviewservice.model.Review;
import com.stackroute.reviewservice.repository.ReviewRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.Stream;
import java.util.stream.StreamSupport;
@Service
public class ReviewServiceImpl implements ReviewService{
    private ReviewRepository reviewRepository;

    @Autowired
    public ReviewServiceImpl(ReviewRepository reviewRepository) {

        this.reviewRepository = reviewRepository;
    }

    @Override
    public void saveReview(Review review, byte[] imageBytes) {
        review.setProduct_image(imageBytes);

        reviewRepository.save(review);
    }
    @Override
    public List<Review> getLimitedReviews(int limit) {
        Iterable<Review> allReviews = reviewRepository.findAll();
        Stream<Review> productStream = StreamSupport.stream(allReviews.spliterator(), false);

        return productStream
                .limit(limit)
                .collect(Collectors.toList());
    }
    @Override
    public Page<Review> getAll(Pageable pageable) {
        return reviewRepository.findAll(pageable);
    }


    @Override
    public List<Review> getReviewsByProductId(String product_id) {
        List<Review> reviews = reviewRepository.findByProduct_id(product_id);
//        if (reviews.isEmpty()) {
//            throw new ProIdNotFoundException();
//        }
        return reviews;
    }


}
