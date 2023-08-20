package com.stackroute.productservice.service;

import co.elastic.clients.elasticsearch.ElasticsearchClient;
import co.elastic.clients.elasticsearch._types.query_dsl.Query;
import co.elastic.clients.elasticsearch.core.SearchResponse;
import com.stackroute.productservice.model.Product;
import com.stackroute.productservice.utill.ElasticSearch;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.function.Supplier;

@Service
public class ElasticSearchService {
    @Autowired
    private ElasticsearchClient elasticsearchClient;

    public SearchResponse<Product> fuzzySearch(String approximateProductName) throws IOException {
        Supplier<Query> supplier = ElasticSearch.createSupplierQuery(approximateProductName);
        SearchResponse<Product> response = elasticsearchClient
                .search(s -> s.index("products").query(supplier.get()), Product.class);
//        System.out.println("elasticsearch supplier fuzzy query " + supplier.get().toString());
        return response;
    }
    public SearchResponse<Product> fuzzySearch1(String category) throws IOException {
        Supplier<Query> supplier = ElasticSearch.createSupplierQuery1(category);
        SearchResponse<Product> response = elasticsearchClient
                .search(s -> s.index("products").query(supplier.get()), Product.class);
//        System.out.println("elasticsearch supplier fuzzy query " + supplier.get().toString());
        return response;
    }
    public SearchResponse<Product> fuzzySearch2(String brand) throws IOException {
        Supplier<Query> supplier = ElasticSearch.createSupplierQuery2(brand);
        SearchResponse<Product> response = elasticsearchClient
                .search(s -> s.index("products").query(supplier.get()), Product.class);
//        System.out.println("elasticsearch supplier fuzzy query " + supplier.get().toString());
        return response;
    }

    public SearchResponse<Product> fuzzySearch3(String product_age) throws IOException {
        Supplier<Query> supplier = ElasticSearch.createSupplierQuery3(product_age);
        SearchResponse<Product> response = elasticsearchClient
                .search(s -> s.index("products").query(supplier.get()), Product.class);
//        System.out.println("elasticsearch supplier fuzzy query " + supplier.get().toString());
        return response;
    }
}
