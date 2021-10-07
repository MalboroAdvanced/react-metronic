import React, { useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/portfolios/portfoliosActions";
import { PortfolioViewDialogHeader } from "./PortfolioViewDialogHeader";
import { PortfolioViewForm } from "./PortfolioViewForm";
import { usePortfoliosUIContext } from "../PortfoliosUIContext";

export function PortfolioViewDialog({ portfolioMasterId, show, onHide }) {
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
    dispatch(actions.fetchPortfolioDetails(portfolioMasterId));
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
  const getDiscomForState = async (stateid,setRegion) => {
    
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
      <PortfolioViewDialogHeader portfolioMasterId={portfolioMasterId} />
      <PortfolioViewForm
        savePortfolio={savePortfolio} getRegionForState={getRegionForState}
        getDiscomForState={getDiscomForState}
        actionsLoading={actionsLoading}
        portfolio={portfolioForEdit || portfoliosUIProps.initPortfolio}
        onHide={onHide}
      />
    </Modal>
  );
}
