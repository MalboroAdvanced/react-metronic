import axios from "axios";
import { DropdownMenu1 } from "../../../../../_metronic/_partials/dropdowns";

//export const COMPANIES_URL = "api/companies";
export const COMPANIES_URL = `${process.env.REACT_APP_ADMIN_API_URL}/api/getStateDataTableJson`;
export const COMPANIES_SAVE_URL = `${process.env.REACT_APP_ADMIN_API_URL}/api/saveCompany`;
export const COMPANIES_FINDBYID_URL = `${process.env.REACT_APP_ADMIN_API_URL}/api/getCompanyEntityPojoObjectJson`;
export const COMPANIES_UPDATE_URL = `${process.env.REACT_APP_ADMIN_API_URL}/api/updateCompany`;

// CREATE =>  POST: add a new company to the server
export function createCompany(companymaster) {
  //alert( JSON.stringify(user))
  // alert(user.email)
  //alert(user.userid)
   /*
  const formData = new FormData();
    formData.append('userid', user.userId);
    formData.append('contactNo', user.contactNo);
    formData.append('email', user.email); */
    
    

    companymaster.joiningDate=GetFormattedDate(companymaster.joiningDate);
    return axios.post(COMPANIES_SAVE_URL+'?access_token='+localStorage.getItem('Authorization'), companymaster);

}

// READ
export function getAllCompanies() {
 
  var dd;
  var d=axios.get(COMPANIES_URL);
  d.then(function(result) {
   
   dd= result.data;
   
 }, err => {
    alert('er '+err); 
 });
  return axios.get(COMPANIES_URL);
}

export function getCompanyById(compId) {
 
  return axios.get(COMPANIES_FINDBYID_URL+'?access_token='+localStorage.getItem('Authorization')+'&id='+compId);

}

// Method from server should return QueryResultsModel(items: any[], totalsCount: number)
// items => filtered/sorted result
export function findCompanies(queryParams) {
 // alert('w1'+COMPANIES_URL)
 
  const headerss = {
    'Authorization': localStorage.getItem('Authorization'),
    'Content-type': 'application/x-www-form-urlencoded',
    'Access-Control-Allow-Origin': 'http://localhost:3005',
    'Access-Control-Allow-Methods': '*',
    'Access-Control-Allow-Headers': '*'
    }
    var vdata={'username':'a'
   
    }
 // var  CCOMPANIES_URL="http://localhost:8093/company-service/api/getAllCompany";
  // CCOMPANIES_URL="http://localhost:8091/admin-service/api/getCompanyDataTableJson";
  var dd,dd1;
  let pi = 0, ps=5;
  pi=queryParams.pageNumber;
  ps=queryParams.pageSize;
 pi=pi-1;
 let start=pi*ps;
 let len1=ps;
  var d=axios.get(COMPANIES_URL+'?access_token='+localStorage.getItem('Authorization')+'&start='+start+'&length='+len1+'&sSearch=&sList=');
  console.log(d)
  d.then(function(result) {
   
   dd= result.data.entities;
   console.log(dd)
   dd1= result.data.total;
   //alert('dd '+JSON.stringify(dd));
   
   
 }, err => {
   // alert('er '+err); 
 });
 //return axios.get(COMPANIES_URL+'?sSearch=s&start="0"&length="10"&sList=');
 // return axios.post(`${COMPANIES_URL}/find`, { queryParams });

return d;

}

// UPDATE => PUT: update the company on the server

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
export function updateCompany(user) {
  //user.joiningDate='d';
  
  user.joiningDate=GetFormattedDate(user.joiningDate);
 
  return axios.post(COMPANIES_UPDATE_URL+'/'+user.companyMasterId+'?access_token='+localStorage.getItem('Authorization'), user);
}

// UPDATE Status
export function updateStatusForCompanies(ids, status) {
  return axios.post(`${COMPANIES_URL}/updateStatusForCompanies`, {
    ids,
    status
  });
}

// DELETE => delete the company from the server
export function deleteCompany(companyId) {
  return axios.delete(`${COMPANIES_URL}/${companyId}`);
}

// DELETE Companies by ids
export function deleteCompanies(ids) {
  return axios.post(`${COMPANIES_URL}/deleteCompanies`, { ids });
}
