import React, {createContext, useContext, useState, useCallback} from "react";
import {isEqual, isFunction} from "lodash";
import {initialFilter} from "./DiscomsUIHelpers";

const DiscomsUIContext = createContext();

export function useDiscomsUIContext() {
  return useContext(DiscomsUIContext);
}

export const DiscomsUIConsumer = DiscomsUIContext.Consumer;

export function DiscomsUIProvider({discomsUIEvents, children}) {
  const [queryParams, setQueryParamsBase] = useState(initialFilter);
  const [ids, setIds] = useState([]);
  const setQueryParams = useCallback(nextQueryParams => {
    setQueryParamsBase(prevQueryParams => {
      if (isFunction(nextQueryParams)) {
        nextQueryParams = nextQueryParams(prevQueryParams);
      }

      if (isEqual(prevQueryParams, nextQueryParams)) {
        return prevQueryParams;
      }

      return nextQueryParams;
    });
  }, []);

  const initDiscom = {
    discomMasterId: undefined,
    discomName: "",
    stateName: "",
    line:"",
   
   
  };

  const value = {
    queryParams,
    setQueryParamsBase,
    ids,
    setIds,
    setQueryParams,
    initDiscom,
    newDiscomButtonClick: discomsUIEvents.newDiscomButtonClick,
  /*   openViewDiscomDialog: discomsUIEvents.openViewDiscomDialog, */
    openEditDiscomDialog: discomsUIEvents.openEditDiscomDialog,
    openDeleteDiscomDialog: discomsUIEvents.openDeleteDiscomDialog,
    openDeleteDiscomsDialog: discomsUIEvents.openDeleteDiscomsDialog,
    openFetchDiscomsDialog: discomsUIEvents.openFetchDiscomsDialog,
    openUpdateDiscomsStatusDialog: discomsUIEvents.openUpdateDiscomsStatusDialog 
  };

  return <DiscomsUIContext.Provider value={value}>{children}</DiscomsUIContext.Provider>;
}