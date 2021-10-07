// React bootstrap table next =>
// DOCS: https://react-bootstrap-table.github.io/react-bootstrap-table2/docs/
// STORYBOOK: https://react-bootstrap-table.github.io/react-bootstrap-table2/storybook/index.html
import React, { useEffect, useMemo } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationProvider,
} from "react-bootstrap-table2-paginator";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/ioms/iomsActions";
import ViewListIcon from '@material-ui/icons/ViewList';
import {
  getSelectRow,
  getHandlerTableChange,
  NoRecordsFoundMessage,
  PleaseWaitMessage,
  sortCaret,
  headerSortingClasses,
} from "../../../../../../_metronic/_helpers";
import * as uiHelpers from "../IomsUIHelpers";
import * as columnFormatters from "./column-formatters";
import * as rowFormatter from "./row-formatter";
import { Pagination } from "../../../../../../_metronic/_partials/controls";
import { useIomsUIContext } from "../IomsUIContext";

export function IomsTable() {
  // Companies UI Context
  const iomsUIContext = useIomsUIContext();

  const iomsUIProps = useMemo(() => {
    return {
      ids: iomsUIContext.ids,
      setIds: iomsUIContext.setIds,
      queryParams: iomsUIContext.queryParams,
      setQueryParams: iomsUIContext.setQueryParams,
      openEditIomDialog: iomsUIContext. openEditIomDialog,
      openDeleteIomDialog: iomsUIContext.openDeleteIomDialog,
      openViewIomDialog:iomsUIContext.openViewIomDialog,
    };
  }, [iomsUIContext]);
 
  // Getting curret state of companies list from store (Redux)
  const { currentState } = useSelector(
    (state) => ({ currentState: state.ioms }),
    shallowEqual
  );

//  console.log(currentState)

  const { totalCount, entities, listLoading } = currentState;


  // Companies Redux state
  const dispatch = useDispatch();
  useEffect(() => {
    // clear selections list
    iomsUIProps.setIds([]);
    // server call by queryParams
    dispatch(actions.fetchIoms(iomsUIProps.queryParams));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [iomsUIProps.queryParams, dispatch]);
  // Table columns
  const columns = [
   
    {
      dataField: "iomNumber",
      text: "IOM Number",
      sort: true,
      sortCaret: sortCaret,
      headerSortingClasses,
    },
    {
      dataField: "sellerPortfolio",
      text: "Iom Seller",
      sort: true,
      sortCaret: sortCaret,
      headerSortingClasses,
    },
    {
      dataField: "buyerPortfolio",
      text: "Iom Buyer",
      sort: true,
      sortCaret: sortCaret,
      headerSortingClasses,
    },
    {
      dataField: "fromDate",
      text: "From Date",
      sort: true,
      sortCaret: sortCaret,
      headerSortingClasses,
    },
  /*   {
      dataField: "gender",
      text: "Gender",
      sort: false,
      sortCaret: sortCaret,
    }, */
    {
      dataField: "toDate",
      text: "To Date",
      sort: true,
      sortCaret: sortCaret,
     /*  formatter: columnFormatters.StatusColumnFormatter,
      headerSortingClasses, */
    },
    {
      dataField: "quantum",
      text: "Quantum",
      sort: true,
      sortCaret: sortCaret,
     /*  formatter: columnFormatters.StatusColumnFormatter,
      headerSortingClasses, */
    },
    {
      dataField: "contractType",
      text: "Contract Type",
      sort: true,
      sortCaret: sortCaret,
     /*  formatter: columnFormatters.StatusColumnFormatter,
      headerSortingClasses, */
    },
    {
      dataField: "id",
      text: "Details",
      formatter: rowFormatter.ActionsColumnFormatter,
      formatExtraData: {
        openViewIomDialog:iomsUIProps.  openViewIomDialog,
        // openDeleteIomDialog: iomsUIProps.openDeleteIomDialog,
      },
      classes: "text-right pr-0",
      headerClasses: "text-right pr-3",
      style: {
        minWidth: "100px",
      },
    },
    {
      dataField: "id",
      text: "Actions",
      formatter: columnFormatters.ActionsColumnFormatter,
      formatExtraData: {
        // openViewIomDialog:iomsUIProps.  openViewIomDialog,
        openViewIomDialog:iomsUIProps.  openViewIomDialog,
        openEditIomDialog:iomsUIProps.openEditIomDialog,
        openDeleteIomDialog: iomsUIProps.openDeleteIomDialog,
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
    sizePerPage:iomsUIProps.queryParams.pageSize,
    page:iomsUIProps.queryParams.pageNumber,
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
                keyField="id"
                data={entities === null ? [] : entities}
                columns={columns}
                defaultSorted={uiHelpers.defaultSorted}
                onTableChange={getHandlerTableChange(
                  iomsUIProps.setQueryParams
                )}
                selectRow={getSelectRow({
                  entities,
                  ids: iomsUIProps.ids,
                  setIds: iomsUIProps.setIds,
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
