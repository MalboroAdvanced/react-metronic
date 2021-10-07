// React bootstrap table next =>
// DOCS: https://react-bootstrap-table.github.io/react-bootstrap-table2/docs/
// STORYBOOK: https://react-bootstrap-table.github.io/react-bootstrap-table2/storybook/index.html
import React, { useEffect, useMemo } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationProvider,
} from "react-bootstrap-table2-paginator";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/portfolios/portfoliosActions";
import {
  getSelectRow,
  getHandlerTableChange,
  NoRecordsFoundMessage,
  PleaseWaitMessage,
  sortCaret,
  headerSortingClasses,
} from "../../../../../../_metronic/_helpers";
import * as uiHelpers from "../PortfoliosUIHelpers";
import * as columnFormatters from "./column-formatters";
import { Pagination } from "../../../../../../_metronic/_partials/controls";
import { usePortfoliosUIContext } from "../PortfoliosUIContext";

export function PortfoliosTable() {
  // Portfolios UI Context
  const portfoliosUIContext = usePortfoliosUIContext();
  const portfoliosUIProps = useMemo(() => {
    return {
      ids: portfoliosUIContext.ids,
      setIds: portfoliosUIContext.setIds,
      queryParams: portfoliosUIContext.queryParams,
      setQueryParams: portfoliosUIContext.setQueryParams,
      openEditPortfolioDialog: portfoliosUIContext.openEditPortfolioDialog,
      openDeletePortfolioDialog: portfoliosUIContext.openDeletePortfolioDialog,
      openViewPortfolioDialog: portfoliosUIContext.openViewPortfolioDialog,

    };
  }, [portfoliosUIContext]);

  // Getting curret state of portfolios list from store (Redux)
  const { currentState } = useSelector(
    (state) => ({ currentState: state.portfolios }),
    shallowEqual
  );
//  console.log(currentState)

  const { totalCount, entities, listLoading } = currentState;

  // Portfolios Redux state
  const dispatch = useDispatch();
  useEffect(() => {
    // clear selections list
    portfoliosUIProps.setIds([]);
    // server call by queryParams
    dispatch(actions.fetchPortfolios(portfoliosUIProps.queryParams));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [portfoliosUIProps.queryParams, dispatch]);
  // Table columns
  const columns = [
   /*   {
      dataField: "portfolioMasterId",
      text: "ID",
      sort: true,
      sortCaret: sortCaret,
      headerSortingClasses,
    }, */

    {
      dataField: "portfolioId",
      text: "Portfolio ID",
      sort: true,
      sortCaret: sortCaret,
      headerSortingClasses,
    },
    {
      dataField: "portfolioName",
      text: "Portfolio Name",
      sort: true,
      sortCaret: sortCaret,
      headerSortingClasses,
    },
  
    {
      dataField: "portfolioAddress",
      text: "Address",
      sort: true,
      sortCaret: sortCaret,
      headerSortingClasses,
    },
    {
      dataField: "shortName",
      text: "Short Name",
      sort: true,
      sortCaret: sortCaret,
      headerSortingClasses,
    },
 
    {
      dataField: "joiningDate",
      text: "Joining Date",
      sort: true,
      sortCaret: sortCaret,
     /*  formatter: columnFormatters.StatusColumnFormatter,
      headerSortingClasses, */
    },
    {
      dataField: "portfolioMasterId",
      text: "Actions",
      formatter: columnFormatters.ActionsColumnFormatter,
      formatExtraData: {
        openViewPortfolioDialog: portfoliosUIProps.openViewPortfolioDialog,
        openEditPortfolioDialog: portfoliosUIProps.openEditPortfolioDialog,
        openDeletePortfolioDialog: portfoliosUIProps.openDeletePortfolioDialog,
      },
      classes: "text-right pr-0",
      headerClasses: "text-right pr-3",
      style: {
        minWidth: "100px",
      },
    },
  ];
  // Table pagination properties
  const paginationOptions = {
    custom: true,
    totalSize: totalCount,
    sizePerPageList: uiHelpers.sizePerPageList,
    sizePerPage: portfoliosUIProps.queryParams.pageSize,
    page: portfoliosUIProps.queryParams.pageNumber,
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
                keyField="portfolioMasterId"
                data={entities === null ? [] : entities}
                columns={columns}
                defaultSorted={uiHelpers.defaultSorted}
                onTableChange={getHandlerTableChange(
                  portfoliosUIProps.setQueryParams
                )}
                selectRow={getSelectRow({
                  entities,
                  ids: portfoliosUIProps.ids,
                  setIds: portfoliosUIProps.setIds,
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
