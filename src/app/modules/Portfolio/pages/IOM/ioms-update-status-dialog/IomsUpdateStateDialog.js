import React, { useEffect, useState, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import {
IomsStatusCssClasses,
IomsStatusTitles,
} from "../IomsUIHelpers";
import * as actions from "../../../_redux/ioms/iomsActions";
import { useIomsUIContext } from "../IomsUIContext";

const selectedIoms = (entities, ids) => {
  const _ioms = [];
  ids.forEach((iomMasterId) => {
    const iom = entities.find((el) => el.iomMasterId === iomMasterId);
    if (iom) {
      _ioms.push(iom);
    }
  });
  return _ioms;
};

export function IomsUpdateStateDialog({ show, onHide }) {
  // Companies UI Context
  const iomsUIContext = useIomsUIContext();
  const iomsUIProps = useMemo(() => {
    return {
      ids: iomsUIContext.ids,
      setIds: iomsUIContext.setIds,
      queryParams: iomsUIContext.queryParams,
    };
  }, [iomsUIContext]);

  // Companies Redux state
  const { ioms, isLoading } = useSelector(
    (state) => ({
      ioms: selectedIoms(
        state.ioms.entities,
        iomsUIProps.ids
      ),
      isLoading: state.ioms.actionsLoading,
    }),
    shallowEqual
  );

  // if !id we should close modal
  useEffect(() => {
    if (!iomsUIProps.ids ||iomsUIProps.ids.length === 0) {
      onHide();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [iomsUIProps.ids]);

  const [status, setStatus] = useState(0);

  const dispatch = useDispatch();
  const updateStatus = () => {
    // server request for update companies status by selected ids
    dispatch(actions.updateIomsStatus(iomsUIProps.ids, status)).then(
      () => {
        // refresh list after deletion
        dispatch(actions.fetchIoms(iomsUIProps.queryParams)).then(
          () => {
            // clear selections list
            iomsUIProps.setIds([]);
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
          Status has been updated for selected companies
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
              <th>COMPANY</th>
            </tr>
          </thead>
          <tbody>
            {ioms.map((company) => (
              <tr key={`iomMasterId${company.iomMasterId}`}>
                <td>{company.iomMasterId}</td>
                <td>
                  <span
                    className={`label label-lg label-light-${
                      IomsStatusCssClasses[company.ionSeller]
                    } label-inline`}
                  >
                    {" "}
                    {IomsStatusTitles[company.status]}
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
