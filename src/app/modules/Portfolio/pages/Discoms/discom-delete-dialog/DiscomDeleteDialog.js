import React, { useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import {ModalProgressBar} from "../../../../../../_metronic/_partials/controls";
import * as actions from "../../../_redux/discoms/discomsActions";
import {useDiscomsUIContext} from "../DiscomsUIContext";

export function DiscomDeleteDialog({ discomMasterId, show, onHide }) {
  // Discoms UI Context
  const discomsUIContext = useDiscomsUIContext();
  const discomsUIProps = useMemo(() => {
    return {
      setIds: discomsUIContext.setIds,
      queryParams: discomsUIContext.queryParams
    };
  }, [discomsUIContext]);

  // Discoms Redux state
  const dispatch = useDispatch();
  const { isLoading } = useSelector(
    (state) => ({ isLoading: state.discoms.actionsLoading }),
    shallowEqual
  );

  // if !id we should close modal
  useEffect(() => {
    if (!discomMasterId) {
      onHide();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [discomMasterId]);

  // looking for loading/dispatch
  useEffect(() => {}, [isLoading, dispatch]);

  const deleteDiscom = () => {
    // server request for deleting discom by id
    dispatch(actions.deleteDiscom(discomMasterId)).then(() => {
      // refresh list after deletion
      dispatch(actions.fetchDiscoms(discomsUIProps.queryParams));
      // clear selections list
      discomsUIProps.setIds([]);
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
          Discom Delete
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {!isLoading && (
          <span>Are you sure to permanently delete this discom?</span>
        )}
        {isLoading && <span>Discom is deleting...</span>}
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
            onClick={deleteDiscom}
            className="btn btn-primary btn-elevate"
          >
            Delete
          </button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}
