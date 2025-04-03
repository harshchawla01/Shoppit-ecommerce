package com.shoppit.ecommerce.controller;

import com.shoppit.ecommerce.entity.Cart;
import com.shoppit.ecommerce.entity.CartItem;
import com.shoppit.ecommerce.entity.Product;
import com.shoppit.ecommerce.entity.User;
import com.shoppit.ecommerce.exception.CartItemException;
import com.shoppit.ecommerce.exception.ProductException;
import com.shoppit.ecommerce.exception.UserException;
import com.shoppit.ecommerce.request.AddItemRequest;
import com.shoppit.ecommerce.response.ApiResponse;
import com.shoppit.ecommerce.service.CartItemService;
import com.shoppit.ecommerce.service.CartService;
import com.shoppit.ecommerce.service.ProductService;
import com.shoppit.ecommerce.service.UserService;
import jdk.jshell.spi.ExecutionControl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/api/cart")
public class CartController {
    @Autowired
    private CartService cartService;

    @Autowired
    private CartItemService cartItemService;

    @Autowired
    private ProductService productService;

    @Autowired
    private UserService userService;

    @GetMapping
    public ResponseEntity<Cart> findUserCartHandler(@RequestHeader("Authorization") String jwt) throws UserException {

        User user=userService.findUserByJwtToken(jwt);
        Cart cart=cartService.findUserCart(user);

//        System.out.println("cart - "+cart.getUser().getEmail());
        return new ResponseEntity<Cart>(cart, HttpStatus.OK);
    }

    @PutMapping("/add")
    public ResponseEntity<CartItem> addItemToCart(@RequestBody AddItemRequest req,
                                                  @RequestHeader("Authorization") String jwt) throws UserException, ProductException {

        User user=userService.findUserByJwtToken(jwt);
        Product product=productService.findProductById(req.getProductId());

        CartItem item = cartService.addCartItem(user,
                product,
                req.getSize(),
                req.getQuantity());

        ApiResponse res = new ApiResponse();
        res.setMessage("Item added to cart successfully");

        return new ResponseEntity<>(item,HttpStatus.ACCEPTED);

    }

    @DeleteMapping("/item/{cartItemId}")
    public ResponseEntity<ApiResponse>deleteCartItemHandler(
            @PathVariable Long cartItemId,
            @RequestHeader("Authorization")String jwt)
            throws CartItemException, UserException{

        User user = userService.findUserByJwtToken(jwt);
        cartItemService.removeCartItem(user.getId(), cartItemId);

        ApiResponse res = new ApiResponse();
        res.setMessage("Item removed from cart successfully");

        return new ResponseEntity<>(res, HttpStatus.ACCEPTED);
    }

    @PutMapping("/item/{cartItemId}")
    public ResponseEntity<CartItem>updateCartItemHandler(
            @PathVariable Long cartItemId,
            @RequestBody CartItem cartItem,
            @RequestHeader("Authorization")String jwt)
            throws CartItemException, UserException{

        User user = userService.findUserByJwtToken(jwt);

        CartItem updatedCartItem = null;
        if(cartItem.getQuantity()>0){
            updatedCartItem=cartItemService.updateCartItem(user.getId(),
                    cartItemId, cartItem);
        }

        return new ResponseEntity<>(updatedCartItem,HttpStatus.ACCEPTED);
    }

}
