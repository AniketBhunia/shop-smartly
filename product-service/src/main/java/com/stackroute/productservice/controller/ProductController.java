package com.stackroute.productservice.controller;

import co.elastic.clients.elasticsearch.core.SearchResponse;
import co.elastic.clients.elasticsearch.core.search.Hit;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.stackroute.productservice.exception.ProductAlreadyExistException;
import com.stackroute.productservice.exception.ProductNotFoundException;
import com.stackroute.productservice.exception.SellerIdNotFoundException;
import com.stackroute.productservice.model.Product;
import com.stackroute.productservice.service.ElasticSearchService;
import com.stackroute.productservice.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/product")
@CrossOrigin(origins = "http://localhost:4200")
public class ProductController {
    private final ProductService productService;
    private final ObjectMapper objectMapper;
    private final ElasticSearchService elasticSearchService;
    private ResponseEntity responseEntity;

    @Autowired
    public ProductController(ProductService productService, ObjectMapper objectMapper, ElasticSearchService elasticSearchService) {
        this.productService = productService;
        this.objectMapper = objectMapper;
        this.elasticSearchService = elasticSearchService;
    }

    @PostMapping("/add_product")
    public ResponseEntity<?> saveProduct(@RequestParam("product") String productData,
                                         @RequestParam("image") MultipartFile productImage) {
        try {
            Map<String, Object> productMap = objectMapper.readValue(productData, new TypeReference<Map<String, Object>>() {
            });

            // Extract values from the Map
            int product_id = (int) productMap.get("product_id");
            String product_name = (String) productMap.get("product_name");
            int product_quantity = (int) productMap.get("product_quantity");
            String product_status = (String) productMap.get("product_status");
            String product_description = (String) productMap.get("product_description");
            String productBrand = (String) productMap.get("productBrand");
            String product_category = (String) productMap.get("product_category");
            double product_current_price = (double) productMap.get("product_current_price");
            double product_discount_price = (double) productMap.get("product_discount_price");
            int seller_id = (int) productMap.get("seller_id");


            Product product = new Product();
            product.setProduct_id(product_id);
            product.setProduct_name(product_name);
            product.setProduct_quantity(product_quantity);
            product.setProduct_status(product_status);
            product.setProduct_description(product_description);
            product.setProductBrand(productBrand);
            product.setProduct_category(product_category);
            product.setProduct_current_price(product_current_price);
            product.setProduct_discount_price(product_discount_price);
            product.setSeller_id(seller_id);

            byte[] imageBytes = productImage.getBytes();

            productService.saveProduct(product, imageBytes);
            return ResponseEntity.ok().body(product);
        } catch (IOException | ProductAlreadyExistException e) {
            return ResponseEntity.status(HttpStatus.CONFLICT)
                    .body("Product with specified id is already Exist");
        }
    }

    @GetMapping("/all_products")
    public ResponseEntity<List<Product>> getAllProducts(@PageableDefault(size = 12) Pageable pageable) {
        try {
            responseEntity = new ResponseEntity(productService.getAll(pageable), HttpStatus.OK);
        } catch (Exception exception) {
            responseEntity = new ResponseEntity(exception.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return responseEntity;
    }

    @GetMapping
    public List<Product> getLimitedProducts(@RequestParam(defaultValue = "10") int limit) {
        return productService.getLimitedProducts(limit);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getProducts(@PathVariable int id) {
        try {
            Product product = productService.findProductById(id);
            return new ResponseEntity<>(product, HttpStatus.OK);
        } catch (ProductNotFoundException e) {
            return new ResponseEntity<>("Product not found", HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/seller/{sellerId}")
    public ResponseEntity<List<Product>> getProductsBySellerId(@PathVariable String sellerId) throws SellerIdNotFoundException {
//        List<Product> products = productService.getProductsBySellerId(sellerId);

        try {
            List<Product> products = productService.getProductsBySellerId(sellerId);
            return new ResponseEntity<>(products, HttpStatus.OK);
        } catch (SellerIdNotFoundException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/delete_product/{id}")
    public ResponseEntity<?> deleteProduct(@PathVariable int id) {
        try {
            productService.deleteProduct(id);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (ProductNotFoundException e) {
            return new ResponseEntity<>("Product not found", HttpStatus.NOT_FOUND);
        }
    }

    @PutMapping("/update_product/{product_id}")
    public ResponseEntity<String> updateProduct(@PathVariable int product_id, @RequestParam String productData, @RequestParam("image") MultipartFile productImage) {
//            product.setId(id); // Make sure the ID in the path matches the ID in the product object
        try {
            Map<String, Object> productMap = objectMapper.readValue(productData, new TypeReference<Map<String, Object>>() {
            });

            // Extract values from the Map
            int product_id1 = (int) productMap.get("product_id");
            String product_name = (String) productMap.get("product_name");
            int product_quantity = (int) productMap.get("product_quantity");
            String product_status = (String) productMap.get("product_status");
            String product_description = (String) productMap.get("product_description");
            String productBrand = (String) productMap.get("productBrand");
            String product_category = (String) productMap.get("product_category");
            double product_current_price = (double) productMap.get("product_current_price");
            double product_discount_price = (double) productMap.get("product_discount_price");
            int seller_id = (int) productMap.get("seller_id");


            Product product = new Product();
            product.setProduct_id(product_id1);
            product.setProduct_name(product_name);
            product.setProduct_quantity(product_quantity);
            product.setProduct_status(product_status);
            product.setProduct_description(product_description);
            product.setProductBrand(productBrand);
            product.setProduct_category(product_category);
            product.setProduct_current_price(product_current_price);
            product.setProduct_discount_price(product_discount_price);
            product.setSeller_id(seller_id);

            byte[] imageBytes = productImage.getBytes();

            productService.updateProduct(product, product_id, imageBytes);

            return ResponseEntity.ok("Product updated successfully");
        } catch (ProductNotFoundException | IOException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/search/{approximateProductName}")
    List<Product> fuzzySearch( @PathVariable String approximateProductName ) throws IOException {
        SearchResponse<Product> searchResponse = elasticSearchService.fuzzySearch(approximateProductName);
        List<Hit<Product>> hitList = searchResponse.hits().hits();
        System.out.println(hitList);
        List<Product> productList = new ArrayList<>();
        for(Hit<Product> hit :hitList){
            productList.add(hit.source());
        }
        return productList;
    }
}
