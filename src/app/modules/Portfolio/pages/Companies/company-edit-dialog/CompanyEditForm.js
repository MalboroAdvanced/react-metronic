// Form is based on Formik
// Data validation is based on Yup
// Please, be familiar with article first:
// https://hackernoon.com/react-form-validation-with-formik-and-yup-8b76bda62e10
import React from "react";
import { Modal } from "react-bootstrap";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import {
  Input,
  Select,
  DatePickerField,
} from "../../../../../../_metronic/_partials/controls";

// Validation schema
const CompanyEditSchema = Yup.object().shape({
  companyName: Yup.string()
    .min(3, "Minimum 3 symbols")
    .max(50, "Maximum 50 symbols")
    .required("companyName is required"),
  companyHO: Yup.string()
    .min(3, "Minimum 3 symbols")
    .max(50, "Maximum 50 symbols")
    .required("companyHO is required"),
  emailid: Yup.string()
    .email("Invalid email")
    .required("Email is required"),

    phoneno: Yup.number()
  .typeError("That doesn't look like a phone number")
  .positive("A phone number can't start with a minus")
  .integer("A phone number can't include a decimal point")
  .min(8)
  .required('A phone number is required'),

  companyAddress: Yup.string().required("Address is required"),
  joiningDate: Yup.mixed()
    .nullable(false)
    .required("Joining date is required"),
  /* ipAddress: Yup.string().required("IP Address is required"), */
});

export function CompanyEditForm({
  saveCompany,
  company,
  actionsLoading,
  onHide,
}) {
  return (
    <>
      <Formik
        enableReinitialize={true}
        initialValues={company}
        validationSchema={CompanyEditSchema}
        onSubmit={(values) => {
          saveCompany(values);
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
                  {/* User Id */}
                  <div className="col-lg-4">
                    <Field
                      name="companyName"
                      component={Input}
                      placeholder="Company Name"
                      label="Company Name"
                    />
                  </div>
                  
                  {/* First Name */}
                  <div className="col-lg-4">
                    <Field
                      name="companyHO"
                      component={Input}
                      placeholder="Company HO"
                      label="Company HO"
                    />
                  </div>
                  {/* Last Name */}
                  <div className="col-lg-4">
                    <Field
                      name="companyAddress"
                      component={Input}
                      placeholder="Company Address"
                      label="Company Address"
                    />
                  </div>
                  {/* Login */}
                  {/* <div className="col-lg-4">
                    <Field
                      name="userName"
                      component={Input}
                      placeholder="Login"
                      label="Login"
                    />
                  </div> */}
                </div>
                {/* Email */}
                <div className="form-group row">
                <div className="col-lg-4">
                    <Field
                      type="text"
                      name="phoneno"
                      component={Input}
                      placeholder="Contact No"
                      label="Contact No"
                    />
                  </div>
                  <div className="col-lg-4">
                    <Field
                      type="email"
                      name="emailid"
                      component={Input}
                      placeholder="Email"
                      label="Email"
                    />
                  </div>
                  {/* Date of birth */}
                  <div className="col-lg-4">
                    <DatePickerField
                      name="joiningDate"
                      label="Joining Date"
                    
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
