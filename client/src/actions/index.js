import streams from "../apis/streams";
// eslint-disable-next-line
import stock from "../apis/stock";
import history from "../history";

import {
  SIGN_IN,
  SIGN_OUT,
  CREATE_STREAM,
  FETCH_STREAMS,
  FETCH_STREAM,
  DELETE_STREAM,
  EDIT_STREAM,
  CREATE_PERSON,
  EDIT_HOLDING,
  CURRENT_PERSON,
  GET_STOCK_INFO,
  CHANGE_COMPANY,
  SAVE_TRANSACTION,
  FETCH_STOCKS
} from "./types";


export const signIn = (userId) => {
  return {
    type: SIGN_IN,
    payload: userId,
  };
};

export const signOut = () => {
  return {
    type: SIGN_OUT,
  };
};
export const changeCurrentCompany = (company) => {
  return {
    type: CHANGE_COMPANY,
    payload: company
  }
}
export const getStocks = (company) => async(dispatch,getState)=>{
  const API_KEY = '82N2UO66AVHA2EFY';
  const response = await stock.get('/search', {
    params:{
      function:'TIME_SERIES_DAILY_ADJUSTED',
      symbol:company, //this might be preconfigured but we want to pass in a stock we want to search for now lets keep this 
      apikey:API_KEY
     },
  });
 dispatch({type:GET_STOCK_INFO, payload:response.data['Time Series (Daily)']}) 
 console.log(response.data['Time Series (Daily)']);
};

export const saveTransaction = (object) => async(dispatch)=> {
  const response = await streams.post("/api/securitys",{...object})
  dispatch({type:SAVE_TRANSACTION, payload:response.data});
}
export const fetchStocks = () => async(dispatch)=>{
  const response = await streams.get("/api/securitys");
  dispatch({ type: FETCH_STOCKS, payload: response.data });
}
// export const apiRunOut = (company) => async(dispatch,getState)=>{
//   const API_KEY = 'HGJWFG4N8AQ66ICD';
//   const response = await stock.get('/search', {
//     params:{
//       function:'TIME_SERIES_DAILY_ADJUSTED',
//       symbol:company, //this might be preconfigured but we want to pass in a stock we want to search for now lets keep this 
//       apikey:API_KEY
//      },
//   });
//  dispatch({type:GET_STOCK_INFO, payload:response.data['Time Series (Daily)']}) 
//  console.log(response.data['Time Series (Daily)']);
// };
// export const apiThird = (company) => async(dispatch,getState)=>{
//   const API_KEY = 'WUOT41WJEJHDWT6T';
//   const response = await stock.get('/search', {
//     params:{
//       function:'TIME_SERIES_DAILY_ADJUSTED',
//       symbol:company, //this might be preconfigured but we want to pass in a stock we want to search for now lets keep this 
//       apikey:API_KEY
//      },
//   });
//  dispatch({type:GET_STOCK_INFO, payload:response.data['Time Series (Daily)']}) 
//  console.log(response.data['Time Series (Daily)']);
// };
export const createPerson = (object) => async(dispatch,getState)=>{
  const response = await streams.post("/api/persons",{...object})
  dispatch({type:CREATE_PERSON, payload:response.data});
}
export const currentPerson = (userid) => {
  return {
    type:CURRENT_PERSON,
    payload:userid
  }
}
export const createStream = (formValues) => async (dispatch, getState) => {
  const { userId } = getState().auth;
  const response = await streams.post("/api/streams", {
    ...formValues,
    userId,
  });

  dispatch({ type: CREATE_STREAM, payload: response.data });
  history.push("/");
};

export const fetchStreams = () => async (dispatch) => {
  const response = await streams.get("/api/streams");

  dispatch({ type: FETCH_STREAMS, payload: response.data });
};

export const fetchStream = (id) => async (dispatch) => {
  const response = await streams.get(`/api/streams/${id}`);

  dispatch({ type: FETCH_STREAM, payload: response.data });
};

export const editStream = (id, formValues) => async (dispatch) => {
  const response = await streams.patch(`/api/streams/${id}`, formValues);

  dispatch({ type: EDIT_STREAM, payload: response.data });
  history.push("/");
};

export const deleteStream = (id) => async (dispatch) => {
  await streams.delete(`/api/streams/${id}`);

  dispatch({ type: DELETE_STREAM, payload: id });
  history.push("/");
};
