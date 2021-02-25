package com.PFE.Backend.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.PFE.Backend.entities.Province;

public interface ProvinceRepository extends JpaRepository<Province, Long> {

	public Province findById(long id);
}
