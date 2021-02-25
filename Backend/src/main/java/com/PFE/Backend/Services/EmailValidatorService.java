package com.PFE.Backend.Services;

import org.springframework.stereotype.Service;

import java.util.function.Predicate;

@Service
public class EmailValidatorService implements Predicate<String> {
	
	private final String EMAIL_PATTERN = "^[\\w-_\\.+]*[\\w-_\\.]\\@([\\w]+\\.)+[\\w]+[\\w]$";
	
	@Override
    public boolean test(String email) {
        return email.matches(EMAIL_PATTERN);
    }

}
