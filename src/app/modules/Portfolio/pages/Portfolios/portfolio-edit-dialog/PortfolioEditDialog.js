import React, { useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/portfolios/portfoliosActions";
import { PortfolioEditDialogHeader } from "./PortfolioEditDialogHeader";
import { PortfolioEditForm } from "./PortfolioEditForm";
import { usePortfoliosUIContext } from "../PortfoliosUIContext";

export function PortfolioEditDialog({ portfolioMasterId, show, onHide }) {
  // Portfolios UI Context
  const portfoliosUIContext = usePortfoliosUIContext();
  const portfoliosUIProps = useMemo(() => {
    return {
      initPortfolio: portfoliosUIContext.initPortfolio,
    };
  }, [portfoliosUIContext]);

  // Portfolios Redux state
  const dispatch = useDispatch();
  const { actionsLoading, portfolioForEdit } = useSelector(
    (state) => ({
      actionsLoading: state.portfolios.actionsLoading,
      portfolioForEdit: state.portfolios.portfolioForEdit,
    }),
    shallowEqual
  );

  useEffect(() => {
    // server call for getting Portfolio by id
    dispatch(actions.fetchPortfolio(portfolioMasterId));
  }, [portfolioMasterId, dispatch]);

  // server request for saving portfolio
  const savePortfolio = (portfolio) => {
  
    if (!portfolioMasterId) {
      // server request for creating portfolio
      dispatch(actions.createPortfolio(portfolio)).then(() => onHide());
    } else {
      // server request for updating portfolio
      dispatch(actions.updatePortfolio(portfolio)).then(() => onHide());
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
  const getDiscomForState = async (stateid,setDiscom) => {
    
    let reg;
    
   dispatch(actions.getDiscomForState(stateid)).then(res => {reg=res;
    setDiscom(reg);
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
      <PortfolioEditDialogHeader portfolioMasterId={portfolioMasterId} />
      <PortfolioEditForm
        savePortfolio={savePortfolio} getRegionForState={getRegionForState}
        getDiscomForState={getDiscomForState}
        actionsLoading={actionsLoading}
        portfolio={portfolioForEdit || portfoliosUIProps.initPortfolio}
        onHide={onHide}
      />
    </Modal>
  );
}
