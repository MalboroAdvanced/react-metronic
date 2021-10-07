import React, { useMemo } from "react";
import { useAgreementsUIContext } from "../AgreementsUIContext";

export function AgreementsGrouping() {
  // Agreements UI Context
  const agreementsUIContext = useAgreementsUIContext();
  const agreementsUIProps = useMemo(() => {
    return {
      ids: agreementsUIContext.ids,
      setIds: agreementsUIContext.setIds,
      openDeleteAgreementsDialog: agreementsUIContext.openDeleteAgreementsDialog,
      openFetchAgreementsDialog: agreementsUIContext.openFetchAgreementsDialog,
      openUpdateAgreementsStatusDialog:
        agreementsUIContext.openUpdateAgreementsStatusDialog,
    };
  }, [agreementsUIContext]);

  return (
    <div className="form">
      <div className="row align-items-center form-group-actions margin-top-20 margin-bottom-20">
        <div className="col-xl-12">
          <div className="form-group form-group-inline">
            <div className="form-label form-label-no-wrap">
              <label className="font-bold font-danger">
                <span>
                  Selected records count: <b>{agreementsUIProps.ids.length}</b>
                </span>
              </label>
            </div>
            <div>
              <button
                type="button"
                className="btn btn-danger font-weight-bolder font-size-sm"
                onClick={agreementsUIProps.openDeleteAgreementsDialog}
              >
                <i className="fa fa-trash"></i> Delete All
              </button>
              &nbsp;
              <button
                type="button"
                className="btn btn-light-primary font-weight-bolder font-size-sm"
                onClick={agreementsUIProps.openFetchAgreementsDialog}
              >
                <i className="fa fa-stream"></i> Fetch Selected
              </button>
              &nbsp;
              <button
                type="button"
                className="btn btn-light-primary font-weight-bolder font-size-sm"
                onClick={agreementsUIProps.openUpdateAgreementsStatusDialog}
              >
                <i className="fa fa-sync-alt"></i> Update Status
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
