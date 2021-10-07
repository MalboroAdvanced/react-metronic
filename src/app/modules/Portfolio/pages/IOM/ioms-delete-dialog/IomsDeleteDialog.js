import React, { useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/ioms/iomsActions";
import { useIomsUIContext } from "../IomsUIContext";
import {ModalProgressBar} from "../../../../../../_metronic/_partials/controls";

export function IomsDeleteDialog({ show, onHide }) {
  // Companies UI Context
  const iomsUIContext = useIomsUIContext();
  const iomsUIProps = useMemo(() => {
    return {
      ids: iomsUIContext.ids,
      setIds: iomsUIContext.setIds,
      queryParams:iomsUIContext.queryParams,
    };
  }, [iomsUIContext]);

  // Companies Redux state
  const dispatch = useDispatch();
  const { isLoading } = useSelector(
    (state) => ({ isLoading: state.ioms.actionsLoading }),
    shallowEqual
  );

  // if companies weren't selected we should close modal
  useEffect(() => {
    if (!iomsUIProps.ids || iomsUIProps.ids.length === 0) {
      onHide();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [iomsUIProps.ids]);

  // looking for loading/dispatch
  useEffect(() => {}, [isLoading, dispatch]);

  const deleteIoms = () => {
    // server request for deleting customer by selected ids
    dispatch(actions.deleteIoms(iomsUIProps.ids)).then(() => {
      // refresh list after deletion
      dispatch(actions.fetchIoms(iomsUIProps.queryParams)).then(
        () => {
          // clear selections list
          iomsUIProps.setIds([]);
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
          Ioms Delete
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {!isLoading && (
          <span>Are you sure to permanently delete selected companies?</span>
        )}
        {isLoading && <span>Company are deleting...</span>}
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
            onClick={deleteIoms}
            className="btn btn-primary btn-elevate"
          >
            Delete
          </button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}
