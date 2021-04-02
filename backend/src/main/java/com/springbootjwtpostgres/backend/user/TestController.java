package com.springbootjwtpostgres.backend.user;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/test")
public class TestController {
	@GetMapping("/all")
	public String allAccess() {
		return "Public Content.";
	}

	@GetMapping("/nurse")
	@PreAuthorize("hasRole('NURSE') or hasRole('DOCTOR') or hasRole('MANAGER')")
	public String userAccess() {
		return "Nurse Content.";
	}

	@GetMapping("/doctor")
	@PreAuthorize("hasRole('DOCTOR')")
	public String doctorAccess() {
		return "Doctor Board.";
	}

	@GetMapping("/manager")
	@PreAuthorize("hasRole('MANAGER')")
	public String managerAccess() {
		return "Manager Board.";
	}
}
