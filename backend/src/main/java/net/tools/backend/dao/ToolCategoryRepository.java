package net.tools.backend.dao;



import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.web.bind.annotation.CrossOrigin;

import net.tools.backend.entity.ToolCategory;
import net.tools.backend.security.CrossOriginConst;

@RepositoryRestResource(path="tool-category")
@CrossOrigin(CrossOriginConst.CROSS_ORIGIN)
@EnableWebSecurity
public interface ToolCategoryRepository extends JpaRepository<ToolCategory, Integer>{

}
