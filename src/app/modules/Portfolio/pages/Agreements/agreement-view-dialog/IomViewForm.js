import React,{ Component, useState } from "react";
import { Modal } from "react-bootstrap";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { useEffect } from "react";
import {
  Input,
Select,
  DatePickerField,
} from "../../../../../../_metronic/_partials/controls";




import {
  Minute_Type,Hour_TYPE,REGIONTYPE,CONTRACT_TYPE,BILLING_HEAD,DELIVERY_POINT,PROVISIONAL_BILLING_CYCLE,BILLING_SOURCE, Minute_TYPE
  
}  from "../IomsUIHelpers";





export function IomViewForm   ({
  saveIom,
  getRegionForState,
  iom,
  actionsLoading,
  onHide,
})
{

  const [state,setState]=useState({rows:[0]})
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
    setState({
      rows
    });
  };
  const handleAddRow = () => {
    const item = {
      fromDate: "",
      toDate: "",
      fromHour:"",
      fromMinute:"",
      toHour:"",
      toMinute:"",
    };
  setState({
      rows: [...state.rows, item]
    });
  };
  const handleRemoveRow = () => {
  setState({
      rows: state.rows.slice(0, -1)
    });
  };
  // render() {
    
    return (


      <>
   

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


        <div style={{marginLeft:200,display:'flex',flexDirection:'row'
  

}}>


    <div
              style={{
                display: "flex",
                // flexdirection: "center",
                // justifyContent: "center",
                // aliagnItems: "center",
                fontSize: '18px',
    border: '1px solid red',width:400

              }}
            >
              <input
                accept="image/*"
              style={{display:'none',width:400}}
                id="icon-button-item"
                type="file"
                // onChange={(event) =>
                //   setImage({
                //     bytes: event.target.files[0],
                //     file: URL.createObjectURL(event.target.files[0]),
                //   })
                // }
              />

              <label htmlFor="icon-button-item"style={{marginTop:10,marginLeft:7,width:400}}>Upload Excel File
               </label>
            </div>


{/* <input style={{display:'none'}} type="file"> */}
          
        {/* </input> */}
        <button  style={{width:300,height:50,background:'#fffa65',color:'black',fontSize:19}}
                // onClick={this.handleRemoveRow}
                className="pull-right btn btn-default"
              >
              Browser
              </button>
          
              </div>
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
                        <input
                          style={{width:90,height:35}} type="date"name='fromDate'id='fromDate' placeholdertext='fromDate'
                          value={state.rows[idx].name}
                          onChange={handleChange(idx)}
                          // className="form-control"
                        />
                      </td>
                    <td>
                     <input
                      style={{width:90,height:35}} type="date"name="toDate"id='toDate' placeholdertext='fromDate'
                          value={state.rows[idx].mobile}
                        onChange={handleChange(idx)}
                        // className="form-control"
                      />
                  </td>
                  <td> <select value={state.rows[idx].mobile}
                        onChange={handleChange(idx)} style={{width:90,height:35}}id='fromHour' type="date"name='fromHour' placeholdertext='fromDate'>
      
      {Hour_TYPE.map((contractType) => (
                     <option key={contractType} value={contractType}>
                       {contractType}
                     </option>
                   ))}
  
  
        </select></td>
        <td> <select value={state.rows[idx].mobile}
                        onChange={handleChange(idx)} style={{width:90,height:35}} id='fromMinute' type="date"name='fromMinute' placeholdertext='fromDate'>
      
      {Minute_TYPE.map((contractType) => (
                     <option key={contractType} value={contractType}>
                       {contractType}
                     </option>
                   ))}
  
  
        </select></td>
        <td> <select value={state.rows[idx].mobile}
                        onChange={handleChange(idx)} style={{width:90,height:35}} type="text"id='toHour' name='toHour' placeholdertext='fromDate'>
      
      {Hour_TYPE.map((contractType) => (
                     <option key={contractType} value={contractType}>
                       {contractType}
                     </option>
                   ))}
  
  
        </select></td>
        <td> <select value={state.rows[idx].mobile}
                        onChange={handleChange(idx)} style={{width:90,height:35}} type="text"id='toMinute' name='toMinute' placeholdertext='fromDate'>
      
      {Minute_TYPE.map((minuteType) => (
                     <option key={minuteType} value={minuteType}>
                       {minuteType}
                     </option>
                   ))}
  
  
        </select></td>

        <td>
                        <input
                          style={{width:90,height:35}} type="Qunmtum"name='quantum'id='quantum' placeholder='Quantum'
                          value={state.rows[idx].name}
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
                onClick={() => handleSubmit()}
                className="btn btn-primary btn-elevate"
              >
                Submit
              </button>
            </Modal.Footer>
          </>
        )}
      </Formik>
    </>

    );
  // }
}



