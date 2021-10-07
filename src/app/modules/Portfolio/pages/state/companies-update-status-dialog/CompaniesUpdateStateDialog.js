import React, { useEffect, useState, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import {
  CompaniesStatusCssClasses,
  CompaniesStatusTitles,
} from "../CompaniesUIHelpers";
import * as actions from "../../../_redux/states/companiesActions";
import { useCompaniesUIContext } from "../CompaniesUIContext";

const selectedCompanies = (entities, ids) => {
  const _companies = [];
  ids.forEach((companyMasterId) => {
    const company = entities.find((el) => el.companyMasterId === companyMasterId);
    if (company) {
      _companies.push(company);
    }
  });
  return _companies;
};

export function CompaniesUpdateStateDialog({ show, onHide }) {
  // Companies UI Context
  const companiesUIContext = useCompaniesUIContext();
  const companiesUIProps = useMemo(() => {
    return {
      ids: companiesUIContext.ids,
      setIds: companiesUIContext.setIds,
      queryParams: companiesUIContext.queryParams,
    };
  }, [companiesUIContext]);

  // Companies Redux state
  const { companies, isLoading } = useSelector(
    (state) => ({
      companies: selectedCompanies(
        state.companies.entities,
        companiesUIProps.ids
      ),
      isLoading: state.companies.actionsLoading,
    }),
    shallowEqual
  );

  // if !id we should close modal
  useEffect(() => {
    if (!companiesUIProps.ids || companiesUIProps.ids.length === 0) {
      onHide();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [companiesUIProps.ids]);

  const [status, setStatus] = useState(0);

  const dispatch = useDispatch();
  const updateStatus = () => {
    // server request for update companies status by selected ids
    dispatch(actions.updateCompaniesStatus(companiesUIProps.ids, status)).then(
      () => {
        // refresh list after deletion
        dispatch(actions.fetchCompanies(companiesUIProps.queryParams)).then(
          () => {
            // clear selections list
            companiesUIProps.setIds([]);
            // closing delete modal
            onHide();
          }
        );
      }
    );
  };

  return (
    <Modal
      show={show}
      onHide={onHide}
      aria-labelledby="example-modal-sizes-title-lg"
    >
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-lg">
          Status has been updated for selected companies
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="overlay overlay-block cursor-default">
        {/*begin::Loading*/}
        {isLoading && (
          <div className="overlay-layer">
            <div className="spinner spinner-lg spinner-primary" />
          </div>
        )}
        {/*end::Loading*/}
        <table className="table table table-head-custom table-vertical-center overflow-hidden">
          <thead>
            <tr>
              <th>ID</th>
              <th>STATUS</th>
              <th>COMPANY</th>
            </tr>
          </thead>
          <tbody>
            {companies.map((company) => (
              <tr key={`companyMasterId${company.companyMasterId}`}>
                <td>{company.companyMasterId}</td>
                <td>
                  <span
                    className={`label label-lg label-light-${
                      CompaniesStatusCssClasses[company.status]
                    } label-inline`}
                  >
                    {" "}
                    {CompaniesStatusTitles[company.status]}
                  </span>
                </td>
                <td>
                  <span className="ml-3">
                    {company.lastName}, {company.firstName}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Modal.Body>
      <Modal.Footer className="form">
        <div className="form-group">
          <select
            className="form-control"
            value={status}
            onChange={(e) => setStatus(+e.target.value)}
          >
            <option value="0">Suspended</option>
            <option value="1">Active</option>
            <option value="2">Pending</option>
          </select>
        </div>
        <div className="form-group">
          <button
            type="button"
            onClick={onHide}
            className="btn btn-light btn-elevate mr-3"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={updateStatus}
            className="btn btn-primary btn-elevate"
          >
            Update Status
          </button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}
