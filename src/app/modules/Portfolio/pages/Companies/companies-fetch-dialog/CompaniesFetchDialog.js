import React, { useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useSelector } from "react-redux";
import {
  CompaniesStatusCssClasses,
  CompaniesStatusTitles,
} from "../CompaniesUIHelpers";
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

export function CompaniesFetchDialog({ show, onHide }) {
  // Companies UI Context
  const companiesUIContext = useCompaniesUIContext();
  const companiesUIProps = useMemo(() => {
    return {
      ids: companiesUIContext.ids,
    };
  }, [companiesUIContext]);

  // Companies Redux state
  const { companies } = useSelector(
    (state) => ({
      companies: selectedCompanies(
        state.companies.entities,
        companiesUIProps.ids
      ),
    }),
    shallowEqual
  );

  // if companies weren't selected we should close modal
  useEffect(() => {
    if (!companiesUIProps.ids || companiesUIProps.ids.length === 0) {
      onHide();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [companiesUIProps.ids]);

  return (
    <Modal
      show={show}
      onHide={onHide}
      aria-labelledby="example-modal-sizes-title-lg"
    >
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-lg">
          Fetch selected elements
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
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
      <Modal.Footer>
        <div>
          <button
            type="button"
            onClick={onHide}
            className="btn btn-light btn-elevate"
          >
            Cancel
          </button>
          <> </>
          <button
            type="button"
            onClick={onHide}
            className="btn btn-primary btn-elevate"
          >
            Ok
          </button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}
