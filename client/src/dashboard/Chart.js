import React from "react";
import { ResponsiveContainer } from "recharts";
import Title from "./Title";
import Plot from "react-plotly.js";
import { connect } from "react-redux";
import { getStocks} from "../actions";

class Chart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      stockChartXValues: [],
      stockChartYValues: [],
    };
  }      

  componentDidMount() {
    this.props.getStocks(this.props.currentCompany);
    this.fetchStocks();
    
  }
  componentDidUpdate(prevProps) {
    if (prevProps.currCompany !== this.props.currCompany) {
      this.fetchStocks();
    }
  }

  fetchStocks() {
    const pointerToThis = this;
   // console.log(pointerToThis);
    const API_KEY = 'HGJWFG4N8AQ66ICD';
    let StockSymbol = this.props.currCompany;
    let API_Call = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${StockSymbol}&outputsize=compact&apikey=${API_KEY}`;
    let stockChartXValuesFunction = [];
    let stockChartYValuesFunction = [];

    fetch(API_Call)
      .then(
        function(response) {
          return response.json();
        }
      )
      .then(
        function(data) {
          //console.log(data);

          if ('Note' in data){
             alert(data.Note);
          }
          if ('Error Message' in data){
            alert("No Ticker exists for your input String Please input valid Ticker Symbol")
          }
         

          for (var key in data['Time Series (Daily)']) {
            stockChartXValuesFunction.push(key);
            stockChartYValuesFunction.push(data['Time Series (Daily)'][key]['1. open']);
          }
          pointerToThis.setState({
            stockChartXValues: stockChartXValuesFunction,
            stockChartYValues: stockChartYValuesFunction
          });
        }
      )
  }
  fetchStock() {
    let stockChartXValuesFunction = [];
    let stockChartYValuesFunction = [];
    for (var key in this.props.historics) {
      stockChartXValuesFunction.push(key);
      stockChartYValuesFunction.push(this.props.historics[key]["1. open"]);
    }
    this.setState({
      stockChartXValues: stockChartXValuesFunction,
      stockChartYValues: stockChartYValuesFunction,
    });
  }
  render() {
    return (
      <React.Fragment>
        <Title>Today</Title>
        <ResponsiveContainer>
          <Plot
            data={[
              {
                x: this.state.stockChartXValues,
                y: this.state.stockChartYValues,
                type: "scatter",
                mode: "lines+markers",
                marker: { color: "red" },
              },
            ]}
            layout={{ width: 850, height: 440, title: this.props.currCompany }}
          />
        </ResponsiveContainer>
      </React.Fragment>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    currCompany: state.stocks.currentCompany,
    historics: state.stocks.companyInfo,
  };
};
export default connect(mapStateToProps, { getStocks })(Chart);
