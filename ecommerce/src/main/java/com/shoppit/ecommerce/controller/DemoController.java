package com.shoppit.ecommerce.controller;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/v1/demo")
public class DemoController {

    @PreAuthorize("hasRole('client_user')")
    @GetMapping
    public String hello() {
        return "Hello from Sb & Kk";
    }

    @PreAuthorize("hasRole('client_admin')")
    @GetMapping("/hello")
    public String hello2() {
        return "Namaste from Sb & Kk - Admin";
    }
}
