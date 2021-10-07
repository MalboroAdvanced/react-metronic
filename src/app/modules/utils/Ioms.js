












// import axios from "axios";
// import { useState } from "react";
// // import { DropdownMenu1 } from "../../../../../_metronic/_partials/dropdowns";

// //export const COMPANIES_URL = "api/companies";
// export const IOMS_URL = `${process.env.REACT_APP_ADMIN_API_URL}/api/getIOMDataTableJson`;
// export const IOMS_SAVE_URL = `${process.env.REACT_APP_ADMIN_API_URL}/api/saveIOM`;
// export const IOMS_FINDBYID_URL = `${process.env.REACT_APP_ADMIN_API_URL}/api/getIOMEntityPojoObjectJson`;
// export const IOMS_UPDATE_URL = `${process.env.REACT_APP_ADMIN_API_URL}/api/updateIOM`;
// export const IOMS_DELETE_URL = `${process.env.REACT_APP_ADMIN_API_URL}/api/deleteIOM`;

//  function Ioms() {
//  // alert('w1'+COMPANIES_URL)
//  const [dara,setData]=useState([])
//   const headerss = {
//     'Authorization': localStorage.getItem('Authorization'),
//     'Content-type': 'application/x-www-form-urlencoded',
//     'Access-Control-Allow-Origin': 'http://localhost:3005',
//     'Access-Control-Allow-Methods': '*',
//     'Access-Control-Allow-Headers': '*'
//     }
//     var vdata={'username':'a'
   
//     }
//  // var  CCOMPANIES_URL="http://localhost:8093/company-service/api/getAllCompany";
//   // CCOMPANIES_URL="http://localhost:8091/admin-service/api/getCompanyDataTableJson";
//   var dd,dd1;

//   let pi = 0, ps=5;
// //   pi=pageNumber;
// //   ps=pageSize;
//  pi=pi-1;
//  let start=pi*ps;
//  let len1=ps;
//   var d=axios.get(IOMS_URL+'?access_token='+localStorage.getItem('Authorization')+'&start='+start+'&length='+len1+'&sSearch=&sList=');
// console.log("ram",d)
//   d.then(function(result) {
   
//    dd= result.data.entities;
//   setData(dd)
//    dd1= result.data.total;
//    //alert('dd '+JSON.stringify(dd));
   
   
//  }, err => {
//    // alert('er '+err); 
//  });
//  //return axios.get(COMPANIES_URL+'?sSearch=s&start="0"&length="10"&sList=');
//  // return axios.post(`${COMPANIES_URL}/find`, { queryParams });
 
// return (<> 


// </>)
// }


// // UPDATE Status






// export default Ioms





import React, { Component } from 'react';
import axios from "axios";
import {
  
    Select,
   
  } from "../../../_metronic/_partials/controls";

  
  export const IOMS_URL = `${process.env.REACT_APP_ADMIN_API_URL}/api/getIOMDataTableJson`;

class Ioms extends Component {
   constructor(props) {
	super(props);
	this.state = {
		countries: [],
		colours: {}
	};
}

/* componentDidMount() {
    let initialPlanets = [];
    alert()
    fetch('https://swapi.co/api/planets/')
        .then(response => {
            return response.json();
        }).then(data => {
        initialPlanets = data.results.map((states) => {
            return states
        });
        console.log(initialPlanets);
        this.setState({
            states: initialPlanets,
        });
    });
} */
componentDidMount() {
    let initialStates = [];
    let initialStates1 = [];
    var dd;
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
//   var dd,dd1;

  let pi = 0, ps=5;
//   pi=pageNumber;
//   ps=pageSize;
 pi=pi-1;
 let start=pi*ps;
 let len1=ps;
  var d=axios.get(IOMS_URL+'?access_token='+localStorage.getItem('Authorization')+'&start='+start+'&length='+len1+'&sSearch=&sList=');


  console.log("ram",d)
    d.then(function(result) {
    
     dd= result.data.entities;
     initialStates = dd.map((states) => {
        return states
    });
     //alert('dd '+JSON.stringify(dd));
    // alert(initialStates)
  
    initialStates.forEach((repo) => {
        var st_id=repo['id'];
        var st_iomNumber=repo['iomNumber'];
        let object = {id: st_id, iomNumber: st_iomNumber};
        initialStates1.push(object);
        /* Object.entries(repo).forEach(([key, value]) => {
          console.log(`${key}: ${value}`);
        });*/
      }); 
   }, err => {
      alert('er '+err); 
   });
	this.setState({
		countries: initialStates1
	});
}
render() {
	const { countries } = this.state;
  
	let countriesList = countries.length > 0
		&& countries.map((item, i) => {
            // console.log(item)
		return (
			<option key={i} value={item.id}>{item.iomNumber}</option>
		)
	}, this);

	return (
		<>
		 
				{countriesList}
		
		</>
	);

}
}
export default Ioms;
