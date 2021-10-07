import React, { useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import {ModalProgressBar} from "../../../../../../_metronic/_partials/controls";
import * as actions from "../../../_redux/agreements/agreementsActions";
import {useAgreementsUIContext} from "../AgreementsUIContext";

export function AgreementDeleteDialog({ agreementMasterId, show, onHide }) {
  // Agreements UI Context
  const agreementsUIContext = useAgreementsUIContext();
  const agreementsUIProps = useMemo(() => {
    return {
      setIds: agreementsUIContext.setIds,
      queryParams: agreementsUIContext.queryParams
    };
  }, [agreementsUIContext]);

  // Agreements Redux state
  const dispatch = useDispatch();
  const { isLoading } = useSelector(
    (state) => ({ isLoading: state.agreements.actionsLoading }),
    shallowEqual
  );

  // if !id we should close modal
  useEffect(() => {
    if (!agreementMasterId) {
      onHide();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [agreementMasterId]);

  // looking for loading/dispatch
  useEffect(() => {}, [isLoading, dispatch]);

  const deleteAgreement = () => {
    // server request for deleting agreement by id
    dispatch(actions.deleteAgreement(agreementMasterId)).then(() => {
      // refresh list after deletion
      dispatch(actions.fetchAgreements(agreementsUIProps.queryParams));
      // clear selections list
      agreementsUIProps.setIds([]);
      // closing delete modal
      onHide();
    });
  };

  return (
    <Modal
      show={show}
      onHide={onHide}
      aria-labelledby="example-modal-sizes-title-lg"
    >
      {/*begin::Loading*/}
      {isLoading && <ModalProgressBar />}
      {/*end::Loading*/}
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-lg">
          Agreement Delete
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {!isLoading && (
          <span>Are you sure to permanently delete this agreement?</span>
        )}
        {isLoading && <span>Agreement is deleting...</span>}
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
            onClick={deleteAgreement}
            className="btn btn-primary btn-elevate"
          >
            Delete
          </button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}
