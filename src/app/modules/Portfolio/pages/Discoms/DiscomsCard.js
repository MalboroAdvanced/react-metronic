import React, { useMemo } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../_metronic/_partials/controls";
import { DiscomsFilter } from "./discoms-filter/DiscomsFilter";
import { DiscomsTable } from "./discoms-table/DiscomsTable";
import { DiscomsGrouping } from "./discoms-grouping/DiscomsGrouping";
import { useDiscomsUIContext } from "./DiscomsUIContext";

export function DiscomsCard() {
  
  const discomsUIContext = useDiscomsUIContext();
  const discomsUIProps = useMemo(() => {
    return {
      ids: discomsUIContext.ids,
      newDiscomButtonClick: discomsUIContext.newDiscomButtonClick,
    };
  }, [discomsUIContext]);

  return (
    <Card>
      <CardHeader title="Discoms list">
        <CardHeaderToolbar>
          <button
            type="button"
            className="btn btn-primary"
            onClick={discomsUIProps.newDiscomButtonClick}
          >
            New Discom
          </button>
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
       <DiscomsFilter />
        {discomsUIProps.ids.length > 0 && <DiscomsGrouping />}
         <DiscomsTable />
      </CardBody>
    </Card>
  );
}
