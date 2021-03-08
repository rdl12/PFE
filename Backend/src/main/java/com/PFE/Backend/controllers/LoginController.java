package com.PFE.Backend.controllers;


import java.util.ArrayList;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.PFE.Backend.Enum.AppUserRole;
import com.PFE.Backend.entities.AppUser;

import lombok.AllArgsConstructor;


@CrossOrigin(origins = "*")
@AllArgsConstructor
@RestController
public class LoginController {

	
	 @GetMapping("/success_login")
		public AppUser success() {
		    AppUser user =  new AppUser(
                   "name",
                   "lastname",
                    "email",
                   "password",
                    AppUserRole.USER

            );
		    
		      
			return user;
		}
}
