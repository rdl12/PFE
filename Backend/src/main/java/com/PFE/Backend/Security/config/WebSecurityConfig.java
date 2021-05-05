package com.PFE.Backend.Security.config;

import lombok.AllArgsConstructor;

import java.util.Arrays;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import com.PFE.Backend.Services.AppUserService;


@Configuration
@AllArgsConstructor
@EnableWebSecurity
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {
	
	 private final AppUserService appUserService;
	    private final BCryptPasswordEncoder bCryptPasswordEncoder = new BCryptPasswordEncoder();
	    @Override
	    public void configure(WebSecurity web) throws Exception {
	        web.ignoring().antMatchers("/success_login");
	    }
	    @Override
	    protected void configure(HttpSecurity http) throws Exception {
	        http    
	        .cors().and()
            .csrf().disable()
            .formLogin()
            .defaultSuccessUrl("/success_login",true).and()
            .authorizeRequests()
            .antMatchers("/api/v*/registration/**","/Defibrillateur/**","/Boundary/**","/Formation/**","/Subscription/**","/Categorie/**")
            .permitAll()
            .anyRequest()
            .authenticated().and();
	                
	                
	    }
	    @Bean
		CorsConfigurationSource corsConfigurationSource() {
			CorsConfiguration configuration = new CorsConfiguration();
			configuration.setAllowedOrigins(Arrays.asList("*"));
			configuration.setAllowedMethods(Arrays.asList("GET","POST","PATCH"));
			configuration.setAllowedHeaders(Arrays.asList("*"));
			UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
			source.registerCorsConfiguration("/**", configuration);
			return source;
		}

	    @Override
	    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
	        auth.authenticationProvider(daoAuthenticationProvider());
	    }

	    @Bean
	    public DaoAuthenticationProvider daoAuthenticationProvider() {
	        DaoAuthenticationProvider provider =
	                new DaoAuthenticationProvider();
	        provider.setPasswordEncoder(bCryptPasswordEncoder);
	        provider.setUserDetailsService(appUserService);
	        return provider;
	    }

}
