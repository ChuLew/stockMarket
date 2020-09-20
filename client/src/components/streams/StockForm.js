import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { connect } from "react-redux";
import { saveTransaction } from "../../actions";

class StockForm extends React.Component {
  state = {
    symbol: "",
    quantity: "",
    buyDateString: "2020-09-17",
    price: 0,
    todayPrice: 0,
    open:0
  };
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
  }
  change = (e) => {
    //recieves on change as props
    this.props.onChange({ [e.target.name]: e.target.value });
    this.setState({
      [e.target.name]: e.target.value,
    });
    //console.log(e.target.name);
  };
  // resets data but i want additional functionality
  // here i want to take state data and put it into object
  //pass that object into action creator and dispatch it to database
  //then i want to pull the data from database and dispaly it on Orders
  //refer to action creator of steram create it creates and objects and posts it to the api
  createData(symbol, datePurchased, purchasePrice, qty, todayPrice, todayOpenPrice) {
    return {
      symbol: symbol.toUpperCase(),
      datepurchased: datePurchased,
      purchaseprice: purchasePrice,
      quantity: qty,
      currentprice: todayPrice,
      opentoday:todayOpenPrice
    };
  }
  onSubmit = (e) => {
    console.log("buy date string" + this.state.buyDateString)
    const API_KEY = "WUOT41WJEJHDWT6T";
    let StockSymbol = this.state.symbol.toUpperCase();
    let date = this.state.buyDateString;
    //date breaks on weekends
    let API_Call = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${StockSymbol}&outputsize=compact&apikey=${API_KEY}`;
    console.log(this.state.quantity);
    let qty = this.state.quantity;
    fetch(API_Call)
      .then(function (response) {
        return response.json();
      })
      .then(
        function (data) {
          console.log(data);
          if ("Note" in data) {
            alert(data.Note);
          } else if ("Error Message" in data) {
            alert(
              "No Ticker exists for your input String Please input valid Ticker Symbol"
            );
          } else {
            console.log(date);
            var priceResponse = data["Time Series (Daily)"][date]["4. close"];
            var today = new Date();
            //this code breaks as they dont trade on the weekends
            //so if its sunday or monday  you cant take day before
            var subtractday = 1;
            if(today.getDay()==0){
              subtractday = 2;
            }
            else if (today.getDay()==1){
              subtractday = 3;
            }
            var dd = String(today.getDate() - subtractday).padStart(2, "0");
            var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
            var yyyy = today.getFullYear();
            today = yyyy + "-" + mm + "-" + dd;
            console.log(today)
            var todayPricez = data["Time Series (Daily)"][today]["4. close"];
            var todayOpenPrice = data["Time Series (Daily)"][date]["1. open"];
            this.setState({
              price: priceResponse,
              todayPrice: todayPricez,
              symbol: StockSymbol,
              quantity: qty,
              open:todayOpenPrice
            });
            var object = this.createData(
              this.state.symbol,
              this.state.buyDateString,
              this.state.price,
              this.state.quantity,
              this.state.todayPrice,
              this.state.open
            );
            console.log(object);
            //very important to remember this will be what i pass into reducer
            this.props.saveTransaction(object);
            this.setState({
              symbol: "",
              quantity: "",
              buyDateString: "2020-09-17",
              price: 0,
              todayPrice: 0,
              open:0
            });
            this.props.onChange({
              symbol: "",
              quantity: "",
              buyDateString: "2020-09-17",
              price: 0,
              todayPrice: 0,
              open:0
            });
          }
        }.bind(this)
      );
      e.preventDefault();
      this.setState({
        symbol: "",
        quantity: "",
        buyDateString: "2020-09-17",
        price: 0,
        todayPrice: 0,
      });
      this.props.onChange({
        symbol: "",
        quantity: "",
        buyDateString: "2020-09-17",
        price: 0,
        todayPrice: 0,
      });
    //******************** */

    //now i need to sent this shit to the DATABASE RECIEVE IT and list that shit it the table.
    //conect to redux store
    //create action creator
    //make sure i can get an object into database
    //create fetch stocks  so i can list it in table
    //make sure i can delete stocks if necesary
    // add news api
  };
  handleChange = (date) => {
    var tempMonth = "";
    if (date.getMonth() + 1 < 10) {
      tempMonth = "0" + (date.getMonth() + 1).toString();
    } else {
      tempMonth = (date.getMonth() + 1).toString();
    }
    //handle weekednds
    var tempDay = "";
    var subtractDay = 0;
    if (date.getDay() === 6){
      subtractDay = 1;
    }
    if (date.getDay() === 0){
      subtractDay = 2;
    }
    if (date.getDay() === 1){
      subtractDay = 3;
    }
    //also issue if its begging of month LOLOLOL not gonna handle that #EDGE CASE
    if (date.getDate() < 10) {
      tempDay = "0" + (date.getDate() - subtractDay).toString();
      
    } else {
      tempDay = (date.getDate()- subtractDay).toString();
    }
    var stringDate = `${date.getFullYear().toString()}-${tempMonth}-${tempDay}`;
    //console.log(tempMonth);
    this.setState({
      buyDate: date,
      buyDateString: stringDate,
    });
  };

  render() {
    return (
      <form>
        <label>What day did you buy stock?</label>
        <DatePicker
          selected={this.state.buyDate}
          onChange={this.handleChange}
        />
        <input
          name="symbol"
          placeholder="Ticker Symbol"
          value={this.state.symbol}
          onChange={(e) => this.change(e)}
        />
        <br />
        <input
          name="quantity"
          type="number"
          min="0"
          placeholder="Quantity"
          value={this.state.quantity}
          onChange={(e) => this.change(e)}
        />
        <br />
        <button onClick={(e) => this.onSubmit(e)}>Submit</button>
      </form>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    companies: state.stocks.companyInfo,
  };
};

export default connect(mapStateToProps, { saveTransaction })(StockForm); //no current company
