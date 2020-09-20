package com.example.stock.Reposoitory;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.stock.Model.Stream;

@Repository
public interface StreamRepository extends JpaRepository<Stream,Long>{

}
