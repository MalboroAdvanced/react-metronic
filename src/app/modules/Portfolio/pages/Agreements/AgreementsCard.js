import React, { useMemo } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../_metronic/_partials/controls";
import { AgreementsFilter } from "./agreements-filter/AgreementsFilter";
import { AgreementsTable } from "./agreements-table/AgreementsTable";
import { AgreementsGrouping } from "./agreements-grouping/AgreementsGrouping";
import { useAgreementsUIContext } from "./AgreementsUIContext";

export function AgreementsCard() {
  
  const agreementsUIContext = useAgreementsUIContext();
  const agreementsUIProps = useMemo(() => {
    return {
      ids: agreementsUIContext.ids,
      newAgreementButtonClick: agreementsUIContext.newAgreementButtonClick,
    };
  }, [agreementsUIContext]);

  return (
    <Card>
      <CardHeader title="Agreements list">
        <CardHeaderToolbar>
          <button
            type="button"
            className="btn btn-primary"
            onClick={agreementsUIProps.newAgreementButtonClick}
          >
            New Agreement
          </button>
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
       <AgreementsFilter />
        {agreementsUIProps.ids.length > 0 && <AgreementsGrouping />}
         <AgreementsTable />
      </CardBody>
    </Card>
  );
}
