package net.tools.backend.entity;

import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import lombok.Data;

@Entity
@Table(name="tool_category")
@Data
public class ToolCategory {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="id")
	private int id;
	
	@Column(name="category_name")
	private String categoryName;
	

	@OneToMany(targetEntity=Tool.class ,cascade = CascadeType.ALL, mappedBy = "category")
	private List<Tool> tools;
}
