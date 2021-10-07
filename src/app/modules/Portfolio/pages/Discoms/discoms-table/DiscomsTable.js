// React bootstrap table next =>
// DOCS: https://react-bootstrap-table.github.io/react-bootstrap-table2/docs/
// STORYBOOK: https://react-bootstrap-table.github.io/react-bootstrap-table2/storybook/index.html
import React, { useEffect, useMemo } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationProvider,
} from "react-bootstrap-table2-paginator";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/discoms/discomsActions";
import {
  getSelectRow,
  getHandlerTableChange,
  NoRecordsFoundMessage,
  PleaseWaitMessage,
  sortCaret,
  headerSortingClasses,
} from "../../../../../../_metronic/_helpers";
import * as uiHelpers from "../DiscomsUIHelpers";
import * as columnFormatters from "./column-formatters";
import { Pagination } from "../../../../../../_metronic/_partials/controls";
import { useDiscomsUIContext } from "../DiscomsUIContext";

export function DiscomsTable() {
  // Discoms UI Context
  const discomsUIContext = useDiscomsUIContext();
  const discomsUIProps = useMemo(() => {
    return {
      ids: discomsUIContext.ids,
      setIds: discomsUIContext.setIds,
      queryParams: discomsUIContext.queryParams,
      setQueryParams: discomsUIContext.setQueryParams,
      openEditDiscomDialog: discomsUIContext.openEditDiscomDialog,
      openDeleteDiscomDialog: discomsUIContext.openDeleteDiscomDialog,
    

    };
  }, [discomsUIContext]);

  // Getting curret state of discoms list from store (Redux)
  const { currentState } = useSelector(
    (state) => ({ currentState: state.discoms }),
    shallowEqual
  );
//  console.log(currentState)

  const { totalCount, entities, listLoading } = currentState;

  // Discoms Redux state
  const dispatch = useDispatch();
  useEffect(() => {
    // clear selections list
    discomsUIProps.setIds([]);
    // server call by queryParams
    dispatch(actions.fetchDiscoms(discomsUIProps.queryParams));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [discomsUIProps.queryParams, dispatch]);
  // Table columns
  const columns = [
   /*   {
      dataField: "discomMasterId",
      text: "ID",
      sort: true,
      sortCaret: sortCaret,
      headerSortingClasses,
    }, */

  /*   {
      dataField: "discomMasterId",
      text: "Discom ID",
      sort: true,
      sortCaret: sortCaret,
      headerSortingClasses,
    }, */
    {
      dataField: "stateName",
      text: "State Name",
      sort: true,
      sortCaret: sortCaret,
      headerSortingClasses,
    },
  
    {
      dataField: "discomName",
      text: "Discom Name",
      sort: true,
      sortCaret: sortCaret,
      headerSortingClasses,
    },
  
    {
      dataField: "line",
      text: "Line",
      sort: true,
      sortCaret: sortCaret,
      headerSortingClasses,
    },
  
    {
      dataField: "discomMasterId",
      text: "Actions",
      formatter: columnFormatters.ActionsColumnFormatter,
      formatExtraData: {
      
        openEditDiscomDialog: discomsUIProps.openEditDiscomDialog,
        openDeleteDiscomDialog: discomsUIProps.openDeleteDiscomDialog,
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
    sizePerPage: discomsUIProps.queryParams.pageSize,
    page: discomsUIProps.queryParams.pageNumber,
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
                keyField="discomMasterId"
                data={entities === null ? [] : entities}
                columns={columns}
                defaultSorted={uiHelpers.defaultSorted}
                onTableChange={getHandlerTableChange(
                  discomsUIProps.setQueryParams
                )}
                selectRow={getSelectRow({
                  entities,
                  ids: discomsUIProps.ids,
                  setIds: discomsUIProps.setIds,
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
