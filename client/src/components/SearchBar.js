import React,{ PropTypes }from "react";
import { connect } from 'react-redux';
import { getStocks,changeCurrentCompany } from '../actions';
import * as ReactBootStrap from "react-bootstrap";

class SearchBar extends React.Component {

  state = { 
    company: ""
 }; 
  onInputChange = (event) => {
    this.setState({ company: event.target.value.toUpperCase() });
  };
  onFormSubmit = (event) =>{ //this is a callback prop function to parent
      event.preventDefault();
      this.props.getStocks(this.state.company);
      this.props.changeCurrentCompany(this.state.company);
      console.log("stocks were fetched");
  }
  render() {

    return (
      <div>
        <div className="search-bar ui segment">
        <form onSubmit = {this.onFormSubmit}className="ui form">
          <div className="field">
            <label>Search by Ticker Symbol to change chart</label>
            <input type="text" value={this.state.company} onChange={this.onInputChange}/>
          </div>
        </form>
      </div>
      </div>
      
    );
  }
}

const mapStateToProps = (state) => {
  return {
    companies:state.stocks.companyInfo
  };
};

export default connect(
  mapStateToProps,
  { getStocks,changeCurrentCompany}
)(SearchBar);
