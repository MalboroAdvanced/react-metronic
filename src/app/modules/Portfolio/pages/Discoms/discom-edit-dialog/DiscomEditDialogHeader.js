import React, { useState, useEffect } from "react";
import { shallowEqual, useSelector } from "react-redux";
import { Modal } from "react-bootstrap";
import {ModalProgressBar} from "../../../../../../_metronic/_partials/controls";

export function DiscomEditDialogHeader({ discomMasterId }) {
  // Discoms Redux state
  const { discomForEdit, actionsLoading } = useSelector(
    (state) => ({
      discomForEdit: state.discoms.discomForEdit,
      actionsLoading: state.discoms.actionsLoading,
    }),
    shallowEqual
  );

  const [title, setTitle] = useState("");
  // Title couting
  useEffect(() => {
   
    let _title = discomMasterId ? "" : "New Discom";
    if (discomForEdit && discomMasterId) {
      _title = `Edit Discom '${discomForEdit.discomName}'`;
    }

    setTitle(_title);
    // eslint-disable-next-line
  }, [discomForEdit, actionsLoading]);

  return (
    <>
      {actionsLoading && <ModalProgressBar />}
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-lg">{title}</Modal.Title>
      </Modal.Header>
    </>
  );
}
