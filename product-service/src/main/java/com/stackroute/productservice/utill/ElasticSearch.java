package com.stackroute.productservice.utill;

import co.elastic.clients.elasticsearch._types.query_dsl.FuzzyQuery;
import co.elastic.clients.elasticsearch._types.query_dsl.Query;
import lombok.val;


import java.util.function.Supplier;

public class ElasticSearch {

    public static Supplier<Query> createSupplierQuery(String approximateProductName){
        Supplier<Query> supplier = ()->Query.of(q->q.fuzzy(createFuzzyQuery(approximateProductName)));
        return  supplier;
    }
    public static FuzzyQuery createFuzzyQuery(String approximateProductName){
        val fuzzyQuery  = new FuzzyQuery.Builder();
        return  fuzzyQuery.field("product_name").value(approximateProductName).build();

    }
    public static Supplier<Query> createSupplierQuery1(String category){
        Supplier<Query> supplier = ()->Query.of(q->q.fuzzy(createFuzzyQuery1(category)));
        return  supplier;
    }
    public static FuzzyQuery createFuzzyQuery1(String category){
        val fuzzyQuery  = new FuzzyQuery.Builder();
        return  fuzzyQuery.field("product_category").value(category).build();
    }
    public static Supplier<Query> createSupplierQuery2(String brand){
        Supplier<Query> supplier = ()->Query.of(q->q.fuzzy(createFuzzyQuery2(brand)));
        return  supplier;
    }
    public static FuzzyQuery createFuzzyQuery2(String brand){
        val fuzzyQuery  = new FuzzyQuery.Builder();
        return  fuzzyQuery.field("productBrand").value(brand).build();
    }

    public static Supplier<Query> createSupplierQuery3(String product_age){
        Supplier<Query> supplier = ()->Query.of(q->q.fuzzy(createFuzzyQuery3(product_age)));
        return  supplier;
    }
    public static FuzzyQuery createFuzzyQuery3(String product_age){
        val fuzzyQuery  = new FuzzyQuery.Builder();
        return  fuzzyQuery.field("product_age").value(product_age).build();
    }
}
