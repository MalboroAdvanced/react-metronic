import axios from "axios";
import parseJSON from "date-fns/parseJSON";
import { method } from "lodash-es";
import { useState } from "react";
import { useParams } from "react-router";
/* import { useTheme } from "styled-components"; */
import { DropdownMenu1 } from "../../../../../_metronic/_partials/dropdowns";

//export const COMPANIES_URL = "api/companies";
export const IOMS_URL = `${process.env.REACT_APP_ADMIN_API_URL}/api/getIOMDataTableJson`;
export const IOMS_SAVE_URL = `${process.env.REACT_APP_ADMIN_API_URL}/api/saveIOM`;
export const IOMS_FINDBYID_URL = `${process.env.REACT_APP_ADMIN_API_URL}/api/getIOMEntityPojoObjectJson`;
export const IOMS_UPDATE_URL = `${process.env.REACT_APP_ADMIN_API_URL}/api/updateIOM`;
export const IOMS_DELETE_URL = `${process.env.REACT_APP_ADMIN_API_URL}/api/deleteIOM`;
export const IOMS_DateTime_URL = `${process.env.REACT_APP_ADMIN_API_URL}/api/importDateTimeQuantumFile`;
export const IOMS_SaveDateTime_URL = `${process.env.REACT_APP_ADMIN_API_URL}/api/saveDateTimeQuantum`;
// CREATE =>  POST: add a new company to the server



export  function createDateTime(iommaster) {
  const formData = new FormData();
  formData.append("file",iommaster)
  console.log("iomsmaster",formData)

  //alert( JSON.stringify(user))
  // alert(user.email)
  //alert(user.userid)
   /*
  const formData = new FormData();
    formData.append('userid', user.userId);
    formData.append('contactNo', user.contactNo);
    formData.append('email', user.email); */
    // iommaster.toDate=GetFormattedDate(iommaster.toDate);
    // iommaster.fromDate=GetFormattedDate(iommaster.fromDate);


    // try {
    //   const response = axios.post(IOMS_DateTime_URL+'?access_token='+localStorage.getItem('Authorization'),formData);
    //   const result = response.data.json();
    //   console.log("result",result)
    //   return result;
    // } catch (e) {
    //   console.log(e)
    //   return null;
    // }
    
   
    return axios.post(IOMS_DateTime_URL+'?access_token='+localStorage.getItem('Authorization'),formData);
  


}
export function DateTime(iommaster) {
  console.log("tohrtominute",iommaster)

     iommaster.details.fromDate=GetFormattedDate(iommaster.details.fromDate);
   iommaster.details.toDate=GetFormattedDate(iommaster.details.toDate);
    return axios.post(IOMS_SaveDateTime_URL+'?access_token='+localStorage.getItem('Authorization'),iommaster);

}

export function createIom(iommaster) {
  
  //alert( JSON.stringify(user))
  // alert(user.email)
  //alert(user.userid)
   /*
  const formData = new FormData();
    formData.append('userid', user.userId);
    formData.append('contactNo', user.contactNo);
    formData.append('email', user.email); */
    iommaster.toDate=GetFormattedDate(iommaster.toDate);
    iommaster.fromDate=GetFormattedDate(iommaster.fromDate);
    return axios.post(IOMS_SAVE_URL+'?access_token='+localStorage.getItem('Authorization'), iommaster);

}

// READ








export function getAllIoms() {
 
  var dd;
  var d=axios.get(IOMS_URL);
  d.then(function(result) {
   
   dd= result.data;
   
 }, err => {
    alert('er '+err); 
 });
  return axios.get(IOMS_URL);
}

export function getIomById(id) {
 
  return axios.get(IOMS_FINDBYID_URL+'?access_token='+localStorage.getItem('Authorization')+'&id='+id);
}

// Method from server should return QueryResultsModel(items: any[], totalsCount: number)
// items => filtered/sorted result
export function findIoms(queryParams) {
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
  var d=axios.get(IOMS_URL+'?access_token='+localStorage.getItem('Authorization')+'&start='+start+'&length='+len1+'&sSearch=&sList=');

  // console.log(d)
  d.then(function(result) {
   
   dd= result.data.entities;
  
   dd1= result.data.total;
   //alert('dd '+JSON.stringify(dd));
   
   
 }, err => {
   // alert('er '+err); 
 });
 //return axios.get(COMPANIES_URL+'?sSearch=s&start="0"&length="10"&sList=');
 // return axios.post(`${COMPANIES_URL}/find`, { queryParams });
//  console.log("po",dd)
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
  
  return year + "-" + month + "-" + day;
}




  
  

export function updateIom(ids,user) {
  //user.joiningDate='d';
console.log(user)
 
  user.fromDate=GetFormattedDate(user.fromDate);
  user.toDate=GetFormattedDate(user.toDate);
  return axios.post(IOMS_UPDATE_URL+'/'+ids+'?access_token='+localStorage.getItem('Authorization'), user);
}

// UPDATE Status
export function updateStatusForIoms(ids, status) {
  return axios.post(`${IOMS_URL}/updateStatusForCompanies`, {
    ids,
    status
  });
}




// DELETE => delete the company from the server
export function deleteIom(id) {
  const headerss = {
    'Authorization': localStorage.getItem('Authorization'),
    'Content-type': 'application/x-www-form-urlencoded',
    'Access-Control-Allow-Origin': 'http://localhost:3005',
    'Access-Control-Allow-Methods': '*',
    'Access-Control-Allow-Headers': '*'
    }
    var vdata={'username':'a'
   
    }
// console.log("iopies",id)
  return axios.delete(`${IOMS_DELETE_URL}/${id}`);
// return axios.get(IOMS_DELETE_URL+id+'?access_token='+localStorage.getItem('Authorization'),
// method='delete');

}



// DELETE Companies by ids
export function deleteIoms(ids) {
  console.log(ids)
  return axios.post(`${IOMS_URL}/deleteioms`, { ids });
}
