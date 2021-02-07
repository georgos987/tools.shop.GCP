package net.tools.backend.dao;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.web.bind.annotation.CrossOrigin;

import net.tools.backend.entity.roles.Role;
import net.tools.backend.entity.roles.RoleName;
import net.tools.backend.security.CrossOriginConst;

@CrossOrigin(CrossOriginConst.CROSS_ORIGIN)
@EnableWebSecurity
public interface RoleRepository extends JpaRepository<Role, Long> {
   Role findByName(RoleName roleName);
}