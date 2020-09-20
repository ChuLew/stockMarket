package com.example.stock.Model;

import javax.persistence.*;

import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "person")
public class Person {
	@Id
	@Column(name="idperson", insertable=true, updatable=true, unique=true, nullable=false)
	private String idperson;
	private Double holdings;
	public String getIdperson() {
		return idperson;
	}
	public void setIdperson(String idperson) {
		this.idperson = idperson;
	}
	public Double getHoldings() {
		return holdings;
	}
	public void setHoldings(Double holdings) {
		this.holdings = holdings;
	}
	
	

}