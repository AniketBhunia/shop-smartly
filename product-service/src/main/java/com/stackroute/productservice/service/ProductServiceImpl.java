package com.stackroute.productservice.service;

import com.stackroute.productservice.exception.ProductAlreadyExistException;
import com.stackroute.productservice.exception.ProductNotFoundException;
import com.stackroute.productservice.exception.SellerIdNotFoundException;
import com.stackroute.productservice.model.Product;
import com.stackroute.productservice.repository.ProductRepository;
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
public class ProductServiceImpl implements ProductService {

    private final ProductRepository productRepository;

    @Autowired
    public ProductServiceImpl(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    @Override
    public Product saveProduct(Product product, byte[] imageBytes) throws ProductAlreadyExistException {
        int already_exist_id = product.getProduct_id();
        Optional<Product> product1 = productRepository.findById(already_exist_id);
        System.out.println(product1);
        if(product1.isEmpty()){
            product.setProduct_image(imageBytes);
            return productRepository.save(product);
        }else {
            throw new ProductAlreadyExistException();
        }
    }

    @Override
    public Product findProductById(int id) throws ProductNotFoundException {
        Optional<Product> product = productRepository.findById(id);
        return product.orElseThrow(ProductNotFoundException::new);
    }
    public List<Product> getProductsBySellerId(String seller_id) throws SellerIdNotFoundException {
        List<Product> products = productRepository.findBySeller_id(seller_id);
//        System.out.println(products);
        if (products.isEmpty()) {
            throw new SellerIdNotFoundException();
        }
        return products;
    }


    @Override
    public Page<Product> getAll(Pageable pageable) {
        return productRepository.findAll(pageable);
    }

    public List<Product> getLimitedProducts(int limit) {
        Iterable<Product> allProducts = productRepository.findAll();
        Stream<Product> productStream = StreamSupport.stream(allProducts.spliterator(), false);

        return productStream
                .limit(limit)
                .collect(Collectors.toList());
    }

    @Override
    public void updateProduct(Product product,int product_id,byte[] imageBytes) throws ProductNotFoundException {
        Optional<Product> newProduct = productRepository.findById(product_id);
        if (newProduct.isEmpty()) {
            throw new ProductNotFoundException();
        }
        product.setProduct_image(imageBytes);
        productRepository.save(product);
    }

    @Override
    public void deleteProduct(int id) throws ProductNotFoundException {
        if (productRepository.findById(id).isEmpty()) {
            throw new ProductNotFoundException();
        } else {
            productRepository.deleteById(id);
        }
    }
}
