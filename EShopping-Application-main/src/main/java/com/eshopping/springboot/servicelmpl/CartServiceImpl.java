package com.eshopping.springboot.servicelmpl;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.eshopping.springboot.exception.ResourceNotFoundException;
import com.eshopping.springboot.model.Cart;
import com.eshopping.springboot.model.Customer;
import com.eshopping.springboot.model.Product;
import com.eshopping.springboot.repository.CartRepository;
import com.eshopping.springboot.repository.ProductRepository;
import com.eshopping.springboot.service.CartService;
import com.eshopping.springboot.service.CustomerService;
import com.eshopping.springboot.service.ProductService;

@Service
public class CartServiceImpl implements CartService {
	
	@Autowired
	public CartRepository cartRepository;
	
//	@Autowired
//	public ProductRepository productRepository;

	@Autowired
	public ProductService productService;
	
	@Autowired
	public CustomerService customerService;
	
public CartServiceImpl(CartRepository cartRepository) {
		super();
		this.cartRepository = cartRepository;
	}

@Override
public Cart addCart(Cart cart,long productId,long customerId) {

	Product product =productService.getProductByProductId(productId) ;
	Customer customer =customerService.getCustomerById(customerId) ;
	   product.setQuantity(product.getQuantity()-cart.getQuantity());
	 //productService.updateProduct( productId,product.getQuantity()-1);
	cart.setProduct(product);
	cart.setMrpPrice(product.getMrpPrice());
	cart.setCustomer(customer);
	  System.out.println("product"+product);
	  System.out.println("customer"+customer);
	  System.out.println("cart"+cart);
	  
		    	
	return cartRepository.save(cart);
}



@Override
public List<Cart> getAllCarts() {
	return cartRepository.findAll();
}



@Override
public Cart getCartById(long cartId) {
	
	return cartRepository.findById(cartId).orElseThrow(()->new ResourceNotFoundException("Cart","Id",cartId));
}



@Override
public Cart updateCart(Cart cart, long cartId) {
	Cart existingCart=cartRepository.findById(cartId).orElseThrow(()->new ResourceNotFoundException("Cart","Id",cartId));
	existingCart.setQuantity(cart.getQuantity());
	//existingCart.setPrice(cart.getPrice());
	existingCart.setMrpPrice(cart.getMrpPrice());
	//existingCart.setImage(cart.getImage());
	existingCart.setCartId(cart.getCartId());
	existingCart.setProduct(cart.getProduct());
	//existingCart.setCustomerId(cart.getCustomerId());
	existingCart.setCustomer(cart.getCustomer());
    cartRepository.save(existingCart);
    
	return existingCart;
}



@Override
public void deleteCart(long cartId) {
	cartRepository.findById(cartId).orElseThrow(()->new ResourceNotFoundException("Cart","Id",cartId));
	cartRepository.deleteById(cartId);
	
}

@Override
public void deleteCartByCustomer(Customer c) {
	cartRepository.deleteCartByCustomer(c);
	
}

}