package net.tools.backend.dao;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.web.bind.annotation.CrossOrigin;

import net.tools.backend.entity.CustomerAddress;
import net.tools.backend.security.CrossOriginConst;

@CrossOrigin(CrossOriginConst.CROSS_ORIGIN)
@EnableWebSecurity
public interface AddressRepository extends JpaRepository<CustomerAddress, Integer> {
	
}
