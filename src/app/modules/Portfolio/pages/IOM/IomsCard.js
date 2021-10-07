import React, { useMemo } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../_metronic/_partials/controls";
import { IomsFilter } from "./ioms-filter/IomsFilter";
import { IomsTable } from "./ioms-table/IomsTable";
import { IomsGrouping } from "./ioms-grouping/IomsGrouping";
import { useIomsUIContext } from "./IomsUIContext";

export function IomsCard() {
  const iomsUIContext = useIomsUIContext();
  const iomsUIProps = useMemo(() => {
    return {
      ids: iomsUIContext.ids,
      newIomButtonClick: iomsUIContext.newIomButtonClick,
    };
  }, [iomsUIContext]);

  return (
    <Card>
      <CardHeader title="IOMS list">
        <CardHeaderToolbar>
          <button
            type="button"
            className="btn btn-primary"
            onClick={iomsUIProps.newIomButtonClick}
          >
            New Iom
          </button>
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        <IomsFilter />
        {iomsUIProps.ids.length > 0 && <IomsGrouping />}
        <IomsTable />
      </CardBody>
    </Card>
  );
}
