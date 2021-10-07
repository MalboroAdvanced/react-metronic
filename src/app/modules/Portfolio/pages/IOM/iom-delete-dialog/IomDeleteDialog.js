import React, { useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import {ModalProgressBar} from "../../../../../../_metronic/_partials/controls";
import * as actions from "../../../_redux/ioms/iomsActions";
import {useIomsUIContext} from "../IomsUIContext";
import { useParams } from "react-router-dom";
export function IomDeleteDialog({ id, show, onHide }) {
  // Companies UI Context
  const iomsUIContext = useIomsUIContext();
  const iomsUIProps = useMemo(() => {
    return {
      setIds:iomsUIContext.setIds,
      queryParams: iomsUIContext.queryParams
    };
  }, [iomsUIContext]);

  // Companies Redux state
  const dispatch = useDispatch();
  const { isLoading } = useSelector(
    (state) => ({ isLoading: state.ioms.actionsLoading }),
    shallowEqual
  );
  var params=useParams()

console.log("delete",params)

  // if !id we should close modal
  useEffect(() => {
    if (!id) {
      onHide();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  // looking for loading/dispatch
  useEffect(() => {}, [isLoading, dispatch]);

  const deleteIom = () => {
    // server request for deleting company by id
    dispatch(actions.deleteIom(params)).then(() => {
      // refresh list after deletion
      dispatch(actions.fetchIoms(iomsUIProps.queryParams));
      // clear selections list
    iomsUIProps.setIds([]);
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
          Iom Delete
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {!isLoading && (
          <span>Are you sure to permanently delete this company?</span>
        )}
        {isLoading && <span>Company is deleting...</span>}
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
            onClick={deleteIom}
            className="btn btn-primary btn-elevate"
          >
            Delete
          </button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}
