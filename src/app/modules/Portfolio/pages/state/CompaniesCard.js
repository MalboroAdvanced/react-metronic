import React, { useMemo } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../_metronic/_partials/controls";
import { CompaniesFilter } from "./companies-filter/CompaniesFilter";
import { CompaniesTable } from "./companies-table/CompaniesTable";
import { CompaniesGrouping } from "./companies-grouping/CompaniesGrouping";
import { useCompaniesUIContext } from "./CompaniesUIContext";

export function CompaniesCard() {
  const companiesUIContext = useCompaniesUIContext();
  const companiesUIProps = useMemo(() => {
    return {
      ids: companiesUIContext.ids,
      newCompanyButtonClick: companiesUIContext.newCompanyButtonClick,
    };
  }, [companiesUIContext]);

  return (
    <Card>
      <CardHeader title="State list">
        {/* <CardHeaderToolbar>
          <button
            type="button"
            className="btn btn-primary"
            onClick={companiesUIProps.newCompanyButtonClick}
          >
            New State
          </button>
        </CardHeaderToolbar> */}
      </CardHeader>
      <CardBody>
        <CompaniesFilter />
        {companiesUIProps.ids.length > 0 && <CompaniesGrouping />}
        <CompaniesTable />
      </CardBody>
    </Card>
  );
}
