package com.stackroute.productservice.model;


import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.elasticsearch.annotations.Document;


@NoArgsConstructor
@AllArgsConstructor
@Data
@Document(indexName = "products")
@JsonIgnoreProperties("_class")
@Builder
public class Product {
    @Id
    private int product_id;
    private String product_name;
    private int product_quantity;
    private String product_status;
    private String product_description;
    private String productBrand;
    private String product_category;
    private double product_current_price;
    private double product_discount_price;
    private byte[] product_image;
    //    @Autowired
    private int seller_id;

}



//    private String productBrand;