import React, { useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/agreements/agreementsActions";
import { useAgreementsUIContext } from "../AgreementsUIContext";
import {ModalProgressBar} from "../../../../../../_metronic/_partials/controls";

export function AgreementsDeleteDialog({ show, onHide }) {
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
  const dispatch = useDispatch();
  const { isLoading } = useSelector(
    (state) => ({ isLoading: state.agreements.actionsLoading }),
    shallowEqual
  );

  // if agreements weren't selected we should close modal
  useEffect(() => {
    if (!agreementsUIProps.ids || agreementsUIProps.ids.length === 0) {
      onHide();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [agreementsUIProps.ids]);

  // looking for loading/dispatch
  useEffect(() => {}, [isLoading, dispatch]);

  const deleteAgreements = () => {
    // server request for deleting customer by selected ids
    dispatch(actions.deleteAgreements(agreementsUIProps.ids)).then(() => {
      // refresh list after deletion
      dispatch(actions.fetchAgreements(agreementsUIProps.queryParams)).then(
        () => {
          // clear selections list
          agreementsUIProps.setIds([]);
          // closing delete modal
          onHide();
        }
      );
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
          Agreements Delete
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {!isLoading && (
          <span>Are you sure to permanently delete selected agreements?</span>
        )}
        {isLoading && <span>Agreement are deleting...</span>}
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
            onClick={deleteAgreements}
            className="btn btn-primary btn-elevate"
          >
            Delete
          </button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}
