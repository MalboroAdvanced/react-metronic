import React, { useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/ioms/iomsActions";
import { IomViewDialogHeader } from "./IomViewDialogHeader";
import { IomViewForm } from "./IomViewForm";
import { useIomsUIContext } from "../IomsUIContext";
import Add from "./Add"
export function IomViewDialog({ id, show, onHide }) {
  // Companies UI Context
  
  const iomsUIContext = useIomsUIContext();
  
  const iomsUIProps = useMemo(() => {
    return {
      initIom: iomsUIContext.initIom,
    };
  }, [iomsUIContext]);

 
  // Companies Redux state
  const dispatch = useDispatch();
  const { actionsLoading, iomForEdit } = useSelector(
  
    (state) => ({
      actionsLoading: state.ioms.actionsLoading,
      iomForEdit: state.ioms.iomForEdit,
    }),
    shallowEqual
  );

  useEffect(() => {
    // server call for getting Company by id
   var v= dispatch(actions.fetchIom(id));

  }, [id, dispatch]);

  // server request for saving company
  const saveIom = (iom) => {
  
    if (!id) {
      // server request for creating company
      dispatch(actions.createDateTime(iom)).then(() => onHide());
    } else {
      
      // server request for updating company
      dispatch(actions.updateIom(id,iom)).then(() => onHide());
    }
  };

  return (
    <Modal
      size="lg"
      show={show}
      onHide={onHide}
      aria-labelledby="example-modal-sizes-title-lg"
    >
      <IomViewDialogHeader id={id} />
      <IomViewForm
        saveIom={saveIom}
        actionsLoading={actionsLoading}
        iom={iomForEdit || iomsUIProps.initIom}
        onHide={onHide}
      />
    </Modal>
  );
}
