package net.tools.backend.entity.roles;
import org.hibernate.annotations.NaturalId;

import lombok.Data;

import javax.persistence.*;

@Entity
@Data
@Table(name = "roles")
public class Role {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NaturalId
    @Column(length = 60)
    @Enumerated(EnumType.STRING)
    private RoleName name;

    public Role() {

    }

    public Role(RoleName name) {
        this.name = name;
    }


}