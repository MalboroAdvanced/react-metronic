import React, { useEffect, useMemo } from "react";
import { Formik } from "formik";
import { isEqual } from "lodash";
import { useCompaniesUIContext } from "../CompaniesUIContext";
import CompanyDropDown from "../../../../utils/CompanyDropDown";
import Stated from "../../../../utils/Stated";
import Portfolios from "../../../../utils/Portfolios";
const prepareFilter = (queryParams, values) => {
  const { status, type, searchText } = values;
  const newQueryParams = { ...queryParams };
  const filter = {};
  // Filter by status
  filter.status = status !== "" ? +status : undefined;
  // Filter by type
  filter.type = type !== "" ? +type : undefined;
  // Filter by all fields
  filter.lastName = searchText;
  if (searchText) {
    filter.firstName = searchText;
    filter.email = searchText;
    filter.ipAddress = searchText;
  }
  newQueryParams.filter = filter;
  return newQueryParams;
};

export function CompaniesFilter({ listLoading }) {
  // Companies UI Context


  const companiesUIContext = useCompaniesUIContext();
  const companiesUIProps = useMemo(() => {
    return {
      queryParams: companiesUIContext.queryParams,
      setQueryParams: companiesUIContext.setQueryParams,
    };
  }, [companiesUIContext]);

  // queryParams, setQueryParams,
  const applyFilter = (values) => {
    const newQueryParams = prepareFilter(companiesUIProps.queryParams, values);
    if (!isEqual(newQueryParams, companiesUIProps.queryParams)) {
      newQueryParams.pageNumber = 1;
      // update list by queryParams
      companiesUIProps.setQueryParams(newQueryParams);
    }
  };

  return (
    <>
      <Formik
        initialValues={{
          status: "", // values => All=""/Susspended=0/Active=1/Pending=2
          type: "", // values => All=""/Business=0/Individual=1
          searchText: "",
        }}
        onSubmit={(values) => {
          applyFilter(values);
        }}
      >
        {({
          values,
          handleSubmit,
          handleBlur,
          handleChange,
          setFieldValue,
        }) => (
          <form onSubmit={handleSubmit} className="form form-label-right">
            <div className="form-group row">
              <div className="col-lg-2">
                <select
                  className="form-control"
                  name="status"
                  placeholder="Filter by Company"
                  // TODO: Change this code
                  onChange={(e) => {
                    setFieldValue("status", e.target.value);
                    handleSubmit();
                  }}
                  onBlur={handleBlur}
                  value={values.status}
                > 
          <Stated />
                
                {/*   <option value="">All</option>
                  <option value="0">Active</option>
                  <option value="1">InActive</option> */}
              {/*   <CompanyDropDown/> */}
                </select>
                <small className="form-text text-muted">
                  <b>Filter</b> by State
                </small>
              </div>
           {/*    <div className="col-lg-2">
                <select
                  className="form-control"
                  placeholder="Filter by Type"
                  name="type"
                  onBlur={handleBlur}
                  onChange={(e) => {
                    setFieldValue("type", e.target.value);
                    handleSubmit();
                  }}
                  value={values.type}
                >
                  <option value="">All</option>
                  <option value="0">Admin</option>
                
                </select>
                <small className="form-text text-muted">
                  <b>Filter</b> by Role
                </small>
              </div> */}
              <div className="col-lg-2">
                <input
                  type="text"
                  className="form-control"
                  name="searchText"
                  placeholder="Search"
                  onBlur={handleBlur}
                  value={values.searchText}
                  onChange={(e) => {
                    setFieldValue("searchText", e.target.value);
                    handleSubmit();
                  }}
                />
                <small className="form-text text-muted">
                  <b>Search</b> in all fields
                </small>
              </div>
            </div>
          </form>
        )}
      </Formik>
    </>
  );
}
