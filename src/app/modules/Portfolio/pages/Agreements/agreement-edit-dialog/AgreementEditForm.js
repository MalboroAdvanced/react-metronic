// Form is based on Formik
// Data validation is based on Yup
// Please, be familiar with article first:
// https://hackernoon.com/react-form-validation-with-formik-and-yup-8b76bda62e10
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



import { useTheme } from "@material-ui/core";
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
 import Sele from '@material-ui/core/Select'
import * as actions from "../../../_redux/agreements/agreementsActions";
import Selected from "@material-ui/core/Select"
import {
  TRANSACTION_TYPE,REGIONTYPE,CONTRACT_TYPE,BILLING_HEAD,DELIVERY_POINT,PROVISIONAL_BILLING_CYCLE,BILLING_SOURCE
  
}  from "../AgreementsUIHelpers";
import axios from "axios";
import States from "../../../../utils/States";
import Portfolios from "../../../../utils/Portfolios";
import { setDefaultLocale } from "react-datepicker";
import { useDispatch } from "react-redux";
export const STATE_URL = `${process.env.REACT_APP_ADMIN_API_URL}/api/getPortfolioDataListJson`;
//import Region from "../../../../utils/Region";
// Validation schema





const ITEM_HEIGHT = 108;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

// const names = [
//   'Oliver Hansen',
//   'Van Henry',
//   'April Tucker',
//   'Ralph Hubbard',
//   'Omar Alexander',
//   'Carlos Abbott',
//   'Miriam Wagner',
//   'Bradley Wilkerson',
//   'Virginia Andrews',
//   'Kelly Snyder',
// ];

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}


const AgreementEditSchema = Yup.object().shape({

 rebate: Yup.string()
    .min(1, "Minimum 1 symbols")
    .max(50, "Maximum 50 symbols")
    .required("Rebate Name is required"),

    approvalNo: Yup.string()
    .min(1, "Minimum 1 symbols")
    .max(50, "Maximum 50 symbols")
    .required("Approval No is required"),
 

    tarrifAtDeliveryPoint: Yup.string()
    .min(1, "Minimum 1 symbols")
    .max(50, "Maximum 50 symbols")
    .required("  tarrifAtDeliveryPoint is required"),




  margin: Yup.string()
    .min(1, "Minimum 1 symbols")
    .max(50, "Maximum 50 symbols")
    .required("  Margin is required"),

    applicationNo: Yup.string()
    .min(1, "Minimum 1 symbols")
    .max(50, "Maximum 50 symbols")
    .required(" Application Number is required"),
 
 
    compensationPercent: Yup.string()
    .min(1, "Minimum 1 symbols")
    .max(50, "Maximum 50 symbols")
    .required("Compensation Percent is required"),
 
    compensationRate: Yup.string()
    .min(1, "Minimum 1 symbols")
    .max(50, "Maximum 50 symbols")
    .required(" Compensation Rate is required"),
 




  endDate: Yup.mixed()
    .nullable(false)
    .required("To date is required"),



   




    stratDate: Yup.mixed()
    .nullable(false)
    .required("From date is required"),
    dueDate: Yup.mixed()
    .nullable(false)
    .required("End date is required"),
  // /* ipAddress: Yup.string().required("IP Address is required"), */


 });


export function AgreementEditForm({
  saveAgreement,
  getRegionForState,
  agreement,
  actionsLoading,
  onHide,
}) {
const [result,setResult]=useState([])


const theme = useTheme();
const [personName, setPersonName] = React.useState([]);

const handleChange = (event) => {
  const {
    target: { value },
  } = event;
console.log(value)
if(value=="Clear All")
{setPersonName("")
  alert(value)
}



else{
  setPersonName(
    // On autofill we get a the stringified value.
    typeof value === 'string' ? value.split(',') : value,
  );
}
};
// const handledelete=()=>{
//   setPersonName(false)
// }
const [refresh,setRefresh]=useState(false)


var dispatch=useDispatch()
const handleclick=(event)=>{

  setResult(event.target.value)


}



  useEffect(function () {
  
      fill();
 
  }, []);

  
 
  // console.log("higuru",data)
  const fill = () => {
    return (<>
    <Portfolios />
    
    </>)
    
  };

  const state = {
    region: "NR"
  }
  const [region,setRegion] = useState();
  const getRegion = (e)=>{
  // console.log(' data '+e.target.value);
  var stateid=e.target.value;
  var sd=getRegionForState(stateid,setRegion);
   setRegion('');
  }
 
  
  return (
    <>
   

   <Formik
        enableReinitialize={true}
        initialValues={agreement}
       
        validationSchema={AgreementEditSchema}
        onSubmit={(values) => {
          saveAgreement(values);
    
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
              <Form className="form form-label-right">


        
              <div className="form-group row">
                 {/* Start Date */}
                 <div className="col-lg-4">
                    <DatePickerField

                      name="stratDate"
                      label="Start Date"
                  
                    />
                  </div>
                  <div className="col-lg-4">
                    <DatePickerField
                      name="endDate"
                      label="End Date"
                    
                    />
                  </div>
                  </div>
                  <div className="form-group row">
                  <div className="col-lg-4">
                  <Select name="sellerportfolio" label="Seller Portfolio" id="sellerportfolio">
                  <option>-Select-</option>
               
{fill()}

   {/* <Portfolios />  */}
                  </Select>
                  </div>
             
                  <div className="col-lg-4">
                  <Select name="buyerportfolio" label="Buyer Portfolio" id="buyerportfolio">
                  <option>-Select-</option>
                  {fill()}
                 {/* <Portfolios/> */}
                </Select>
                  </div>
                  </div>

                  <div className="form-group row">
                  <div className="col-lg-4">
                    <Field
                      name="applicationNo"
                      component={Input}
                      placeholder="Application No"
                      label="Application No"
                    />
                  </div>
                  <div className="col-lg-4">
                    <Field
                      name="approvalNo"
                      component={Input}
                      placeholder="Approval No."
                      label="Approval No. (for STOA)/MTOA No./LTA No.*"
                    />
                  </div>
                  </div>


                  <div className="form-group row">
                  <div className="col-lg-4">
                <Select name="contractType" label="Applied In">
                 {CONTRACT_TYPE.map((contractType) => (
                   <option key={contractType} value={contractType}>
                     {contractType}
                   </option>
                 ))}
               </Select>
                  </div>
                  <div className="col-lg-4">
                  <Select name="transactionType" label="Transaction Type*">
                 {TRANSACTION_TYPE.map((transactionType) => (
                   <option key={transactionType} value={transactionType}>
                     {transactionType}
                   </option>
                 ))}
               </Select>
                  </div>
                  </div>


                  <div className="form-group row">
                  
                  <div className="col-lg-4">
                    <Field
                      name="loiUniqueNo"
                      component={Input}
                      placeholder="LOI/Unique No. (for STOA only)"
                      label="LOI/Unique No. (for STOA only)*"
                    />
                  </div>
                  </div>



    {/* Route */}
                  <div className="form-group row">
                  <div className="col-lg-4">
                  <Select name="firstRoute" label="">
                 
                 {REGIONTYPE.map((pointOfConnection) => (
                   <option key={pointOfConnection} value={pointOfConnection}>
                     {pointOfConnection}
                   </option>
                 ))}
               </Select>
                  </div>
                  <div className="col-lg-4">
                  <Select name="secondRoute" label="">
                 
                 {REGIONTYPE.map((pointOfConnection) => (
                   <option key={pointOfConnection} value={pointOfConnection}>
                     {pointOfConnection}
                   </option>
                 ))}
               </Select>
                  </div>
                  <div className="col-lg-4">
                  <Select name="thirdRoute" label="">
                 
                 {REGIONTYPE.map((pointOfConnection) => (
                   <option key={pointOfConnection} value={pointOfConnection}>
                     {pointOfConnection}
                   </option>
                 ))}
               </Select>
                  </div>
                  </div>


                  {/* User Id */}
                  <div className="form-group row">
                 {/*  <div className="col-lg-4">
                    <Field
                      name="approvedQty"
                      component={Input}
                      placeholder="Qty. Approved"
                      label="Qty. Approved (MW) @ Reg. Per. (for STOA)/@ Inj. Pt. (For MTOA/LTA)*"
                    />
                  </div> */}
                  
                  {/* SLDC */}
                  <div className="col-lg-4">
                    <States/>
                  </div>
                  {/* Last Name */}
                  <div className="col-lg-4">
                  <Select name="bullingHead" label="Billing Head*">
                 
                 {BILLING_HEAD.map((bullingHead) => (
                   <option key={bullingHead} value={bullingHead}>
                     {bullingHead}
                   </option>
                 ))}
               </Select>
                  </div>
                 {/*  <div className="col-lg-4">
                  <Select name="alternateArrangement" label="Alternate arrangement*">
                 
                 {BILLING_HEAD.map((bullingHead) => (
                   <option key={bullingHead} value={bullingHead}>
                     {bullingHead}
                   </option>
                 ))}
               </Select>
                  </div> */}
                  
                  <div className="col-lg-4">
               
                 
               <States getRegion={getRegion}/>
            
                 </div> 
                </div>
                {/* Email */}
                <div className="form-group row">
                <div className="col-lg-4">
                <Select name="deliveryPoint" label="Delivery Point*">
                 
                 {DELIVERY_POINT.map((deliveryPoint) => (
                   <option key={deliveryPoint} value={deliveryPoint}>
                     {deliveryPoint}
                   </option>
                 ))}
               </Select>
                  
                  </div>
                  <div className="col-lg-4">
                  <Field
                      name="tarrifAtDeliveryPoint"
                      component={Input}
                      placeholder="Tariff at Delivery point (Rs./kWh)"
                      label="Tariff at Delivery point (Rs./kWh)"
                    />
                  
                  </div>
                 
               
                 
                  </div>
                
{/*Operation detail*/}
<div className="form-group row">

                  <div className="col-lg-4">

         <b>Provisional Billing Cycle</b>   
      <FormControl sx={{ m: 1, width: 300 }} style={{width:230,marginTop:0}}>
        <InputLabel id="demo-multiple-name-label">-Select_</InputLabel>
        <Sele
          labelId="demo-multiple-name-label"
          id="demo-multiple-name"
          multiple
        
          value={personName}
          onChange={handleChange}
          input={<OutlinedInput label="Provission Billing Cycle" />}
          MenuProps={MenuProps}
        >
          {PROVISIONAL_BILLING_CYCLE.map((name) => (
            <MenuItem
              key={name}
              value={name}
              style={getStyles(name, personName, theme)}
            >
              {name}
            </MenuItem>
         
          ))}
         
        </Sele>

  
      </FormControl>
    
{/* 
                  <Field
                      name="provisionalBillingCycle"
                      component={Input}
                      value={result}
                      // placeholder="Select Provisional Billing Cycle Result"
                      label="Select Provisional Billing Cycle Result"
                    /> */}
</div>


<div className="col-lg-4">
                  <Field
                  component={Input}
                  id="provisionbillingcycle"
                      name="provisionbillingcycle"
                      label="Billing Cycle Select Value"
                      value={personName}
                      
                    />
                  
                  </div>


                  <div className="col-lg-4">
                  <DatePickerField
                      name="dueDate"
                      label="Due Date"
                    
                    />
                  
                  </div>
                  </div>
                  <div className="form-group row">
                    <div className="col-lg-4">

                   <Select name="finalBillingCycle" label="Final Billing Cycle">
                 
                 {PROVISIONAL_BILLING_CYCLE.map((finalBillingCycle) => (
                   <option key={finalBillingCycle} value={finalBillingCycle}>
                     {finalBillingCycle}
                   </option>
                 ))}
               </Select>
                  </div>
               
                  <div className="col-lg-4">
                  <Field
                      name="margin"
                      component={Input}
                      placeholder="PTC Margin (Rs,/kWh)"
                      label="PTC Margin (Rs,/kWh)"
                    />
                  </div>
                  </div>

{/*next row*/}

<div className="form-group row">
<div className="col-lg-4">
                  <Field
                      name="rebate"
                      component={Input}
                      placeholder="Rebate (%)"
                      label="Rebate (%)"
                    />
                  </div>
                    <div className="col-lg-4">

                   <Select name="billingSource" label="Billing Source">
                 
                 {BILLING_SOURCE.map((billingSource) => (
                   <option key={billingSource} value={billingSource}>
                     {billingSource}
                   </option>
                 ))}
               </Select>
                  </div>
               
                 
                  </div>

                  <div className="form-group row">
<div className="col-lg-4">
<Field
                      name="compensationRate"
                      component={Input}
                      placeholder="Compensation Rate (Rs./kWh)"
                      label="Compensation Rate (Rs./kWh)"
                    />
                  
                  </div>
               
                 
                  {/* Date of birth */}
                  <div className="col-lg-4">
                  <Field
                      name="compensationPercent"
                      component={Input}
                      placeholder="Compensation %"
                      label="Compensation %"
                    />
                  
                  </div>
                  </div>

{/*billing Detail*/}

                  <div className="form-group row">
{/* <div className="col-lg-4">
<Field
                      name="PPA/PSA Document"
                      component={Input}
                      placeholder="PPA/PSA Document"
                      label="PPA/PSA Document"
                    />
                  
                  </div> */}
               
                  <div className="col-lg-4">
                  <Field
                      name="surcharge"
                      component={Input}
                      placeholder="Surcharge %"
                      label="Surcharge %"
                    />
                  
                  </div>
                 
                  </div>

              </Form>
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
                Save
              </button>
            </Modal.Footer>
          </>
        )}
      </Formik>
    </>
  );
}
