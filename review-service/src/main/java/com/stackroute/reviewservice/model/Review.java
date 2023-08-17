package com.stackroute.reviewservice.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import lombok.Builder;
import lombok.Generated;
import lombok.NoArgsConstructor;
import org.sonatype.guice.plexus.config.Strategies;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;
import java.util.Arrays;

@NoArgsConstructor
@Document(collection = "reviews")
@Builder
public class Review {
    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private int review_id;
    private int productId;
    private String user_id;
    private LocalDateTime posted_date;
    private String user_name;
    private String product_review_rating;
    private byte[] product_image;
    private String product_review_description;

    public Review(int review_id, int productId, String user_id, LocalDateTime posted_date, String user_name, String product_review_rating,
                  byte[] product_image, String product_review_description) {
        this.review_id = review_id;
        this.productId = productId;
        this.user_id = user_id;
        this.posted_date = posted_date;
        this.user_name = user_name;
        this.product_review_rating = product_review_rating;
        this.product_image = product_image;
        this.product_review_description = product_review_description;
    }

    @Override
    public String toString() {
        return "Review{" +
                "review_id=" + review_id +
                ", productId=" + productId +
                ", user_id=" + user_id +
                ", posted_date=" + posted_date +
                ", user_name='" + user_name + '\'' +
                ", product_review_rating=" + product_review_rating +
                ", product_image=" + Arrays.toString(product_image) +
                ", product_review_description='" + product_review_description + '\'' +
                '}';
    }

    public int getReview_id() {
        return review_id;
    }

    public void setReview_id(int review_id) {
        this.review_id = review_id;
    }

    public int getProductId() {
        return productId;
    }

    public void setProductId(int productId) {
        this.productId = productId;
    }

    public String getUser_id() {
        return user_id;
    }

    public void setUser_id(String user_id) {
        this.user_id = user_id;
    }

    public LocalDateTime getPosted_date() {
        return posted_date;
    }

    public void setPosted_date(LocalDateTime posted_date) {
        this.posted_date = LocalDateTime.now();
    }

    public String getUser_name() {
        return user_name;
    }

    public void setUser_name(String user_name) {
        this.user_name = user_name;
    }

    public String getProduct_review_rating() {
        return product_review_rating;
    }

    public void setProduct_review_rating(String product_review_rating) {
        this.product_review_rating = product_review_rating;
    }

    public byte[] getProduct_image() {
        return product_image;
    }

    public void setProduct_image(byte[] product_image) {
        this.product_image = product_image;
    }

    public String getProduct_review_description() {
        return product_review_description;
    }

    public void setProduct_review_description(String product_review_description) {
        this.product_review_description = product_review_description;
    }
}
