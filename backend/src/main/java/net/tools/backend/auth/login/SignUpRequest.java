package net.tools.backend.auth.login;

import javax.validation.constraints.*;

import lombok.Data;

@Data
public class SignUpRequest {
	@NotBlank(message = "name problem")
	@Size(min = 4, max = 40)
	private String name;

	@NotBlank(message = "username problem")
	@Size(min = 3, max = 15)
	private String username;

	@NotBlank(message = "email problem")
	@Size(max = 40)
	@Email
	private String email;

	@NotBlank(message = "password problem")
	@Size(min = 6, max = 20)
	private String password;

}