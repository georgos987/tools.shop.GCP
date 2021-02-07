package net.tools.backend;

import static org.junit.jupiter.api.Assertions.assertEquals;

import java.util.ArrayList;
import java.util.List;

import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.mockito.Mockito;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.TestPropertySource;
import org.springframework.test.context.junit4.SpringRunner;


import net.tools.backend.dao.CustomerRepository;
import net.tools.backend.dao.RoleRepository;
import net.tools.backend.dao.UserRepository;
import net.tools.backend.entity.Customer;
import net.tools.backend.entity.CustomerAddress;
import net.tools.backend.security.CustomUserDetailsService;
import net.tools.backend.security.JwtAuthenticationEntryPoint;
import net.tools.backend.security.JwtTokenProvider;
import net.tools.backend.security.SecurityConfig;
import net.tools.backend.security.UserPrincipal;


@RunWith(SpringRunner.class)
@WebMvcTest
@TestPropertySource(locations = "classpath:application.properties")
public class CustomerTest {

	@MockBean
	private Customer customer;
	
	@MockBean
	private CustomerRepository mockCustomerRepository;
	
	@MockBean
	private UserRepository userRepository;
	
	@MockBean
	private RoleRepository roleRepository;
	
	@MockBean
	private CustomUserDetailsService customUserDetailsService;
	
	@MockBean
    private JwtAuthenticationEntryPoint unauthorizedHandler;
	
	@MockBean
    private JwtTokenProvider tokenProvider;
	
	

	@Test
	public void findAllCustomer() throws Exception {
		
		Customer customer = new Customer("george", "makool", "geroge@gmail",
				new CustomerAddress("syria", "lattakis", "jomhoria", "000"));
		
		List<Customer> listCustomer = new ArrayList<Customer>();
		listCustomer.add(customer);
		Mockito.when(mockCustomerRepository.findAll()).thenReturn(listCustomer);
		assertEquals("george", customer.getFirstName());

	}
	
	@Test
	public void saveCustomer() throws Exception {
		
		Customer customer = new Customer("george", "makool", "geroge@gmail",
				new CustomerAddress("syria", "lattakis", "jomhoria", "000"));
		
		Mockito.when(mockCustomerRepository.save(customer)).thenReturn(customer);

		assertEquals("george", customer.getFirstName());

	}
}
