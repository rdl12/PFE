package com.PFE.Backend.entities;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "etat")
public class Etat {
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
	 @Column(name = "id", unique = true,nullable = false)
    private long id;
	@Column(name = "etat")
    private String etat;

}
