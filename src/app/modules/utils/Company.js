import React, { Component } from 'react';
import axios from "axios";
import {
  
    Select,
   
  } from "../../../_metronic/_partials/controls";
  export const STATE_URL = `${process.env.REACT_APP_ADMIN_API_URL}/api/getCompanyDataListJson`;

class Company extends Component {
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
    var dd;
    let initialStates = [];
    let initialStates1 = [];
    var d=axios.get(STATE_URL+'?access_token='+localStorage.getItem('Authorization'));
    d.then(function(result) {
    
     dd= result.data;
     initialStates = dd.map((states) => {
        return states
    });
     //alert('dd '+JSON.stringify(dd));
    // alert(initialStates)
  
    initialStates.forEach((repo) => {
        var st_id=repo['companyMasterId'];
        var st_name=repo['companyName'];
        let object = {id: st_id, name: st_name};
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
		return (
            <>
              
			<option key={i} value={item.id}>{item.name}</option>
            </>
		)
	}, this);

	return (
		<div>
		  <Select name="companyName" label="Company Name">
          <option>-Select-</option>
				{countriesList}
			</Select>
		</div>
	);

}
}
export default Company;
