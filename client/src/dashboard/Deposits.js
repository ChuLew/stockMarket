import React from 'react';
import StockPopup from '../components/streams/StockPopup';
import { connect } from 'react-redux';
import { getStocks } from '../actions';
import stock from '../apis/stock';
import {Table} from "react-bootstrap";


class Deposits extends React.Component{
  state = {
    date: [],
    open: [],
    high: [],
    low: [],
    close:[],
    adjustedclose:[],
    volume:[],
    divident:[],
    coefficient:[],
    zip:[]
  }  
  componentDidMount(){
    this.props.getStocks(this.props.currentCompany);
    this.populateData();
  }


populateData = () => {
   let dateFunction= [];
     let openFunction= [];
      let highFunction= [];
      let lowFunction= [];
      let closeFunction=[];
      let adjustedcloseFunction=[];
      let volumeFunction=[];
      let dividentFunction=[];
      let coefficientFunction=[];

      for (var key in this.props.historics){
        dateFunction.push(key);
        openFunction.push(this.props.historics[key]["1. open"]);
        highFunction.push(this.props.historics[key]["2. high"]);
        lowFunction.push(this.props.historics[key]["3. low"]);
        closeFunction.push(this.props.historics[key]["4. close"]);
        adjustedcloseFunction.push(this.props.historics[key]["5. adjusted close"]);
        volumeFunction.push(this.props.historics[key]["6. volume"]);
        dividentFunction.push(this.props.historics[key]["7. dividend amount"]);
        coefficientFunction.push(this.props.historics[key]["8. split coefficient"]);
      }
      this.setState({
        date:dateFunction,
        open:openFunction,
        high:highFunction,
        low:lowFunction,
        close:closeFunction,
        adjustedclose:adjustedcloseFunction,
        volume:volumeFunction,
        divident:dividentFunction,
        coefficient:coefficientFunction
      })
      var zipi = [];
      for (var i = 0; i < this.state.date.length; i++){
          zipi.push([this.state.date[i], this.state.open[i],this.state.close[i]]);
      this.setState({zip:zipi});
}
}
  render(){
    return (
      <div>
         <button onClick ={this.populateData}>Load {this.props.currentCompany} Historical Data </button>
         <Table striped bordered hover variant="dark">
          <thead>
             <tr>
          <th align="center">Date</th>
          <th align="center">Opening Price</th>
          <th align="center">Closing Price</th>
        </tr>
          </thead>
       <tbody>
         {this.state.zip.map((arr)=>{
           return(
             <tr>
               <td align="right">{arr[0]}</td>
               <td align="right">{arr[1]}</td>
               <td align="right" >{arr[2]}</td>
             </tr>
           )
         })}
       </tbody>
        </Table>
      </div>
       
      );
  }
}

const mapStateToProps = (state) => {
  return {
    historics:state.stocks.companyInfo,
    currentCompany:state.stocks.currentCompany
  };
};

export default connect(
  mapStateToProps,
  { getStocks }
)(Deposits);