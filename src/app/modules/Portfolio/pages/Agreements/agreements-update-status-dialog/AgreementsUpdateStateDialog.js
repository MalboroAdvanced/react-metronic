import React, { useEffect, useState, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import {
  AgreementsStatusCssClasses,
  AgreementsStatusTitles,
} from "../AgreementsUIHelpers";
import * as actions from "../../../_redux/agreements/agreementsActions";
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

export function AgreementsUpdateStateDialog({ show, onHide }) {
  // Agreements UI Context
  const agreementsUIContext = useAgreementsUIContext();
  const agreementsUIProps = useMemo(() => {
    return {
      ids: agreementsUIContext.ids,
      setIds: agreementsUIContext.setIds,
      queryParams: agreementsUIContext.queryParams,
    };
  }, [agreementsUIContext]);

  // Agreements Redux state
  const { agreements, isLoading } = useSelector(
    (state) => ({
      agreements: selectedAgreements(
        state.agreements.entities,
        agreementsUIProps.ids
      ),
      isLoading: state.agreements.actionsLoading,
    }),
    shallowEqual
  );

  // if !id we should close modal
  useEffect(() => {
    if (!agreementsUIProps.ids || agreementsUIProps.ids.length === 0) {
      onHide();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [agreementsUIProps.ids]);

  const [status, setStatus] = useState(0);

  const dispatch = useDispatch();
  const updateStatus = () => {
    // server request for update agreements status by selected ids
    dispatch(actions.updateAgreementsStatus(agreementsUIProps.ids, status)).then(
      () => {
        // refresh list after deletion
        dispatch(actions.fetchAgreements(agreementsUIProps.queryParams)).then(
          () => {
            // clear selections list
            agreementsUIProps.setIds([]);
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
          Status has been updated for selected agreements
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
