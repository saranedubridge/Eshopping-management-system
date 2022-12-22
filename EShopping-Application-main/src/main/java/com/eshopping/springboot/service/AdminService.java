package com.eshopping.springboot.service;

import java.util.List;

import com.eshopping.springboot.model.Admin;
import com.eshopping.springboot.model.Customer;
import com.eshopping.springboot.model.Product;

public interface AdminService {
	Admin saveAdmin(Admin admin);
	Admin loginAdmin(Admin admin);
	
	public List<Product> getAllProducts(long adminId);
	public List<Customer> getAllCustomers(long adminId);
}