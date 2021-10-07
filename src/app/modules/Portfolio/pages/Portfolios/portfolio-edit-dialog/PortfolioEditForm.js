// Form is based on Formik
// Data validation is based on Yup
// Please, be familiar with article first:
// https://hackernoon.com/react-form-validation-with-formik-and-yup-8b76bda62e10
import React,  { Component, useState } from "react";
import { Modal } from "react-bootstrap";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import {
  Input,
  Select,
  DatePickerField,
} from "../../../../../../_metronic/_partials/controls";
import {
  AVAILABLE_PORTFOLIOTYPES,AVAILABLE_POINT_PER, AVAILABLE_POINT_OF_CONNECTION
  
}  from "../PortfoliosUIHelpers";
import States from "../../../../utils/States";
import Discoms from "../../../../utils/Discoms";
import Company from "../../../../utils/Company";
//import Region from "../../../../utils/Region";
// Validation schema
const PortfolioEditSchema = Yup.object().shape({
  portfolioName: Yup.string()
    .min(3, "Minimum 3 symbols")
    .max(50, "Maximum 50 symbols")
    .required("Portfolio Name is required"),
    portfolioId: Yup.string()
    .min(3, "Minimum 3 symbols")
    .max(50, "Maximum 50 symbols")
    .required("Portfolio Id is required"),



    shortName: Yup.string()
    .min(3, "Minimum 3 symbols")
    .max(50, "Maximum 50 symbols")
    .required("Short Name is required"),


    // regionName: Yup.string()
    // .min(3, "Minimum 3 symbols")
    // .max(50, "Maximum 50 symbols")
    // .required("Region Name is required"),



    operationContactName: Yup.string()
    .min(3, "Minimum 3 symbols")
    .max(50, "Maximum 50 symbols")
    .required("operationContactName is required"),
    operationContact: Yup.string()
    .min(3, "Minimum 3 symbols")
    .max(50, "Maximum 50 symbols")
    .required("operationContact is required"),

  operationEmail: Yup.string()
    .email("Invalid email")
    .required("Email is required"),
    billingEmail: Yup.string()
    .email("Invalid email")
    .required("Email is required"),

    billingContact: Yup.string()
    .min(3, "Minimum 3 symbols")
    .max(50, "Maximum 50 symbols")
    .required("operationContact is required"),

    billingFax: Yup.string()
    .min(3, "Minimum 3 symbols")
    .max(50, "Maximum 50 symbols")
    .required("Billing Fax is required"),
    panNo: Yup.string()
    .min(3, "Minimum 3 symbols")
    .max(50, "Maximum 50 symbols")
    .required("Pan No. is required"),

  tanNo: Yup.string()
    .min(3, "Minimum 3 symbols")
    .max(50, "Maximum 50 symbols")
    .required("Tan No. is required"),
    accountName: Yup.string()
    .min(3, "Minimum 3 symbols")
    .max(50, "Maximum 50 symbols")
    .required("Account Name is required"),

    accountNo: Yup.string()
    .min(3, "Minimum 3 symbols")
    .max(50, "Maximum 50 symbols")
    .required("Account No is required"),
    bankName: Yup.string()
    .min(3, "Minimum 3 symbols")
    .max(50, "Maximum 50 symbols")
    .required("Bank Name is required"),
    bankIFSC: Yup.string()
    .min(3, "Minimum 3 symbols")
    .max(50, "Maximum 50 symbols")
    .required("Bank IFSC is required"),


    billingMobile: Yup.number()
    .typeError("That doesn't look like a phone number")
    .positive("A phone number can't start with a minus")
    .integer("A phone number can't include a decimal point")
    .min(8)
    .required('A Operation phone number is required'),
    operationMobile: Yup.number()
    .typeError("That doesn't look like a phone number")
    .positive("A phone number can't start with a minus")
    .integer("A phone number can't include a decimal point")
    .min(8)
    .required('A Operation phone number is required'),

   address : Yup.string().required("Address is required"),

    operationAddress: Yup.string().required("Address is required"),


    operationFax: Yup.string().required("operation Fax is required"),

    billingContactName: Yup.string()
    .min(3, "Minimum 3 symbols")
    .max(50, "Maximum 50 symbols")
    .required("Billing Contact Name is required"),


  address: Yup.string().required("Address is required"),
  joiningDate: Yup.mixed()
    .nullable(false)
    .required("Joining date is required"),
  /* ipAddress: Yup.string().required("IP Address is required"), */
});


export function PortfolioEditForm({
  savePortfolio,
  getRegionForState,
  getDiscomForState,
  portfolio,
  actionsLoading,
  onHide,
}) {
  const state = {
    region: "NR",
    discom:""
  }
  const [region,setRegion] = useState();
  const [discom,setDiscom] = useState();
  const getRegion = (e)=>{
  console.log(' data '+e.target.value);
  var stateid=e.target.value;
  var sd=getRegionForState(stateid,setRegion);
   setRegion('');
   var index = e.nativeEvent.target.selectedIndex;
   var dstateid= e.nativeEvent.target[index].text;
  
   getDiscomForState(dstateid,setDiscom);
  setDiscom('');
  }
  
  const getDiscom = (e)=>{
  console.log('discom data '+e.target);
  var dstateid=e.target.value;
  var index = e.nativeEvent.target.selectedIndex;
  dstateid= e.nativeEvent.target[index].text;
  alert(dstateid)
  var sd=getDiscomForState(dstateid,setDiscom);
  setDiscom('');
  } 
  return (
    <>
      <Formik
        enableReinitialize={true}
        initialValues={portfolio}
        validationSchema={PortfolioEditSchema}
        onSubmit={(values) => {
          savePortfolio(values);
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
                 {/* First Name */}
                 <div className="col-lg-4">
                    <Field
                      name="portfolioId"
                      component={Input}
                      placeholder="Portfolio Id"
                      label="Portfolio Id"
                    />
                  </div>
                  {/* User Id */}
                  <div className="col-lg-4">
                    <Field
                      name="portfolioName"
                      component={Input}
                      placeholder="Portfolio Name"
                      label="Portfolio Name"
                    />
                  </div>
                  
                  {/* First Name */}
                  <div className="col-lg-4">
                    <Company/>
                  </div>
                  {/* Last Name */}
                  <div className="col-lg-4">
                    <Field
                      name="address"
                      component={Input}
                      placeholder="Address"
                      label="Address"
                    />
                  </div>
                  <div className="col-lg-4">
                    <Field
                      name="shortName"
                      component={Input}
                      placeholder="Short Name"
                      label="Short Name"
                    />
                  </div> 
                  <div className="col-lg-4">
               
                 
               <States getRegion={getRegion}/>
             
                  
                 </div> 
                </div>
                {/* Email */}
                <div className="form-group row">
                <div className="col-lg-4">
                <Select name="regionName" label="Region"  >
                 {/* 
                  {AVAILABLE_PORTFOLIOTYPES.map((regionName) => (
                      <option key={regionName} value={regionName}>
                        {regionName}
                      </option>
                    ))}  */}
                 <option key={region} value={region}>
                        {region}
                      </option>
              
                  </Select>
                  
                  </div>
                  <div className="col-lg-4">
                <Select name="pointOfConnection" label="Point Of Connection(KV)">
                 
                    {AVAILABLE_POINT_OF_CONNECTION.map((pointOfConnection) => (
                      <option key={pointOfConnection} value={pointOfConnection}>
                        {pointOfConnection}
                      </option>
                    ))}
                  </Select>
                  
                  </div>
                  <div className="col-lg-4">
                <Select name="perConnection" label="Connection Point/Per">
                 
                    {AVAILABLE_POINT_PER.map((perConnection) => (
                      <option key={perConnection} value={perConnection}>
                        {perConnection}
                      </option>
                    ))}
                  </Select>
                  
                  </div>
                  <div className="col-lg-4">
                <Select name="portfolioType" label="Portfolio Type">
                 
                    {AVAILABLE_PORTFOLIOTYPES.map((portfolioType) => (
                      <option key={portfolioType} value={portfolioType}>
                        {portfolioType}
                      </option>
                    ))}
                  </Select>
                  
                  </div>
                  {/* First Name */}
                  <div className="col-lg-4">
                <Select name="discomName" label="Discom"  >
              
               <option key={discom} value={discom}>
                        {discom}
                      </option> 
              
                  </Select>
                  
                  </div>
                 
                  {/* Date of birth */}
                  <div className="col-lg-4">
                    <DatePickerField
                      name="joiningDate"
                      label="Joining Date"
                    
                    />
                  </div>
                  </div>
                
{/*Operation detail*/}
<div className="form-group row">
<div className="col-lg-4">
<Field
                      name="operationContactName"
                      component={Input}
                      placeholder="Operation Contact Name"
                      label="Operation Contact Name"
                    />
                  
                  </div>
               
                  <div className="col-lg-4">
                  <Field
                      name="operationAddress"
                      component={Input}
                      placeholder="Operation Address"
                      label="Operation Address"
                    />
                  
                  </div>
                  {/* Date of birth */}
                  <div className="col-lg-4">
                  <Field
                      name="operationMobile"
                      component={Input}
                      placeholder="Operation Mobile"
                      label="Operation Mobile"
                    />
                  
                  </div>
                  </div>

                  <div className="form-group row">
<div className="col-lg-4">
<Field
                      name="operationContact"
                      component={Input}
                      placeholder="Operation Contact No"
                      label="Operation Contact No"
                    />
                  
                  </div>
               
                  <div className="col-lg-4">
                  <Field
                      type="email"
                      name="operationEmail"
                      component={Input}
                      placeholder="Operation Email"
                      label="Operation Email"
                    />
                  
                  </div>
                  {/* Date of birth */}
                  <div className="col-lg-4">
                  <Field
                      name="operationFax"
                      component={Input}
                      placeholder="Operation Fax No"
                      label="Operation Fax No"
                    />
                  
                  </div>
                  </div>

{/*billing Detail*/}

                  <div className="form-group row">
<div className="col-lg-4">
<Field
                      name="billingContactName"
                      component={Input}
                      placeholder="Billing Contact Name"
                      label="Billing Contact Name"
                    />
                  
                  </div>
               
                  <div className="col-lg-4">
                  <Field
                      name="address"
                      component={Input}
                      placeholder="Billing Address"
                      label="Billing Address"
                    />
                  
                  </div>
                  {/* Date of birth */}
                  <div className="col-lg-4">
                  <Field
                      name="billingMobile"
                      component={Input}
                      placeholder="Billing Mobile"
                      label="Billing Mobile"
                    />
                  
                  </div>
                  </div>

                  <div className="form-group row">
<div className="col-lg-4">
<Field
                      name="billingContact"
                      component={Input}
                      placeholder="Billing Contact No"
                      label="Billing Contact No"
                    />
                  
                  </div>
               
                  <div className="col-lg-4">
                  <Field
                      type="email"
                      name="billingEmail"
                      component={Input}
                      placeholder="Billing Email"
                      label="Billing Email"
                    />
                  
                  </div>
                  {/* Date of birth */}
                  <div className="col-lg-4">
                  <Field
                      name="billingFax"
                      component={Input}
                      placeholder="Billing Fax No"
                      label="Billing Fax No"
                    />
                  
                  </div>
                  </div>



                  <div className="form-group row">
<div className="col-lg-4">
<Field
                      name="panNo"
                      component={Input}
                      placeholder="PAN NO"
                      label="PAN NO"
                    />
                  
                  </div>
               
                  <div className="col-lg-4">
                  <Field
                      name="tanNo"
                      component={Input}
                      placeholder="TAN NO"
                      label="TAN NO"
                    />
                  
                  </div>
                  {/* Date of birth */}
                  <div className="col-lg-4">
                  <Field
                      name="accountName"
                      component={Input}
                      placeholder="Account Name"
                      label="Account Name"
                    />
                  
                  </div>
                  </div>

                  <div className="form-group row">
<div className="col-lg-4">
<Field
                      name="accountNo"
                      component={Input}
                      placeholder="accountNo"
                      label="accountNo"
                    />
                  
                  </div>
               
                  <div className="col-lg-4">
                  <Field
                      name="bankName"
                      component={Input}
                      placeholder="Bank Name"
                      label="Bank Name"
                    />
                  
                  </div>
                  {/* Date of birth */}
                  <div className="col-lg-4">
                  <Field
                      name="bankIFSC"
                      component={Input}
                      placeholder="Bank IFSC"
                      label="Bank IFSC"
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
