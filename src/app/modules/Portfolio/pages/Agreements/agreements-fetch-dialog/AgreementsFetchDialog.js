import React, { useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useSelector } from "react-redux";
import {
  AgreementsStatusCssClasses,
  AgreementsStatusTitles,
} from "../AgreementsUIHelpers";
import { useAgreementsUIContext } from "../AgreementsUIContext";

const selectedAgreements = (entities, ids) => {
  const _agreements = [];
  ids.forEach((agreementMasterId) => {
    const agreement = entities.find((el) => el.agreementMasterId === agreementMasterId);
    if (agreement) {
      _agreements.push(agreement);
    }
  });
  return _agreements;
};

export function AgreementsFetchDialog({ show, onHide }) {
  // Agreements UI Context
  const agreementsUIContext = useAgreementsUIContext();
  const agreementsUIProps = useMemo(() => {
    return {
      ids: agreementsUIContext.ids,
    };
  }, [agreementsUIContext]);

  // Agreements Redux state
  const { agreements } = useSelector(
    (state) => ({
      agreements: selectedAgreements(
        state.agreements.entities,
        agreementsUIProps.ids
      ),
    }),
    shallowEqual
  );

  // if agreements weren't selected we should close modal
  useEffect(() => {
    if (!agreementsUIProps.ids || agreementsUIProps.ids.length === 0) {
      onHide();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [agreementsUIProps.ids]);

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
              <th>AGREEMENT</th>
            </tr>
          </thead>
          <tbody>
            {agreements.map((agreement) => (
              <tr key={`agreementMasterId${agreement.agreementMasterId}`}>
                <td>{agreement.agreementMasterId}</td>
                <td>
                  <span
                    className={`label label-lg label-light-${
                      AgreementsStatusCssClasses[agreement.status]
                    } label-inline`}
                  >
                    {" "}
                    {AgreementsStatusTitles[agreement.status]}
                  </span>
                </td>
                <td>
                  <span className="ml-3">
                    {agreement.lastName}, {agreement.firstName}
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
