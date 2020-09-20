package com.example.stock.Reposoitory;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.stock.Model.Security;

@Repository
public interface SecurityRepository extends JpaRepository<Security,Long>{

}
