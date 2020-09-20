import { GET_STOCK_INFO,CHANGE_COMPANY, SAVE_TRANSACTION, FETCH_STOCKS } from "../actions/types";
import _ from 'lodash';
const INTIAL_STATE = {
  companyInfo: {},
  currentCompany: "FB",
  listStocks :{}
};
export default (state = INTIAL_STATE, action) => {
  switch (action.type) {
    case GET_STOCK_INFO:
      return { ...state, companyInfo: action.payload };
    case CHANGE_COMPANY:
        return {...state,currentCompany:action.payload};
    case SAVE_TRANSACTION:
        return state;
        //mgl needs work 
    case FETCH_STOCKS:
        return { ...state, listStocks:action.payload };
        // pretty sure this is where it sgoing wrong
    default:
      return state;
  }
};
