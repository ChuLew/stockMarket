package com.example.stock.Model;

import javax.persistence.*;

import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "stock")
public class Security {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column
	private Long idstock;
	private String symbol;
	private Double purchaseprice;
	private String datepurchased;
	private int quantity;
	private Double currentprice;
	private Double opentoday;
	public Long getIdstock() {
		return idstock;
	}
	public void setIdstock(Long idstock) {
		this.idstock = idstock;
	}
	public String getSymbol() {
		return symbol;
	}
	public void setSymbol(String symbol) {
		this.symbol = symbol;
	}
	public Double getPurchaseprice() {
		return purchaseprice;
	}
	public void setPurchaseprice(Double purchaseprice) {
		this.purchaseprice = purchaseprice;
	}
	public String getDatepurchased() {
		return datepurchased;
	}
	public void setDatepurchased(String datepurchased) {
		this.datepurchased = datepurchased;
	}
	public int getQuantity() {
		return quantity;
	}
	public void setQuantity(int quantity) {
		this.quantity = quantity;
	}
	public Double getCurrentprice() {
		return currentprice;
	}
	public void setCurrentprice(Double currentprice) {
		this.currentprice = currentprice;
	}
	public Double getOpentoday() {
		return opentoday;
	}
	public void setOpentoday(Double opentoday) {
		this.opentoday = opentoday;
	}
	
}

