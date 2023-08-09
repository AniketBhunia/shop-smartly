package com.stackroute.productservice.service;

import com.stackroute.productservice.exception.ProductAlreadyExistException;
import com.stackroute.productservice.exception.ProductNotFoundException;
import com.stackroute.productservice.exception.SellerIdNotFoundException;
import com.stackroute.productservice.model.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;


public interface ProductService {
//    Product saveProduct(Product product);

//    String uploadImg(MultipartFile file) throws IOException;

    Product saveProduct(Product product, byte[] imageBytes) throws ProductAlreadyExistException;

    Product findProductById(int id) throws ProductNotFoundException;

    //    Product findProductBySellerId(int id) throws SellerIdNotFoundException;
    List<Product> getProductsBySellerId(String sellerId) throws SellerIdNotFoundException;

    Page<Product> getAll(Pageable pageable);

    List<Product> getLimitedProducts(int limit);
    void updateProduct(Product product, int product_id, byte[] imageBytes) throws ProductNotFoundException;

    void deleteProduct(int id) throws ProductNotFoundException;
}
