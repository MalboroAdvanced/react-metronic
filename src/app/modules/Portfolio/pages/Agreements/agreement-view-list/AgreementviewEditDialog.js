


import React, { useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/agreements/agreementsActions";
import { AgreementviewDialogHeader } from "./AgreementviewDialogHeader";
import { AgreementviewForm } from "./AgreementviewForm";
import { useAgreementsUIContext } from "../AgreementsUIContext";

export function AgreementviewEditDialog({ agreementMasterId, show, onHide }) {
  // Companies UI Context
  // console.log(agreementMasterId)
  const agreementsUIContext = useAgreementsUIContext();
  const agreementsUIProps = useMemo(() => {
    return {
      initAgreement: agreementsUIContext.initAgreement,
    };
 
  }, [agreementsUIContext]);



  // Companies Redux state
  const dispatch = useDispatch();
  const { actionsLoading, agreementForEdit } = useSelector(
    (state) => ({
      actionsLoading: state.agreements.actionsLoading,
      agreementForEdit: state.agreements.agreementForEdit,
    }),
    shallowEqual
  );

  useEffect(() => {
    // server call for getting Company by id
    dispatch(actions.fetchAgreementDetails(agreementMasterId));
  }, [agreementMasterId, dispatch]);

  // server request for saving company
  const saveAgreement = (agreement) => {
  
    if (!agreementMasterId) {
      // server request for creating company
      dispatch(actions.createAgreement(agreement)).then(() => onHide());
    } else {
      // server request for updating company
      dispatch(actions.updateAgreement(agreementMasterId,agreement)).then(() => onHide());
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
      <AgreementviewDialogHeader agreementMasterId={agreementMasterId} />
      <AgreementviewForm
        saveAgreement={saveAgreement} getRegionForState={getRegionForState}
        actionsLoading={actionsLoading}
        agreement={agreementForEdit || agreementsUIProps.initAgreement}
        onHide={onHide}
      />
    </Modal>
  );
}










// import React, { useEffect, useMemo } from "react";
// import { Modal } from "react-bootstrap";
// import { shallowEqual, useDispatch, useSelector } from "react-redux";
// import * as actions from "../../../_redux/agreements/agreementsActions";
// import { AgreementEditDialogHeader } from "./AgreementEditDialogHeader";
// import { AgreementEditForm } from "./AgreementEditForm";
// import { useAgreementsUIContext } from "../AgreementsUIContext";

// export function AgreementEditDialog({ agreementMasterId, show, onHide }) {
//   // Agreements UI Context
//   console.log("gh",agreementMasterId)
//   const agreementsUIContext = useAgreementsUIContext();
//   const agreementsUIProps = useMemo(() => {
//     return {
//       initAgreement: agreementsUIContext.initAgreement,
//     };
//   }, [agreementsUIContext]);

//   // Agreements Redux state
//   const dispatch = useDispatch();
//   const { actionsLoading, agreementForEdit } = useSelector(
//     (state) => ({
//       actionsLoading: state.agreements.actionsLoading,
//       agreementForEdit: state.agreements.agreementForEdit,
//     }),
//     shallowEqual
//   );

//   useEffect(() => {
//     // server call for getting Agreement by id
//     dispatch(actions.fetchAgreement(agreementMasterId));
//   }, [agreementMasterId, dispatch]);

//   // server request for saving agreement
//   const saveAgreement = (agreement) => {
//   console.log("agreement",agreement)
//     if (!agreementMasterId) {
//       // server request for creating agreement
//       dispatch(actions.createAgreement(agreement)).then(() => onHide());
//     } else {
//       // server request for updating agreement
//       dispatch(actions.updateAgreement(agreement)).then(() => onHide());
//     }
//   };
//    const getRegionForState = async (stateid,setRegion) => {
    
//     let reg;
    
//    dispatch(actions.getRegionForState(stateid)).then(res => {reg=res;
//    setRegion(reg);
//   });
//    //alert('jj'+reg)
//   // return reg;
//   };
//   return (
//     <Modal
//       size="lg"
//       show={show}
//       onHide={onHide}
//       aria-labelledby="example-modal-sizes-title-lg"
//     >
//       <AgreementEditDialogHeader agreementMasterId={agreementMasterId} />
//       <AgreementEditForm
//         saveAgreement={saveAgreement} getRegionForState={getRegionForState}
//         actionsLoading={actionsLoading}
//         agreement={agreementForEdit || agreementsUIProps.initAgreement}
//         onHide={onHide}
//       />
//     </Modal>
//   );
// }
