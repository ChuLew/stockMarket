import React from "react";
import Link from "@material-ui/core/Link";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Title from "./Title";
import StockPopup from "../components/streams/StockPopup";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import { connect } from "react-redux";
import { fetchStocks } from "../actions";

class Orders extends React.Component {
  componentDidMount() {
    this.props.fetchStocks();
  }
  componentDidUpdate(prevProps) {
    if (prevProps.listOfStocks === this.props.listOfStocks) {
      this.props.fetchStocks();
    }
  }
  fetchem = () => {
    this.props.fetchStocks();
  };
  render() {
    console.log(this.props.listOfStocks);
    return (
      <React.Fragment>
        <Title>Summary</Title>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Acquisition price</TableCell>
              <TableCell>Today Opening Price</TableCell>
              <TableCell>Todays Change</TableCell>
              <TableCell>Current Value</TableCell>
              <TableCell>Today Percent Gain/Loss</TableCell>
              <TableCell>Quantity of Stock Owned
              </TableCell>
              <TableCell>Stock Value change since Acquisition</TableCell>
              <TableCell>Percent Gain/loss since Acquisition </TableCell>
              <TableCell>Total earned loss since Acquisition</TableCell>
              <TableCell>Money Gained/Loss Since Acquisition</TableCell>
              <TableCell>Current Value of Stocks</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Object.keys(this.props.listOfStocks).map((keyName, i) => (
              <TableRow key={i}>
                <TableCell>{this.props.listOfStocks[keyName].symbol}</TableCell>
                <TableCell>{this.props.listOfStocks[keyName].purchaseprice}</TableCell>
                <TableCell>
                  {this.props.listOfStocks[keyName].opentoday}
                </TableCell>
                <TableCell>
                  {(
                    this.props.listOfStocks[keyName].purchaseprice -
                    this.props.listOfStocks[keyName].opentoday
                  ).toFixed(2)}
                </TableCell>
                <TableCell>
                  {this.props.listOfStocks[keyName].currentprice}
                </TableCell>
                
                <TableCell>
                  {(
                    (1 -
                      this.props.listOfStocks[keyName].opentoday /
                        this.props.listOfStocks[keyName].purchaseprice) *
                    100
                  ).toFixed(2)}
                  %
                </TableCell>
                <TableCell>
                  {this.props.listOfStocks[keyName].quantity}
                </TableCell>

                <TableCell>
                  {(
                    this.props.listOfStocks[keyName].purchaseprice -
                    this.props.listOfStocks[keyName].currentprice
                  ).toFixed(2)}
                </TableCell>
                <TableCell>
                  {(
                    (1 -
                      this.props.listOfStocks[keyName].purchaseprice /
                        this.props.listOfStocks[keyName].currentprice) *
                    100
                  ).toFixed(2)}
                  %
                </TableCell>
                <TableCell>
                  {(
                    (this.props.listOfStocks[keyName].currentprice -
                      this.props.listOfStocks[keyName].purchaseprice) *
                    this.props.listOfStocks[keyName].quantity
                  ).toFixed(2)}
                </TableCell>
                <TableCell>
                  {(
                    this.props.listOfStocks[keyName].purchaseprice -
                    this.props.listOfStocks[keyName].currentprice
                  ).toFixed(2) * this.props.listOfStocks[keyName].quantity}
                </TableCell>
                <TableCell>
                  {this.props.listOfStocks[keyName].currentprice *
                    this.props.listOfStocks[keyName].quantity}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div>
          <Popup trigger={<button>Buy Stocks</button>} position="right center">
            <StockPopup />
          </Popup>
          <button onClick={this.fetchem}>Load New Stock Transactions</button>
        </div>
      </React.Fragment>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    listOfStocks: state.stocks.listStocks,
  };
};
export default connect(mapStateToProps, { fetchStocks })(Orders);

// be able to edit holding price
