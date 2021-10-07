import React, { useState, useEffect } from "react";
import { shallowEqual, useSelector } from "react-redux";
import { Modal } from "react-bootstrap";
import {ModalProgressBar} from "../../../../../../_metronic/_partials/controls";

export function IomEditDialogHeader({ id }) {
  // console.log(id)
  // Companies Redux state
  const { iomForEdit, actionsLoading } = useSelector(
    (state) => ({
      iomForEdit: state.ioms.iomForEdit,
      actionsLoading: state.ioms.actionsLoading,
    }),
    shallowEqual
  );
 
  const [title, setTitle] = useState("");
  // Title couting
  useEffect(() => {
   
    let _title = id ? "" : "New Iom";
    if (iomForEdit && id) {
      _title = `Edit Iom '${iomForEdit.iomNumber}'`;
    }

    setTitle(_title);
    // eslint-disable-next-line
  }, [iomForEdit, actionsLoading]);
  // console.log("v",iomForEdit)
  return (
    <>
    
      {actionsLoading && <ModalProgressBar />}
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-lg">{title}</Modal.Title>
      </Modal.Header>
    </>
  );
}
