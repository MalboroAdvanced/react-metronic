import React, { useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/discoms/discomsActions";
import { DiscomEditDialogHeader } from "./DiscomEditDialogHeader";
import { DiscomEditForm } from "./DiscomEditForm";
import { useDiscomsUIContext } from "../DiscomsUIContext";

export function DiscomEditDialog({ discomMasterId, show, onHide }) {
  // Discoms UI Context
  const discomsUIContext = useDiscomsUIContext();
  const discomsUIProps = useMemo(() => {
    return {
      initDiscom: discomsUIContext.initDiscom,
    };
  }, [discomsUIContext]);

  // Discoms Redux state
  const dispatch = useDispatch();
  const { actionsLoading, discomForEdit } = useSelector(
    (state) => ({
      actionsLoading: state.discoms.actionsLoading,
      discomForEdit: state.discoms.discomForEdit,
    }),
    shallowEqual
  );

  useEffect(() => {
    // server call for getting Discom by id
    dispatch(actions.fetchDiscom(discomMasterId));
  }, [discomMasterId, dispatch]);

  // server request for saving discom
  const saveDiscom = (discom) => {
  
    if (!discomMasterId) {
      // server request for creating discom
      dispatch(actions.createDiscom(discom)).then(() => onHide());
    } else {
      // server request for updating discom
      dispatch(actions.updateDiscom(discom)).then(() => onHide());
    }
  };
   const getRegionForState = async (stateid,setRegion) => {
    
    let reg;
    
   dispatch(actions.getRegionForState(stateid)).then(res => {reg=res;
   setRegion(reg);
  });
   //alert('jj'+reg)
  // return reg;
  };
  return (
    <Modal
      size="lg"
      show={show}
      onHide={onHide}
      aria-labelledby="example-modal-sizes-title-lg"
    >
      <DiscomEditDialogHeader discomMasterId={discomMasterId} />
      <DiscomEditForm
        saveDiscom={saveDiscom} getRegionForState={getRegionForState}
        actionsLoading={actionsLoading}
        discom={discomForEdit || discomsUIProps.initDiscom}
        onHide={onHide}
      />
    </Modal>
  );
}
