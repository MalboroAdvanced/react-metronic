import React, { useState, useEffect } from "react";
import { shallowEqual, useSelector } from "react-redux";
import { Modal } from "react-bootstrap";
import {ModalProgressBar} from "../../../../../../_metronic/_partials/controls";

export function AgreementEditDialogHeader({ agreementMasterId }) {
  // Companies Redux state

  const { agreementForEdit, actionsLoading } = useSelector(
    (state) => ({
      agreementForEdit: state.agreements.agreementForEdit,
      actionsLoading: state.agreements.actionsLoading,
    }),
    shallowEqual
  );

  const [title, setTitle] = useState("");
  // Title couting
  useEffect(() => {
   
    let _title = agreementMasterId ? "" : "New Agreement";
    if (agreementForEdit && agreementMasterId) {
      // console.log("hukum",agreementMasterId)
      _title = `Edit Agreement '${agreementForEdit.contractno}'`;
    }

    setTitle(_title);
    // eslint-disable-next-line
  }, [agreementForEdit, actionsLoading]);
  // console.log("v",agreementForEdit)
  return (
    <>
      {actionsLoading && <ModalProgressBar />}
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-lg">{title}</Modal.Title>
      </Modal.Header>
    </>
  );
}
