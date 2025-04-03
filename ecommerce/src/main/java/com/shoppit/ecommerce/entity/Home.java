package com.shoppit.ecommerce.entity;

import lombok.Data;

import java.util.List;

@Data
public class Home { // Not an entity
    private List<HomeCategory> grid;
    private List<HomeCategory> shopByCategories;
    private List<HomeCategory> electricCategories;
    private List<HomeCategory> dealCategories;
//    private List<Deal> deals;
}
