package com.stackroute.reviewservice.controller;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.stackroute.reviewservice.exception.ProIdNotFoundException;
import com.stackroute.reviewservice.exception.ReviewNotFoundException;
import com.stackroute.reviewservice.model.Review;
import com.stackroute.reviewservice.service.ReviewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
@RestController
@RequestMapping("/api/v1")
public class ReviewController {
    private ResponseEntity responseEntity;
    private ReviewService reviewService;
    private final ObjectMapper objectMapper;
    @Autowired
    public ReviewController(final ReviewService reviewService, ObjectMapper objectMapper){

        this.reviewService = reviewService;
        this.objectMapper = objectMapper;
    }
    @PostMapping("/add_review")
    public ResponseEntity<String> saveReview(@RequestParam("productReview") String productData,
                                             @RequestParam("image") MultipartFile productImage){
        try {
            Map<String, Object> productMap = objectMapper.readValue(productData, new TypeReference<Map<String, Object>>() {});

            // Extract values from the Map
            int review_id=(int) productMap.get("review_id");
            int user_id = (int) productMap.get("user_id");
            int product_id=(int) productMap.get("product_id");
            LocalDateTime posted_date=(LocalDateTime)productMap.get("posted_date");
            String user_name=(String) productMap.get("user_name");
            int product_review_rating=(int) productMap.get("product_review_rating");
            String product_review_description=(String) productMap.get("product_review_description");

            Review product_rev = new Review();
            product_rev.setReview_id(review_id);
            product_rev.setUser_id(user_id);
            product_rev.setProduct_id(product_id);
            product_rev.setPosted_date(posted_date);
            product_rev.setUser_name(user_name);
            product_rev.setProduct_review_rating(product_review_rating);
            product_rev.setProduct_review_description(product_review_description);


            byte[] imageBytes = productImage.getBytes();

            reviewService.saveReview(product_rev,imageBytes);
            return ResponseEntity.ok("Review saved successfully.");
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error saving review: " + e.getMessage());
        }
    }
    @GetMapping("/all_reviews")
    public ResponseEntity<List<Review>> getAllReviews(@PageableDefault(size = 10) Pageable pageable) {
        try {
            responseEntity = new ResponseEntity(reviewService.getAll(pageable), HttpStatus.OK);
        } catch (Exception exception) {
            responseEntity = new ResponseEntity(exception.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return responseEntity;
    }
    @GetMapping
    public List<Review> getLimitedReviews(@RequestParam(defaultValue = "10") int limit) {
        return reviewService.getLimitedReviews(limit);
    }

    @GetMapping("/getReview/{productId}")
    public ResponseEntity<List<Review>> getReviewsByProductId(@PathVariable String productId) throws  ProIdNotFoundException{

        try {
            List<Review> reviews = reviewService.getReviewsByProductId(productId);
            return new ResponseEntity<>(reviews, HttpStatus.OK);
        } catch (ProIdNotFoundException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

    }
    @PutMapping("/update_review/{review_id}")
    public ResponseEntity<String> updateReview(@PathVariable int review_id, @RequestParam("productReview") String productData,@RequestParam("image") MultipartFile productImage) {

        try {
            Map<String, Object> productMap = objectMapper.readValue(productData, new TypeReference<Map<String, Object>>() {
            });
            int review_id1=(int) productMap.get("review_id");
            int user_id = (int) productMap.get("user_id");
            int product_id=(int) productMap.get("product_id");
            LocalDateTime posted_date=(LocalDateTime)productMap.get("posted_date");
            String user_name=(String) productMap.get("user_name");
            int product_review_rating=(int) productMap.get("product_review_rating");
            String product_review_description=(String) productMap.get("product_review_description");

            Review product_rev = new Review();
            product_rev.setReview_id(review_id1);
            product_rev.setUser_id(user_id);
            product_rev.setProduct_id(product_id);
            product_rev.setPosted_date(posted_date);
            product_rev.setUser_name(user_name);
            product_rev.setProduct_review_rating(product_review_rating);
            product_rev.setProduct_review_description(product_review_description);


            byte[] imageBytes = productImage.getBytes();
            reviewService.updateReview(product_rev, review_id,imageBytes);

            return ResponseEntity.ok("Product updated successfully");
        } catch (ReviewNotFoundException | IOException e) {
            return ResponseEntity.notFound().build();
        }
    }

}
