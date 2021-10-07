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
const CustomerEditSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(3, "Minimum 3 symbols")
    .max(50, "Maximum 50 symbols")
    .required("Firstname is required"),
  lastName: Yup.string()
    .min(3, "Minimum 3 symbols")
    .max(50, "Maximum 50 symbols")
    .required("Lastname is required"),
  email: Yup.string()
    .email("Invalid email")
    .required("Email is required"),
  userid: Yup.string().required("User Id is required"),
  joiningDate: Yup.mixed()
    .nullable(false)
    .required("Joining date is required"),
  /* ipAddress: Yup.string().required("IP Address is required"), */
});

export function CustomerEditForm({
  saveCustomer,
  customer,
  actionsLoading,
  onHide,
}) {
  return (
    <>
      <Formik
        enableReinitialize={true}
        initialValues={customer}
        validationSchema={CustomerEditSchema}
        onSubmit={(values) => {
          saveCustomer(values);
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
                      name="userid"
                      component={Input}
                      placeholder="User Id"
                      label="User Id"
                    />
                  </div>
                  
                  {/* First Name */}
                  <div className="col-lg-4">
                    <Field
                      name="firstName"
                      component={Input}
                      placeholder="First Name"
                      label="First Name"
                    />
                  </div>
                  {/* Last Name */}
                  <div className="col-lg-4">
                    <Field
                      name="lastName"
                      component={Input}
                      placeholder="Last Name"
                      label="Last Name"
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
                      type="password"
                      name="password"
                      component={Input}
                      placeholder="Password"
                      label="Password"
                    />
                  </div>
                  <div className="col-lg-4">
                    <Field
                      type="email"
                      name="email"
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
                <div className="form-group row">
                  {/* IP Address */}
                  <div className="col-lg-4">
                    <Field
                      name="contactNo"
                      component={Input}
                      placeholder="Contact No"
                      label="Contact No"
                     /*  customFeedbackLabel="We'll never share customer IP Address with anyone else" */
                    />
                  </div>
               
                  {/* Gender */}
                  <div className="col-lg-4">
                    <Select name="client" label="Role">
                       <option value="SUPER ADMIN">Super Admin</option>
                      <option value="ADMIN">Admin</option>
                     
                    </Select>
                  </div>
                  {/* Type */}
                  <div className="col-lg-4">
                    <Select name="status" label="Status">
                      <option value="0">Active</option>
                      <option value="1">Inactive</option>
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
