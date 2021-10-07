
import { Modal } from "react-bootstrap";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import * as act from "../../../_redux/ioms/iomsActions";
import { useEffect } from "react";
import {
  Input,
Select,
  DatePickerField,DatePick
} from "../../../../../../_metronic/_partials/controls";

import { shallowEqual, useDispatch, useSelector } from "react-redux";

import * as requestFromServer from "../../../_redux/ioms/iomsCrud";
import {iomsSlice, callTypes} from "../../../_redux/ioms/iomsSlice";

import Selected from "@material-ui/core/Select";
// import * as actions from "../../../_redux/ioms/iomsActions";
import {
  Minute_Type,Hour_TYPE,REGIONTYPE,CONTRACT_TYPE,BILLING_HEAD,DELIVERY_POINT,PROVISIONAL_BILLING_CYCLE,BILLING_SOURCE, Minute_TYPE
  
}  from "../IomsUIHelpers";


import React, {Component,useState, useMemo } from "react";
import { TextField ,MenuItem, Menu} from "@material-ui/core";
import { values } from "lodash-es";
import { element, objectOf } from "prop-types";
// import { MenuItem } from "";





export function IomViewForm   ({
  saveIom,
  getRegionForState,
  iom,id,
  actionsLoading,
  onHide,
})


{
  const {actions} = iomsSlice;
  // const arr=new Array();


  // alert(id)
  // state = {
  //   rows: [0]
  
  // };
  // const [ name, value ] =useState('')

 const handleChange = idx => e => {
    const { name, value } =e.target
    
    const rows = [...state.rows];

    rows[idx] = {
      [name]: value
    };
   // var c={[name]:value}
// alert(JSON.stringify(c))

    setState({
      rows
    });
    arr.push({[name]:value})
  // var arr=new Array()

//     setPersonName({
//     rows: {...personName.rows,[name]:value}
//  });


//personName.rows.push({value})


//setPersonName(...personName.rows,value);
//  alert(JSON.stringify(arr));

  };



const [arr,setArray]=useState([])
  const [personName,setPersonName]=useState({rows:[]})

  const handleAddRow = () => {
    const item = {
      fromDate: "",
      toDate: "",
      fromHr:"",
      fromMin:"",
      toHr:"",
      toMin:"",
      quantum:"",
    };
  setState({
    rows: [...state.rows, item]
    });

      setPersonName({
      rows: [...personName.rows, item]
      });
  };
  const dispatch = useDispatch();

  const handleRemoveRow = () => {
  setState({
      rows: state.rows.slice(0, -1)
    });
    setPersonName({
      rows: personName.rows.slice(0, -1)
    });
  };
  // render() {
 
  	const [selectedFile, setSelectedFile] = useState('');

	const [selectedfile, setIsSelected] = useState(false);
  const [data, setData] = React.useState([]);
  // const [data,setData]=useState([])
  const [state,setState]=useState({rows:[{}]})
console.log("state",state.rows)
  const [client,setClient]=useState('')

  const [tata,seTata]=useState([])
const handleCallAPI=async()=>{

  alert(JSON.stringify(arr));
  console.log("arr",arr)

  var perChunk = 7    

  var inputArray = arr

  
  var result = inputArray.reduce((resultArray, item, index) => { 
    const chunkIndex = Math.floor(index/perChunk)
  
    if(!resultArray[chunkIndex]) {
      resultArray[chunkIndex] = [] // start a new chunk
    }
  
    resultArray[chunkIndex].push(item)
  
    return resultArray
  }, [])
  
  console.log(result);


  var c=result
  console.log("c",c)

 const res = c.map(inner => Object.assign({}, ...inner));
 console.log(res);



 var data = {
  'id':id,
  'type':'IOM',
   'details':res
 };

 alert(JSON.stringify(data));
console.log("hi",JSON.stringify(data))



const values = res
console.log(JSON.stringify(res))



const obj = {
  "test": [{
      "id": 8,
      "num": 11
    },
    {
      "id": 3,
      "num": 10
    },
    {
      "id": 3,
      "num": 12
    },
  ]
};


const unique = new Set();
const showError = obj.test.some(element => unique.size === unique.add(element.id).size);


console.log("hiyt",showError);

// var myDataset = [
//   { seq: '1', },
//   { seq: '2', },
//   { seq: '3', },
//   { seq: '1', },
// ];








var visited = new Set();
var hasDuplicates = res.some(function(obj) {
  return visited.size === visited.add(obj.fromHr).size;

 
});

// console.log(Array.from(visited));
// console.log("Pls Check your rows you enter duplicate entry:",hasDuplicates);
// // alert("Pls Check your rows you enter duplicate entry:",hasDuplicates);


if(hasDuplicates==true)
{
  alert("Pls Check your rows you enter duplicate entry FromHr:",hasDuplicates);
}
else
{ var visited = new Set();
  var hasDuplicates = res.some(function(obj) {
    return visited.size === visited.add(obj.fromMin).size;
  })
  if(hasDuplicates==true)
  {
    alert("Pls Check your rows you enter duplicate entry in fromMin:",hasDuplicates);
  }

  else
  {
    var visited = new Set();
    var hasDuplicates = res.some(function(obj) {
      return visited.size === visited.add(obj.toHr).size;
    })
    if(hasDuplicates==true)
    {
      alert("Pls Check your rows you enter duplicate entry in toHr:",hasDuplicates);
    }
    else{

      var visited = new Set();
      var hasDuplicates = res.some(function(obj) {
        return visited.size === visited.add(obj.toMin).size;
      })
      if(hasDuplicates==true)
      {
        alert("Pls Check your rows you enter duplicate entry in ToMin:",hasDuplicates);
      }

else
{
   dispatch(act.DateTime(data)).then(() => onHide());
}
    }

  }
  //dispatch(act.DateTime(data)).then(() => onHide());

  // alert("Pls Check your rows you enter duplicate entry:",hasDuplicates);
}

 
 

}




 const handleCallData=()=>{
  
 }

  const changeHandler = (event) => {
		setSelectedFile(event.target.files[0]);
		setIsSelected(true);
	};

  const handleChange4=(event)=>{
    setClient(event.target.value)
    console.log("client",client)

  }


const [date,setDate]=useState('')

const handleDate=idx=>e=>{
//   return (n < 10 ? '0' : '') + n;
// var date=event.target.value
var date =e.target.value
const {name,value}=e.target
//console.log(date)
var yourdate = date.split("/").reverse().join("-");
var dateAr = yourdate.split('-');
var newDate = dateAr[2] + '-' + dateAr[1] + '-' + dateAr[0];

//console.log("gy",newDate);
const rows = [...state.rows];
rows[idx] = {
  [name]: newDate
};
setState({
  rows
});
arr.push({[name]:newDate})
// setPersonName({
//   rows: {...personName.rows,[name]:newDate}
//   });
// setPersonName({
//   rows: [...personName.rows,{[name]:newDate}]
// });
// personName.push({[name]:newDate});

}

	const handleSubmission = () => {
  
    dispatch(actions.startCall({ callType: callTypes.action }));
    return requestFromServer
      .createDateTime(selectedFile)
      .then(response => {
        // console.log("lala",response)
      setData(response.data.details)
      setState({rows:response.data.details})
      //  return response.data.details
        // const { iom } = response.data;
        // dispatch(actions.iomCreated({ iom }));
      })
      // .catch(error => {
      //   console.log(error)
      //   error.clientMessage = "Can't create DateTime";
      //   dispatch(actions.catchError({ error, callType: callTypes.action }));
      // });

      setOpen(true)

    } 

console.log("fg",state.rows)
console.log(data)
const [open,setOpen]=useState(false)


const showData=()=>{
    return (
  <>


<Formik
  enableReinitialize={true}
  initialValues={iom}
 
  onSubmit={(values) => {
    saveIom(values);

  }}
>
  {({ handleSubmit }) => (
    <>
      <Modal.Body className="overlay overlay-block cursor-default">
        {actionsLoading && (
          <div className="overlay-layer bg-transparent">
            <div className="spinner spinner-lg spinner-success" />
          </div>
        )}
     
<div>

  <div style={{margin:8,marginTop:10}}>
    
        <table
         
          id="tab_logic"
        >
          <thead>
          <tr>
<th>From Date</th>
<th>To Date</th>
<th>From Hour</th>
<th>From Minute</th>
<th>To Hour</th>
<th>To Minute</th>
<th>Quatum</th>
</tr>
          
          </thead>
          <tbody>
            {state.rows.map((item, idx) => (

            <tr id="addr0" key={idx}>
         
            
                <td>
               
	<TextField name="fromDate"

		value={item.fromDate}
    variant='outlined'
//  value={state.rows[idx].mobile}
                   onChange={handleChange(idx)}
  style={{width:90,height:35}}
	
		/> 
                </td>
              <td>

              <TextField name='toDate' style={{width:90,height:35}}
		value={item.toDate} 
     variant='outlined'
      // value={state.rows[idx].mobile}
       onChange={handleChange(idx)}
	/> 
            </td>
            
            <td> <Selected  
       value={item.tohr}
          onClick={handleChange(idx)}
           //  value={state.rows[idx].tohr}
             // onClick={(event)=>handleChange4(event)}
             variant='outlined'
                   style={{width:90,height:35}} name='fromHr'>

{Hour_TYPE.map((toHr) => (
               <MenuItem key={toHr} value={toHr}>
                 {toHr}
               </MenuItem>
             ))}


  </Selected></td>
  <td> <Selected
   value={item.frommin}
  // value={state.rows[idx].fromMin}
                onChange={handleChange(idx)} 
                variant='outlined'
                  style={{width:90,height:35}} name='fromMin' >

{Minute_TYPE.map((contractType) => (
               <MenuItem key={contractType} value={contractType}>
                 {contractType}
               </MenuItem>
             ))}


  </Selected></td>
  <td> <Selected
value={item.tohr} 
   //value={state.rows[idx].toHr}
                onChange={handleChange(idx)} 
                variant='outlined'
                  style={{width:90,height:35}}  name='toHr'>

{Hour_TYPE.map((contractType) => (
               <MenuItem key={contractType} value={contractType}>
                 {contractType}
               </MenuItem>
             ))}


  </Selected></td>
  <td> <Selected 
  
   value={item.tomin}
 onChange={handleChange(idx)}
//values= {client}
  // value={state.rows[idx].mobile}
  //                 onChange={handleChange(idx)}
  variant='outlined'
                   style={{width:90,height:35}}  name='toMin' >
                  
{Minute_TYPE.map((minuteType) => (
               <MenuItem key={minuteType} value={minuteType}>
                 {minuteType}
               </MenuItem>
             ))}


  </Selected></td>

  <td>
                 
                    <TextField
                    style={{width:90,height:35}}
                     onChange={handleChange(idx)}
               // onChange={(event)=>handleChange4(event)}
                       placeholder='Quantum'
                   value={item.quantum} 
                   name='quantum'
                   variant='outlined'
                  // value={item.quantum}
                    //value={state.rows[idx].name}
                    //onChange={handleChange(idx)}
                    // className="form-control"
                  />
                
                </td>

              <td>  <button
          onClick={handleAddRow}
          className="btn btn-default pull-left"
          style={{width:60,height:45,background:'blue',color:'white',fontSize:19}}  >
          +
        </button>
        </td>
      <td>  <button  style={{width:60,height:45,background:'red',color:'white',fontSize:19}}
          onClick={handleRemoveRow}
          className="pull-right btn btn-default"
        >
        -
        </button>
        </td>
            </tr> 
            ))}
          
        </tbody>
        </table>
       
      </div>
   
</div>

{/* <div> {showData()}</div> */}
{/* </Form> */}
      </Modal.Body>
      <Modal.Footer>
        <button
          type="button"
          onClick={onHide}
          className="btn btn-light btn-elevate"
        >
          Cancel
        </button>
        <> </>
        <button
          type="submit"
          onClick={() => handleCallAPI()}
          className="btn btn-primary btn-elevate"
        >
          Submit
        </button>
      </Modal.Footer>

     
    </>
  )}
</Formik> 
  </>
    )
  

}
// debugger;
    return (


      <>


<div >
  <div style={{display:'flex',flexDirection:'row',marginLeft:300}}>
			<input type="file" name="file" onChange={changeHandler} />
			<div>
				<button style={{background:'red',color:'white',fontSize:19}} onClick={handleSubmission}>Import</button>
			</div>
		

        <b  style={{color:'black',fontSize:19,marginLeft:60}}
                // onClick={this.handleRemoveRow}
                
              >
              Browser
              </b >
              </div>

              {data.length>0 ? (
        <div>{showData()}</div>
      ) : (
      
   <Formik
        enableReinitialize={true}
        initialValues={iom}
       
        // validationSchema={AgreementEditSchema}
        onSubmit={(values) => {
          saveIom(values);
    
        }}
      >
      
        {({ handleSubmit }) => (
          <>
            <Modal.Body className="overlay overlay-block cursor-default">
              {actionsLoading && (
                <div className="overlay-layer bg-transparent">
                  <div className="spinner spinner-lg spinner-success" />
                </div>
              )}
              {/* <Form className="form form-label-right"> */}
      <div>
    


        




        <div style={{margin:8,marginTop:10}}>
          
              <table
               
                id="tab_logic"
              >
                <thead>
                <tr>
    <th>From Date</th>
    <th>To Date</th>
    <th>From Hour</th>
    <th>From Minute</th>
    <th>To Hour</th>
    <th>To Minute</th>
    <th>Quatum</th>
  </tr>
                  {/* <tr>
                    <th className="text-center"> # </th>
                    <th className="text-center"> Name </th>
                    <th className="text-center"> Mobile </th>
                  </tr> */}
                </thead>
                <tbody>
                  {state.rows.map((item, idx) => (
  
                  <tr id="addr0" key={idx}>
               
                     {/* <td>{idx}</td> */}
                      <td>
                      {/* <input class="form-control" type="date" name='fromDate'  placeholder="dd-MM-yyyy" locate="br-pt" format="dd-MM-yyyy" >

                      </input> */}

                        <input type='date'
                          style={{width:90,height:35}} name='fromDate'id='begin'
                       // value={state.rows[idx].fromDate}
                        //   onChange={handleChange(idx)}
                     onChange={handleDate(idx)}
                          //className="form-control"
                        />
                      
                      </td>
                    <td>
                     <input type='date'
                      style={{width:90,height:35}} 
                  name="toDate"
              id='begin'
                         // value={state.rows[idx].toDate}
                          onChange={handleDate(idx)}
                        // className="form-control"
                      />
                  </td>
                  <td> <select value={state.rows[idx].fromHr}
                        onChange={handleChange(idx)} style={{width:90,height:35}}name='fromHr'>
      
      {Hour_TYPE.map((contractType) => (
                     <option key={contractType} value={contractType}>
                       {contractType}
                     </option>
                   ))}
  
  
        </select></td>
        <td> <select value={state.rows[idx].fromMin}
                        onChange={handleChange(idx)} style={{width:90,height:35}} name='fromMin'>
      
      {Minute_TYPE.map((contractType) => (
                     <option key={contractType} value={contractType}>
                       {contractType}
                     </option>
                   ))}
  
  
        </select></td>
        <td> <select value={state.rows[idx].toHr}
                        onChange={handleChange(idx)} style={{width:90,height:35}} name='toHr' >
      
      {Hour_TYPE.map((contractType) => (
                     <option key={contractType} value={contractType}>
                       {contractType}
                     </option>
                   ))}
  
  
        </select></td>
        <td> <select 
        value={state.rows[idx].toMin}
                        onChange={handleChange(idx)} style={{width:90,height:35}}  name='toMin' >
      
      {Minute_TYPE.map((minuteType) => (
                     <option key={minuteType} value={minuteType}>
                       {minuteType}
                     </option>
                   ))}
  
  
        </select></td>

        <td>
                        <input
                          style={{width:90,height:35}} type="text"name='quantum'placeholder='Quantum'
                          value={state.rows[idx].quantum}
                          onChange={handleChange(idx)}
                          // className="form-control"
                        />
                      </td>

                    <td>  <button
                onClick={handleAddRow}
                className="btn btn-default pull-left"
                style={{width:60,height:45,background:'blue',color:'white',fontSize:19}}  >
                +
              </button>
              </td>
            <td>  <button  style={{width:60,height:45,background:'red',color:'white',fontSize:19}}
                onClick={handleRemoveRow}
                className="pull-right btn btn-default"
              >
              -
              </button>
              </td>
                  </tr> 
                  ))}
                
              </tbody>
              </table>
             
            </div>
         
      </div>

{/* <div> {showData()}</div> */}
      {/* </Form> */}
            </Modal.Body>
            <Modal.Footer>
              <button
                type="button"
                onClick={onHide}
                className="btn btn-light btn-elevate"
              >
                Cancel
              </button>
              <> </>
              <button
                type="submit"
                onClick={() => handleCallAPI()}
                className="btn btn-primary btn-elevate"
              >
                Submit
              </button>
            </Modal.Footer>

           
          </>
        )}
      </Formik>
     

      )}
      </div>
     
    </>

    );
  // }
}
