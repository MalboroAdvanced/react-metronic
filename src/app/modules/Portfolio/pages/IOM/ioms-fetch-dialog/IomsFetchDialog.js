import React, { useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useSelector } from "react-redux";
import {
IomsStatusCssClasses,
IomsStatusTitles,
} from "../IomsUIHelpers";
import { useIomsUIContext } from "../IomsUIContext";
import Ioms from "../../../../utils/Ioms";

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

export function IomsFetchDialog({ show, onHide }) {
  // Companies UI Context
  const iomsUIContext = useIomsUIContext();
  const iomsUIProps = useMemo(() => {
    return {
      ids: iomsUIContext.ids,
    };
  }, [iomsUIContext]);

  // Companies Redux state
  const { ioms } = useSelector(
    (state) => ({
      ioms: selectedIoms(
        state.ioms.entities,
        iomsUIProps.ids
      ),
    }),
    shallowEqual
  );

  // if companies weren't selected we should close modal
  useEffect(() => {
    if (!iomsUIProps.ids || iomsUIProps.ids.length === 0) {
      onHide();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [iomsUIProps.ids]);

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
              <th>COMPANY</th>
            </tr>
          </thead>
          <tbody>
            {ioms.map((iom) => (
              <tr key={`companyMasterId${iom.iomMasterId}`}>
                <td>{iom.iomMasterId}</td>
                <td>
                  <span
                    className={`label label-lg label-light-${
                    IomsStatusCssClasses[iom.IomSeller]
                    } label-inline`}
                  >
                    {" "}
                    {IomsStatusTitles[iom.IomBuyer]}
                  </span>
                </td>
                <td>
                  <span className="ml-3">
                    {iom.from}, {iom.to}
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
