import React, { useEffect, useState, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import {
  DiscomsStatusCssClasses,
  DiscomsStatusTitles,
} from "../DiscomsUIHelpers";
import * as actions from "../../../_redux/discoms/discomsActions";
import { useDiscomsUIContext } from "../DiscomsUIContext";

const selectedDiscoms = (entities, ids) => {
  const _discoms = [];
  ids.forEach((discomMasterId) => {
    const discom = entities.find((el) => el.discomMasterId === discomMasterId);
    if (discom) {
      _discoms.push(discom);
    }
  });
  return _discoms;
};

export function DiscomsUpdateStateDialog({ show, onHide }) {
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
  const { discoms, isLoading } = useSelector(
    (state) => ({
      discoms: selectedDiscoms(
        state.discoms.entities,
        discomsUIProps.ids
      ),
      isLoading: state.discoms.actionsLoading,
    }),
    shallowEqual
  );

  // if !id we should close modal
  useEffect(() => {
    if (!discomsUIProps.ids || discomsUIProps.ids.length === 0) {
      onHide();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [discomsUIProps.ids]);

  const [status, setStatus] = useState(0);

  const dispatch = useDispatch();
  const updateStatus = () => {
    // server request for update discoms status by selected ids
    dispatch(actions.updateDiscomsStatus(discomsUIProps.ids, status)).then(
      () => {
        // refresh list after deletion
        dispatch(actions.fetchDiscoms(discomsUIProps.queryParams)).then(
          () => {
            // clear selections list
            discomsUIProps.setIds([]);
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
          Status has been updated for selected discoms
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
              <th>DISCOM</th>
            </tr>
          </thead>
          <tbody>
            {discoms.map((discom) => (
              <tr key={`discomMasterId${discom.discomMasterId}`}>
                <td>{discom.discomMasterId}</td>
                <td>
                  <span
                    className={`label label-lg label-light-${
                      DiscomsStatusCssClasses[discom.status]
                    } label-inline`}
                  >
                    {" "}
                    {DiscomsStatusTitles[discom.status]}
                  </span>
                </td>
                <td>
                  <span className="ml-3">
                    {discom.lastName}, {discom.firstName}
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
