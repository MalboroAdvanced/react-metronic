// React bootstrap table next =>
// DOCS: https://react-bootstrap-table.github.io/react-bootstrap-table2/docs/
// STORYBOOK: https://react-bootstrap-table.github.io/react-bootstrap-table2/storybook/index.html
import React, { useEffect, useMemo } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationProvider,
} from "react-bootstrap-table2-paginator";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/agreements/agreementsActions";
import {
  getSelectRow,
  getHandlerTableChange,
  NoRecordsFoundMessage,
  PleaseWaitMessage,
  sortCaret,
  headerSortingClasses,
} from "../../../../../../_metronic/_helpers";
import * as uiHelpers from "../AgreementsUIHelpers";
import * as columnFormatters from "./column-formatters";
import { Pagination } from "../../../../../../_metronic/_partials/controls";
import { useAgreementsUIContext } from "../AgreementsUIContext";

export function AgreementsTable() {
  // Agreements UI Context
  const agreementsUIContext = useAgreementsUIContext();
  const agreementsUIProps = useMemo(() => {
    return {
      ids: agreementsUIContext.ids,
      setIds: agreementsUIContext.setIds,
      queryParams: agreementsUIContext.queryParams,
      setQueryParams: agreementsUIContext.setQueryParams,
      openEditAgreementDialog: agreementsUIContext.openEditAgreementDialog,
      openDeleteAgreementDialog: agreementsUIContext.openDeleteAgreementDialog,
      openAgreementviewDialog:agreementsUIContext.  openAgreementviewDialog,
    };
  }, [agreementsUIContext]);

  // Getting curret state of agreements list from store (Redux)
  const { currentState } = useSelector(
    (state) => ({ currentState: state.agreements }),
    shallowEqual
  );
  // console.log("bh",currentState)
//  console.log(currentState)

  const { totalCount, entities, listLoading } = currentState;

  // Agreements Redux state
  const dispatch = useDispatch();
  useEffect(() => {
    // clear selections list
    agreementsUIProps.setIds([]);
    // server call by queryParams
    dispatch(actions.fetchAgreements(agreementsUIProps.queryParams));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [agreementsUIProps.queryParams, dispatch]);
  // Table columns
  const columns = [
   /*   {
      dataField: "agreementMasterId",
      text: "ID",
      sort: true,
      sortCaret: sortCaret,
      headerSortingClasses,
    }, */

    {
      dataField: "contractno",
      text: "Contract No",
      sort: true,
      sortCaret: sortCaret,
      headerSortingClasses,
    },
    {
      dataField: "sellerportfolio",
      text: "Seller",
      sort: true,
      sortCaret: sortCaret,
      headerSortingClasses,
    },
  
    {
      dataField: "buyerportfolio",
      text: "Buyer",
      sort: true,
      sortCaret: sortCaret,
      headerSortingClasses,
    },
    {
      dataField: "stratDate",
      text: "Start Date",
      sort: true,
      sortCaret: sortCaret,
      headerSortingClasses,
    },
    {
      dataField: "endDate",
      text: "End Date",
      sort: true,
      sortCaret: sortCaret,
      headerSortingClasses,
    },
 
    {
      dataField: "ltoano",
      text: "LTOA",
      sort: true,
      sortCaret: sortCaret,
      headerSortingClasses,
    },
 
    {
      dataField: "status",
      text: "Statuse",
      sort: true,
      sortCaret: sortCaret,
      headerSortingClasses,
    },
 
    {
      dataField: "agreementMasterId",
      text: "Actions",
      formatter: columnFormatters.ActionsColumnFormatter,
      formatExtraData: {
        openAgreementviewDialog: agreementsUIProps.openAgreementviewDialog,
        openEditAgreementDialog: agreementsUIProps.openEditAgreementDialog,
        openDeleteAgreementDialog: agreementsUIProps.openDeleteAgreementDialog,
      },
      classes: "text-right pr-0",
      headerClasses: "text-right pr-3",
      style: {
        minWidth: "200px",
      },
    },
  ];
  // Table pagination properties
  const paginationOptions = {
    custom: true,
    totalSize: totalCount,
    sizePerPageList: uiHelpers.sizePerPageList,
    sizePerPage: agreementsUIProps.queryParams.pageSize,
    page: agreementsUIProps.queryParams.pageNumber,
  };
  return (
    <>
      <PaginationProvider pagination={paginationFactory(paginationOptions)}>
        {({ paginationProps, paginationTableProps }) => {
          return (
            <Pagination
              isLoading={listLoading}
              paginationProps={paginationProps}
            >
              <BootstrapTable
                wrapperClasses="table-responsive"
                bordered={false}
                classes="table table-head-custom table-vertical-center overflow-hidden"
                bootstrap4
                remote
                keyField="agreementMasterId"
                data={entities === null ? [] : entities}
                columns={columns}
                defaultSorted={uiHelpers.defaultSorted}
                onTableChange={getHandlerTableChange(
                  agreementsUIProps.setQueryParams
                )}
                selectRow={getSelectRow({
                  entities,
                  ids: agreementsUIProps.ids,
                  setIds: agreementsUIProps.setIds,
                })}
                {...paginationTableProps}
              >
                <PleaseWaitMessage entities={entities} />
                <NoRecordsFoundMessage entities={entities} />
              </BootstrapTable>
            </Pagination>
          );
        }}
      </PaginationProvider>
    </>
  );
}
