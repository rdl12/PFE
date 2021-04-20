package com.PFE.Backend.Repository;

import org.springframework.data.jpa.repository.JpaRepository;


import com.PFE.Backend.entities.Subcription;

public interface SubscriptionRepository extends JpaRepository<Subcription,Long> {

}
