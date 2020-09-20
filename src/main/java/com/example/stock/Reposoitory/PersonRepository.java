package com.example.stock.Reposoitory;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.stock.Model.Person;

@Repository
public interface PersonRepository extends JpaRepository<Person,Long>{

}
