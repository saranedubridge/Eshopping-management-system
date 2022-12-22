package com.eshopping.springboot.service;

import java.util.List;

import com.eshopping.springboot.model.Cart;
import com.eshopping.springboot.model.Customer;
import com.eshopping.springboot.model.Product;



public interface CartService {

	Cart addCart(Cart cart,long productId,long customerId);
	List<Cart> getAllCarts();
	Cart getCartById(long cartId);
	Cart updateCart(Cart cart, long cartId);
	void deleteCart(long cartId);
	void deleteCartByCustomer(Customer c);
	
	

}