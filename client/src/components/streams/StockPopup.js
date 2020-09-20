import React, { Component } from "react";
import Form from "./StockForm";
import "react-datepicker/dist/react-datepicker.css";

function createData(symbol, datePurchased, purchasePrice, qty, ) {
  return { symbol, datePurchased, purchasePrice, qty };
}

class StockPopup extends Component {
  state = {
    fields: {},
    buyDate: new Date(),
    buyDateString:"",
    sellDate: new Date(),
  };

  onChange = updatedValue => {
    //passes this up to form as props
    this.setState({
      fields: {
        ...this.state.fields, //takes fields creates new object
        ...updatedValue //sets new object of updated valuues
      }
    });
  };



  render() {
    return (
      <div className="App">
        <Form onChange={fields => this.onChange(fields)} />
        <p>{JSON.stringify(this.state, null, 3)}</p>

      </div>
    );
  }
}


export default StockPopup;

//where this to redux and submit form to database;
