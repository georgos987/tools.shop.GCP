package net.tools.backend.dao;

import org.springframework.data.domain.Page;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestParam;
import net.tools.backend.security.CrossOriginConst;
import net.tools.backend.entity.Tool;


@CrossOrigin(CrossOriginConst.CROSS_ORIGIN)
@EnableWebSecurity
public interface ToolRepository extends JpaRepository<Tool, Integer> {	
	Page<Tool> findByCategoryId(@RequestParam("id") Integer id, Pageable pageable);
	Page<Tool> findByNameContaining(@RequestParam("name") String name, Pageable pageable);

}
