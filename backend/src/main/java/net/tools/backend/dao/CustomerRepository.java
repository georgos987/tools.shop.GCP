package net.tools.backend.dao;


import org.springframework.data.jpa.repository.JpaRepository;

import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.web.bind.annotation.CrossOrigin;

import net.tools.backend.security.CrossOriginConst;



import net.tools.backend.entity.Customer;

@CrossOrigin(CrossOriginConst.CROSS_ORIGIN)
@EnableWebSecurity
public interface CustomerRepository extends JpaRepository<Customer, Integer> {
	

}
