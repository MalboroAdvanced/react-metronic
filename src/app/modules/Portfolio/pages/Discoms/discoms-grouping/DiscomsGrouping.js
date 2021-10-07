import React, { useMemo } from "react";
import { useDiscomsUIContext } from "../DiscomsUIContext";

export function DiscomsGrouping() {
  // Discoms UI Context
  const discomsUIContext = useDiscomsUIContext();
  const discomsUIProps = useMemo(() => {
    return {
      ids: discomsUIContext.ids,
      setIds: discomsUIContext.setIds,
      openDeleteDiscomsDialog: discomsUIContext.openDeleteDiscomsDialog,
      openFetchDiscomsDialog: discomsUIContext.openFetchDiscomsDialog,
      openUpdateDiscomsStatusDialog:
        discomsUIContext.openUpdateDiscomsStatusDialog,
    };
  }, [discomsUIContext]);

  return (
    <div className="form">
      <div className="row align-items-center form-group-actions margin-top-20 margin-bottom-20">
        <div className="col-xl-12">
          <div className="form-group form-group-inline">
            <div className="form-label form-label-no-wrap">
              <label className="font-bold font-danger">
                <span>
                  Selected records count: <b>{discomsUIProps.ids.length}</b>
                </span>
              </label>
            </div>
            <div>
              <button
                type="button"
                className="btn btn-danger font-weight-bolder font-size-sm"
                onClick={discomsUIProps.openDeleteDiscomsDialog}
              >
                <i className="fa fa-trash"></i> Delete All
              </button>
              &nbsp;
              <button
                type="button"
                className="btn btn-light-primary font-weight-bolder font-size-sm"
                onClick={discomsUIProps.openFetchDiscomsDialog}
              >
                <i className="fa fa-stream"></i> Fetch Selected
              </button>
              &nbsp;
              <button
                type="button"
                className="btn btn-light-primary font-weight-bolder font-size-sm"
                onClick={discomsUIProps.openUpdateDiscomsStatusDialog}
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
