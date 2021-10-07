// Form is based on Formik
// Data validation is based on Yup
// Please, be familiar with article first:
// https://hackernoon.com/react-form-validation-with-formik-and-yup-8b76bda62e10
import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import {
  Input,
  Select,
  DatePickerField,
} from "../../../../../../_metronic/_partials/controls";
import { CONTRACT_TYPE } from "../IomsUIHelpers";
import createIom from "../../../_redux/ioms/iomsActions"
import Portfolios from "../../../../utils/Portfolios";
import { portfoliosSlice } from "../../../_redux/portfolios/portfoliosSlice";

// Validation schema
const IomEditSchema = Yup.object().shape({
  iomNumber: Yup.string()
  .min(3, "Minimum 3 symbols")
  .max(50, "Maximum 50 symbols")
  .required("Iom Number is required"),
sellerPortfolio: Yup.string()
 
  .required("Iom Seller is required"),
buyerPortfolio: Yup.string()

  .required("buyer Portfolio is required"),
contractType: Yup.string().required("Contract Type is required"),

toDate: Yup.mixed()
  .nullable(false)
  .required("To date is required"),

  fromDate: Yup.mixed()
  .nullable(false)
  .required("From date is required"),
  quantum: Yup.mixed()
  
  .required("Quantum  date is required"),
/* ipAddress: Yup.string().required("IP Address is required"), */
});

export function IomEditForm({
  saveIom,
  iom,
  actionsLoading,
  onHide,
}) {






 
  return (
    <>
      <Formik
        enableReinitialize={true}
        initialValues={iom}
        validationSchema={IomEditSchema}
        onSubmit={(values) => {
          saveIom(values);

        }}
      >
        {({handleSubmit  }) => (
          <>
            <Modal.Body className="overlay overlay-block cursor-default">
              {actionsLoading && (
               
                <div className="overlay-layer bg-transparent">
                  <div className="spinner spinner-lg spinner-success" />
                </div>
                
              )}
              <Form className="form form-label-right">
              <div className="form-group row">
                  {/* User Id */}
                  <div className="col-lg-4">
                  <Field
                      name="iomNumber"
                      component={Input}
                      placeholder="Iom Number"
                      label="Iom Number"
                    />
                  </div>
                  
                  {/* First Name */}
                
                  {/* Last Name */}
                  {/* <div className="form-group row"> */}
                  <div className="col-lg-4">
                  <Select   name="sellerPortfolio" label="Seller Portfolio" id="sellerPortfolio">

               
                  <Portfolios />

   {/* <Portfolios />  */}
                  </Select>
                  </div>
             
                  <div className="col-lg-4">
                  <Select   name="buyerPortfolio" label="Buyer Portfolio" id="buyerPortfolio">
                  <Portfolios />
                 {/* <Portfolios/> */}
                </Select>
                  {/* </div> */}
                  </div>
                  </div>
                  {/* Login */}
                  <div className="form-group row">
                  <div className="col-lg-4">
                    <DatePickerField
                      name="fromDate"
                      label="From Date"
                     
                    />
                  </div>
           
                {/* Email */}
              
                <div className="col-lg-4">
                    <DatePickerField
                      name="toDate"
                      label="To Date"
                
                    />
                  </div>
                  </div>
                  <div className="form-group row">
                  <div className="col-lg-4">
                    <Field
                      
                      name="quantum"
                      component={Input}
                      placeholder="Quantum(MW)"
                      label="Quantum(MW)"
             
                    />
                  </div>
                  {/* Date of birth */}
                  <div className="col-lg-4">
                <Select name="contractType" label="Applied In">
                 {CONTRACT_TYPE.map((contractType) => (
                   <option key={contractType} value={contractType}>
                     {contractType}
                   </option>
                 ))}
               </Select>
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
