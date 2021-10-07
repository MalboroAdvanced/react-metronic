import axios from "axios";
import { DropdownMenu1 } from "../../../../../_metronic/_partials/dropdowns";

//export const CUSTOMERS_URL = "api/customers";
export const CUSTOMERS_URL = `${process.env.REACT_APP_AUTH_API_URL}/api/getUserDataTableJson`;
export const CUSTOMERS_SAVE_URL = `${process.env.REACT_APP_AUTH_API_URL}/api/saveUser`;
export const CUSTOMERS_FINDBYID_URL = `${process.env.REACT_APP_AUTH_API_URL}/api/getUserPojoObjectJson`;
export const CUSTOMERS_UPDATE_URL = `${process.env.REACT_APP_AUTH_API_URL}/api/updateUser`;

// CREATE =>  POST: add a new customer to the server
export function createCustomer(user) {
  //alert( JSON.stringify(user))
  // alert(user.email)
  //alert(user.userid)
   /*
  const formData = new FormData();
    formData.append('userid', user.userId);
    formData.append('contactNo', user.contactNo);
    formData.append('email', user.email); */
  return axios.post(CUSTOMERS_SAVE_URL, user );
}

// READ
export function getAllCustomers() {
  
  var dd;
  var d=axios.get(CUSTOMERS_URL);
  d.then(function(result) {
   
   dd= result.data;
   
 }, err => {
    alert('er '+err); 
 });
  return axios.get(CUSTOMERS_URL);
}

export function getCustomerById(userId) {
  return axios.get(CUSTOMERS_FINDBYID_URL+'?id='+userId);
}

// Method from server should return QueryResultsModel(items: any[], totalsCount: number)
// items => filtered/sorted result
export function findCustomers(queryParams) {

  
  var dd,dd1;
  let pi = 0, ps=5;
  pi=queryParams.pageNumber;
  ps=queryParams.pageSize;
 pi=pi-1;
 let start=pi*ps;
 let len1=ps;
  var d=axios.get(CUSTOMERS_URL+'?sSearch=&start='+start+'&length='+len1+'&sList=');
  d.then(function(result) {
   
   dd= result.data.pojoClassList;
   dd1= result.data.total;
   //alert('dd '+JSON.stringify(dd));
   
   
 }, err => {
   // alert('er '+err); 
 });
 //return axios.get(CUSTOMERS_URL+'?sSearch=s&start="0"&length="10"&sList=');
 // return axios.post(`${CUSTOMERS_URL}/find`, { queryParams });
return d;
}

// UPDATE => PUT: update the customer on the server

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
export function updateCustomer(user) {
  //user.joiningDate='d';
  user.joiningDate=GetFormattedDate(user.joiningDate);
 
  return axios.post(`${CUSTOMERS_UPDATE_URL}/${user.id}`, user);
}

// UPDATE Status
export function updateStatusForCustomers(ids, status) {
  return axios.post(`${CUSTOMERS_URL}/updateStatusForCustomers`, {
    ids,
    status
  });
}

// DELETE => delete the customer from the server
export function deleteCustomer(customerId) {
  return axios.delete(`${CUSTOMERS_URL}/${customerId}`);
}

// DELETE Customers by ids
export function deleteCustomers(ids) {
  return axios.post(`${CUSTOMERS_URL}/deleteCustomers`, { ids });
}
