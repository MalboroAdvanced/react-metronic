import React, { Component } from 'react';
import axios from "axios";
import {useEffect} from "react"
//import PortfolioEditForm from "../Portfolio/pages/Portfolios/portfolio-edit-dialog/PortfolioEditForm";
import {
  
    Select
   
  } from "../../../_metronic/_partials/controls";
  export const STATE_URL = `${process.env.REACT_APP_ADMIN_API_URL}/api/getPortfolioDataListJson`;

class Portfolios extends Component {
    
   constructor(props) {
	super(props);
	this.state = {
		countries: [],
		colours: {}
	};
  
   
   // const {changeName} = props;
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
    //  console.log("higuru",dd)
     initialStates = dd.map((states) => {
        return states
    });
     //alert('dd '+JSON.stringify(dd));
    // alert(initialStates)
  
    initialStates.forEach((repo) => {
        var st_id=repo['portfolioMasterId'];
        var st_name=repo['portfolioId'];
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
      // console.log("kaka",item)
		return (<>
          
			<option key={i} value={item.id}>{item.name}</option>
            </>
		)
	}, this);

	return (<>
		{countriesList}</>
	);


}

}

export default Portfolios;
