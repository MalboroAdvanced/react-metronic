import React, { useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/discoms/discomsActions";
import { useDiscomsUIContext } from "../DiscomsUIContext";
import {ModalProgressBar} from "../../../../../../_metronic/_partials/controls";

export function DiscomsDeleteDialog({ show, onHide }) {
  // Discoms UI Context
  const discomsUIContext = useDiscomsUIContext();
  const discomsUIProps = useMemo(() => {
    return {
      ids: discomsUIContext.ids,
      setIds: discomsUIContext.setIds,
      queryParams: discomsUIContext.queryParams,
    };
  }, [discomsUIContext]);

  // Discoms Redux state
  const dispatch = useDispatch();
  const { isLoading } = useSelector(
    (state) => ({ isLoading: state.discoms.actionsLoading }),
    shallowEqual
  );

  // if discoms weren't selected we should close modal
  useEffect(() => {
    if (!discomsUIProps.ids || discomsUIProps.ids.length === 0) {
      onHide();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [discomsUIProps.ids]);

  // looking for loading/dispatch
  useEffect(() => {}, [isLoading, dispatch]);

  const deleteDiscoms = () => {
    // server request for deleting customer by selected ids
    dispatch(actions.deleteDiscoms(discomsUIProps.ids)).then(() => {
      // refresh list after deletion
      dispatch(actions.fetchDiscoms(discomsUIProps.queryParams)).then(
        () => {
          // clear selections list
          discomsUIProps.setIds([]);
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
          Discoms Delete
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {!isLoading && (
          <span>Are you sure to permanently delete selected discoms?</span>
        )}
        {isLoading && <span>Discom are deleting...</span>}
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
            onClick={deleteDiscoms}
            className="btn btn-primary btn-elevate"
          >
            Delete
          </button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}
