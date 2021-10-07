import React, { useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useSelector } from "react-redux";
import {
  DiscomsStatusCssClasses,
  DiscomsStatusTitles,
} from "../DiscomsUIHelpers";
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

export function DiscomsFetchDialog({ show, onHide }) {
  // Discoms UI Context
  const discomsUIContext = useDiscomsUIContext();
  const discomsUIProps = useMemo(() => {
    return {
      ids: discomsUIContext.ids,
    };
  }, [discomsUIContext]);

  // Discoms Redux state
  const { discoms } = useSelector(
    (state) => ({
      discoms: selectedDiscoms(
        state.discoms.entities,
        discomsUIProps.ids
      ),
    }),
    shallowEqual
  );

  // if discoms weren't selected we should close modal
  useEffect(() => {
    if (!discomsUIProps.ids || discomsUIProps.ids.length === 0) {
      onHide();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [discomsUIProps.ids]);

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
