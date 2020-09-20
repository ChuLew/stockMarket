import axios from 'axios';
const API_KEY = '82N2UO66AVHA2EFY';
export default axios.create({
   baseURL: `https://www.alphavantage.co/query?`,
   params:{
    function:'TIME_SERIES_DAILY_ADJUSTED',
    symbol:'IBM', //this might be preconfigured but we want to pass in a stock we want to search for now lets keep this 
    apikey:API_KEY
   }
});
 