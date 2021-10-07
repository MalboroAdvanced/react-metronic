import axios from "axios";
import { toLength } from "lodash";
import { DropdownMenu1 } from "../../../../../_metronic/_partials/dropdowns";

//export const DISCOMS_URL = "api/discoms";
export const DISCOMS_URL = `${process.env.REACT_APP_ADMIN_API_URL}/api/getDiscomDataTableJson`;
export const DISCOMS_SAVE_URL = `${process.env.REACT_APP_ADMIN_API_URL}/api/saveDiscom`;
export const DISCOMS_FINDBYID_URL = `${process.env.REACT_APP_ADMIN_API_URL}/api/getDiscomEntityPojoObjectJson`;
export const DISCOMS_UPDATE_URL = `${process.env.REACT_APP_ADMIN_API_URL}/api/updateDiscom`;
export const STATE_FINDBYID_URL = `${process.env.REACT_APP_ADMIN_API_URL}/api/getStatePojoObjectJson`;
export const DISCOMDETAILS_FINDBYID_URL = `${process.env.REACT_APP_ADMIN_API_URL}/api/getDiscomDetails`;


// CREATE =>  POST: add a new discom to the server
export function createDiscom(discommaster) {
  //alert( JSON.stringify(user))
  // alert(user.email)
  //alert(user.userid)
   /*
  const formData = new FormData();
    formData.append('userid', user.userId);
    formData.append('contactNo', user.contactNo);
    formData.append('email', user.email); */
    console.log(discommaster)
    discommaster.joiningDate=GetFormattedDate(discommaster.joiningDate);
    return axios.post(DISCOMS_SAVE_URL+'?access_token='+localStorage.getItem('Authorization'), discommaster);

}

// READ
export function getAllDiscoms() {
 
  var dd;
  var d=axios.get(DISCOMS_URL);
  d.then(function(result) {
   
   dd= result.data;
   
 }, err => {
    alert('er '+err); 
 });
  return axios.get(DISCOMS_URL);
}

export function getDiscomById(compId) {
 
  return axios.get(DISCOMS_FINDBYID_URL+'?access_token='+localStorage.getItem('Authorization')+'&id='+compId);
}
export function getDiscomDetailsById(compId) {
 
  return axios.get(DISCOMDETAILS_FINDBYID_URL+'?access_token='+localStorage.getItem('Authorization')+'&id='+compId);
}
// Method from server should return QueryResultsModel(items: any[], totalsCount: number)
// items => filtered/sorted result
export function findDiscoms(queryParams) {
 // alert('w1'+DISCOMS_URL)
 //sizePerPage: discomsUIProps.queryParams.pageSize,
 //page: discomsUIProps.queryParams.pageNumber,
 
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
 // var  CDISCOMS_URL="http://localhost:8093/discom-service/api/getAllDiscom";
  // CDISCOMS_URL="http://localhost:8091/admin-service/api/getDiscomDataTableJson";
  var dd,dd1;
  let pi = 0, ps=5;
  pi=queryParams.pageNumber;
  ps=queryParams.pageSize;
 pi=pi-1;
 let start=pi*ps;
 let len1=ps;
  var d=axios.get(DISCOMS_URL+'?access_token='+localStorage.getItem('Authorization')+'&start='+start+'&length='+len1+'&sSearch=&sList=');
  d.then(function(result) {
   
   dd= result.data.entities;
   dd1= result.data.total;
   //alert('dd '+JSON.stringify(dd));
   
   
 }, err => {
   // alert('er '+err); 
 });
 //return axios.get(DISCOMS_URL+'?sSearch=s&start="0"&length="10"&sList=');
 // return axios.post(`${DISCOMS_URL}/find`, { queryParams });
return d;
}

// UPDATE => PUT: update the discom on the server

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
export function updateDiscom(discommaster) {
  //user.joiningDate='d';
 
  discommaster.joiningDate=GetFormattedDate(discommaster.joiningDate);
 
  return axios.post(DISCOMS_UPDATE_URL+'/'+discommaster.discomMasterId+'?access_token='+localStorage.getItem('Authorization'), discommaster);
}

// UPDATE Status
export function updateStatusForDiscoms(ids, status) {
  return axios.post(`${DISCOMS_URL}/updateStatusForDiscoms`, {
    ids,
    status
  });
}

// DELETE => delete the discom from the server
export function deleteDiscom(discomId) {
  return axios.delete(`${DISCOMS_URL}/${discomId}`);
}

// DELETE Discoms by ids
export function deleteDiscoms(ids) {
  return axios.post(`${DISCOMS_URL}/deleteDiscoms`, { ids });
}
//export function findRegionForState(stateMasterId) {
 export const findRegionForState = async (stateMasterId) => {
  return await axios.get(STATE_FINDBYID_URL+'?access_token='+localStorage.getItem('Authorization')+'&stateMasterId='+stateMasterId);
};
