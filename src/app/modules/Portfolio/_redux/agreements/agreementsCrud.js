import axios from "axios";
import { toLength } from "lodash";
import { DropdownMenu1 } from "../../../../../_metronic/_partials/dropdowns";

//export const AGREEMENTS_URL = "api/agreements";
export const AGREEMENTS_URL = `${process.env.REACT_APP_ADMIN_API_URL}/api/getAgreementDataTableJson`;
export const AGREEMENTS_SAVE_URL = `${process.env.REACT_APP_ADMIN_API_URL}/api/saveAgreement`;
export const AGREEMENTS_FINDBYID_URL = `${process.env.REACT_APP_ADMIN_API_URL}/api/getAgreementEntityPojoObjectJson`;
export const AGREEMENTS_UPDATE_URL = `${process.env.REACT_APP_ADMIN_API_URL}/api/updateAgreement`;
export const AGREEMENTDETAILS_FINDBYID_URL = `${process.env.REACT_APP_ADMIN_API_URL}/api/getAgreementDetails`;

export const STATE_FINDBYID_URL = `${process.env.REACT_APP_ADMIN_API_URL}/api/getStatePojoObjectJson`;

// CREATE =>  POST: add a new agreement to the server
export function createAgreement(agreementmaster) {

  


  //alert( JSON.stringify(user))
  // alert(user.email)
  //alert(user.userid)
   /*
  const formData = new FormData();
    formData.append('userid', user.userId);
    formData.append('contactNo', user.contactNo);
    formData.append('email', user.email); */
    
    agreementmaster.stratDate=GetFormattedDate(agreementmaster.stratDate);
    agreementmaster.endDate=GetFormattedDate(agreementmaster.endDate);
    agreementmaster.dueDate=GetFormattedDate(agreementmaster.dueDate);


   

    return axios.post(AGREEMENTS_SAVE_URL+'?access_token='+localStorage.getItem('Authorization'),agreementmaster);

}

// READ
export function getAllAgreements() {
 
  var dd;
  var d=axios.get(AGREEMENTS_URL);
  d.then(function(result) {
   
   dd= result.data;
   
 }, err => {
    alert('er '+err); 
 });
  return axios.get(AGREEMENTS_URL);
}

export function getAgreementById(compId) {
//  console.log("compid",compId)

  return axios.get(AGREEMENTS_FINDBYID_URL+'?access_token='+localStorage.getItem('Authorization')+'&id='+compId);
}
export function getAgreementDetailsById(compId) {
  //  console.log("compid",compId)
  
    return axios.get(AGREEMENTDETAILS_FINDBYID_URL+'?access_token='+localStorage.getItem('Authorization')+'&id='+compId);
  }
  
// Method from server should return QueryResultsModel(items: any[], totalsCount: number)
// items => filtered/sorted result
export function findAgreements(queryParams) {
 // alert('w1'+AGREEMENTS_URL)
 //sizePerPage: agreementsUIProps.queryParams.pageSize,
 //page: agreementsUIProps.queryParams.pageNumber,
 
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
 // var  CAGREEMENTS_URL="http://localhost:8093/agreement-service/api/getAllAgreement";
  // CAGREEMENTS_URL="http://localhost:8091/admin-service/api/getAgreementDataTableJson";
  var dd,dd1;
  let pi = 0, ps=5;
  pi=queryParams.pageNumber;
  ps=queryParams.pageSize;
 pi=pi-1;
 let start=pi*ps;
 let len1=ps;
  var d=axios.get(AGREEMENTS_URL+'?access_token='+localStorage.getItem('Authorization')+'&start='+start+'&length='+len1+'&sSearch=&sList=');
  console.log(d)
  d.then(function(result) {
   
   dd= result.data.entities;
   dd1= result.data.total;
   //alert('dd '+JSON.stringify(dd));
   
   
 }, err => {
   // alert('er '+err); 
 });
 //return axios.get(AGREEMENTS_URL+'?sSearch=s&start="0"&length="10"&sList=');
 // return axios.post(`${AGREEMENTS_URL}/find`, { queryParams });
return d;
}

// UPDATE => PUT: update the agreement on the server

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
export function updateAgreement(ids,agreementmaster) {
  //user.joiningDate='d';
//  console.log(agreementmaster)
//  console.log("ididid",ids)
  agreementmaster.stratDate=GetFormattedDate(agreementmaster.stratDate);
    agreementmaster.endDate=GetFormattedDate(agreementmaster.endDate);
    agreementmaster.dueDate=GetFormattedDate(agreementmaster.dueDate);

  return axios.post(AGREEMENTS_UPDATE_URL+'/'+ids+'?access_token='+localStorage.getItem('Authorization'), agreementmaster);
}

// UPDATE Status
export function updateStatusForAgreements(ids, status) {
  return axios.post(`${AGREEMENTS_URL}/updateStatusForAgreements`, {
    ids,
    status
  });
}

// DELETE => delete the agreement from the server
export function deleteAgreement(agreementId) {
  return axios.delete(`${AGREEMENTS_URL}/${agreementId}`);
}

// DELETE Agreements by ids
export function deleteAgreements(ids) {
  return axios.post(`${AGREEMENTS_URL}/deleteAgreements`, { ids });
}
//export function findRegionForState(stateMasterId) {
 export const findRegionForState = async (stateMasterId) => {
  return await axios.get(STATE_FINDBYID_URL+'?access_token='+localStorage.getItem('Authorization')+'&stateMasterId='+stateMasterId);
};
