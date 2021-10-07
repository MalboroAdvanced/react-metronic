import axios from "axios";
import { toLength } from "lodash";
import { DropdownMenu1 } from "../../../../../_metronic/_partials/dropdowns";

//export const PORTFOLIOS_URL = "api/portfolios";
export const PORTFOLIOS_URL = `${process.env.REACT_APP_ADMIN_API_URL}/api/getPortfolioDataTableJson`;
export const PORTFOLIOS_SAVE_URL = `${process.env.REACT_APP_ADMIN_API_URL}/api/savePortfolio`;
export const PORTFOLIOS_FINDBYID_URL = `${process.env.REACT_APP_ADMIN_API_URL}/api/getPortfolioEntityPojoObjectJson`;
export const PORTFOLIOS_UPDATE_URL = `${process.env.REACT_APP_ADMIN_API_URL}/api/updatePortfolio`;
export const STATE_FINDBYID_URL = `${process.env.REACT_APP_ADMIN_API_URL}/api/getStatePojoObjectJson`;
export const PORTFOLIODETAILS_FINDBYID_URL = `${process.env.REACT_APP_ADMIN_API_URL}/api/getPortfolioDetails`;
export const DISCOM_FINDBYID_URL = `${process.env.REACT_APP_ADMIN_API_URL}/api/getDiscomDropDownData`;


// CREATE =>  POST: add a new portfolio to the server
export function createPortfolio(portfoliomaster) {
  //alert( JSON.stringify(user))
  // alert(user.email)
  //alert(user.userid)
   /*
  const formData = new FormData();
    formData.append('userid', user.userId);
    formData.append('contactNo', user.contactNo);
    formData.append('email', user.email); */
    console.log(portfoliomaster)
    portfoliomaster.joiningDate=GetFormattedDate(portfoliomaster.joiningDate);
    return axios.post(PORTFOLIOS_SAVE_URL+'?access_token='+localStorage.getItem('Authorization'), portfoliomaster);

}

// READ
export function getAllPortfolios() {
 
  var dd;
  var d=axios.get(PORTFOLIOS_URL);
  d.then(function(result) {
   
   dd= result.data;
   
 }, err => {
    alert('er '+err); 
 });
  return axios.get(PORTFOLIOS_URL);
}

export function getPortfolioById(compId) {
 
  return axios.get(PORTFOLIOS_FINDBYID_URL+'?access_token='+localStorage.getItem('Authorization')+'&id='+compId);
}
export function getPortfolioDetailsById(compId) {
 
  return axios.get(PORTFOLIODETAILS_FINDBYID_URL+'?access_token='+localStorage.getItem('Authorization')+'&id='+compId);
}
// Method from server should return QueryResultsModel(items: any[], totalsCount: number)
// items => filtered/sorted result
export function findPortfolios(queryParams) {
 // alert('w1'+PORTFOLIOS_URL)
 //sizePerPage: portfoliosUIProps.queryParams.pageSize,
 //page: portfoliosUIProps.queryParams.pageNumber,
 
 //console.log(queryParams.pageNumber);
  const headerss = {
    'Authorization': localStorage.getItem('Authorization'),
    'Content-type': 'application/x-www-form-urlencoded',
    'Access-Control-Allow-Origin': 'http://localhost:3005',
    'Access-Control-Allow-Methods': '*',
    'Access-Control-Allow-Headers': '*'
    }
    var vdata={'username':'a'
   
    }
 // var  CPORTFOLIOS_URL="http://localhost:8093/portfolio-service/api/getAllPortfolio";
  // CPORTFOLIOS_URL="http://localhost:8091/admin-service/api/getPortfolioDataTableJson";
  var dd,dd1;
  let pi = 0, ps=5;
  pi=queryParams.pageNumber;
  ps=queryParams.pageSize;
 pi=pi-1;
 let start=pi*ps;
 let len1=ps;
  var d=axios.get(PORTFOLIOS_URL+'?access_token='+localStorage.getItem('Authorization')+'&start='+start+'&length='+len1+'&sSearch=&sList=');
  d.then(function(result) {
   
   dd= result.data.entities;
   dd1= result.data.total;
   //alert('dd '+JSON.stringify(dd));
   
   
 }, err => {
   // alert('er '+err); 
 });
 //return axios.get(PORTFOLIOS_URL+'?sSearch=s&start="0"&length="10"&sList=');
 // return axios.post(`${PORTFOLIOS_URL}/find`, { queryParams });
return d;
}

// UPDATE => PUT: update the portfolio on the server

function GetFormattedDate(dat) {
  var todayTime = new Date(dat);
  

  var month = (todayTime .getMonth() + 1);
  
  var day = (todayTime .getDate());
  var year = (todayTime .getFullYear());
  if(month<10)
  month='0'+month;
  if(day<10)
  day='0'+day;
  
  return day + "-" + month + "-" + year;
}
export function updatePortfolio(portfoliomaster) {
  //user.joiningDate='d';
 
  portfoliomaster.joiningDate=GetFormattedDate(portfoliomaster.joiningDate);
 
  return axios.post(PORTFOLIOS_UPDATE_URL+'/'+portfoliomaster.portfolioMasterId+'?access_token='+localStorage.getItem('Authorization'), portfoliomaster);
}

// UPDATE Status
export function updateStatusForPortfolios(ids, status) {
  return axios.post(`${PORTFOLIOS_URL}/updateStatusForPortfolios`, {
    ids,
    status
  });
}

// DELETE => delete the portfolio from the server
export function deletePortfolio(portfolioId) {
  return axios.delete(`${PORTFOLIOS_URL}/${portfolioId}`);
}

// DELETE Portfolios by ids
export function deletePortfolios(ids) {
  return axios.post(`${PORTFOLIOS_URL}/deletePortfolios`, { ids });
}
//export function findRegionForState(stateMasterId) {
 export const findRegionForState = async (stateMasterId) => {
  return await axios.get(STATE_FINDBYID_URL+'?access_token='+localStorage.getItem('Authorization')+'&stateMasterId='+stateMasterId);
};
export const findDiscomForState = async (stateName) => {
  return await axios.get(DISCOM_FINDBYID_URL+'?access_token='+localStorage.getItem('Authorization')+'&stateName='+stateName);
};