package com.stackroute.productservice.repository;

import com.stackroute.productservice.model.Product;
import org.springframework.data.elasticsearch.annotations.Query;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepository extends ElasticsearchRepository<Product ,Integer> {
    @Query("{\"bool\": {\"must\": [{\"match\": {\"seller_id\": \"?0\"}}]}}")
    List<Product> findBySeller_id(String seller_id);
}
