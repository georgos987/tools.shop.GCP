package net.tools.backend.config;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

import javax.persistence.EntityManager;
import javax.persistence.metamodel.EntityType;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.env.Environment;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurer;
import org.springframework.http.HttpMethod;

import net.tools.backend.entity.Tool;
import net.tools.backend.entity.ToolCategory;




@Configuration
public class RestConfig implements RepositoryRestConfigurer {
	
	@Autowired
	private EntityManager entityManager;

	@Override
	public void configureRepositoryRestConfiguration(RepositoryRestConfiguration config) {

		HttpMethod[] theUnsupportedAction = { HttpMethod.PUT, HttpMethod.POST, HttpMethod.DELETE };

		// disable HTTP method for Product: PUT, POST, DELETE

		disableHttpMethods(Tool.class,config, theUnsupportedAction);

		// disable HTTP method for ProductCategory: PUT, POST, DELETE
		disableHttpMethods(ToolCategory.class,config, theUnsupportedAction);
		
		

		// call an internal helper method
		exposeIds(config);
	}

	private void disableHttpMethods(Class theClass,RepositoryRestConfiguration config, HttpMethod[] theUnsupportedAction) {
		config.getExposureConfiguration().forDomainType(theClass)
				.withItemExposure((metadata, httpMethods) -> httpMethods.disable(theUnsupportedAction))
				.withCollectionExposure((metadata, httpMethods) -> httpMethods.disable(theUnsupportedAction));
	}

	private void exposeIds(RepositoryRestConfiguration config) {

		// expose entity ids


		// get a list of all entity classes from the entity manager
		Set<EntityType<?>> entities = entityManager.getMetamodel().getEntities();
		

		// create an array of the entity types
		List<Class> entityCalsses = new ArrayList<>();

		// get the entity types for the entities
		for (EntityType tempEntityType : entities) {
			entityCalsses.add(tempEntityType.getJavaType());
		}
	
		// - expose the entity ids for the array of entity/domain types
		Class[] domainTypes = entityCalsses.toArray(new Class[0]);
		config.exposeIdsFor(domainTypes);		
	}
	
	@Autowired
	private Environment environment;

	public void  getPassword() {
		
		environment.getProperty("spring.datasource.password");

	}
	

}
