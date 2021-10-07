import React, { useState, useEffect } from "react";
import { shallowEqual, useSelector } from "react-redux";
import { Modal } from "react-bootstrap";
import {ModalProgressBar} from "../../../../../../_metronic/_partials/controls";

export function PortfolioEditDialogHeader({ portfolioMasterId }) {
  // Portfolios Redux state
  const { portfolioForEdit, actionsLoading } = useSelector(
    (state) => ({
      portfolioForEdit: state.portfolios.portfolioForEdit,
      actionsLoading: state.portfolios.actionsLoading,
    }),
    shallowEqual
  );

  const [title, setTitle] = useState("");
  // Title couting
  useEffect(() => {
   
    let _title = portfolioMasterId ? "" : "New Portfolio";
    if (portfolioForEdit && portfolioMasterId) {
      _title = `Edit Portfolio '${portfolioForEdit.portfolioName}'`;
    }

    setTitle(_title);
    // eslint-disable-next-line
  }, [portfolioForEdit, actionsLoading]);

  return (
    <>
      {actionsLoading && <ModalProgressBar />}
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-lg">{title}</Modal.Title>
      </Modal.Header>
    </>
  );
}
