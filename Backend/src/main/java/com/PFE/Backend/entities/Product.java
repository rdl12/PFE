package com.PFE.Backend.entities;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@EqualsAndHashCode
@NoArgsConstructor
@Entity
public class Product {
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
	 @Column(name = "id", unique = true,nullable = false)
    private long id;
	@Column(name = "nom")
    private String nom;
	@Column(name = "image")
    private String image;
	@Column(name = "desription")
    private String desription;
}
