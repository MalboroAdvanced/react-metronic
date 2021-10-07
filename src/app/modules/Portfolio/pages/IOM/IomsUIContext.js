import React, {createContext, useContext, useState, useCallback} from "react";
import {isEqual, isFunction} from "lodash";
import {initialFilter} from "./IomsUIHelpers";

const IomsUIContext = createContext();

export function useIomsUIContext() {
  return useContext(IomsUIContext);
}

export const IomsUIConsumer = IomsUIContext.Consumer;

export function IomsUIProvider({iomsUIEvents, children}) {
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

  const initIom = {
  id: undefined,
    iomNumber: "",
    sellerPortfolio: "",
    buyerPortfolio: "",
    fromDate: "",
    toDate: "",
    quantum:"",
    contractType:"",

    
   
  };

  const value = {
    queryParams,
    setQueryParamsBase,
    ids,
    setIds,
    setQueryParams,
    initIom,
    newIomButtonClick: iomsUIEvents.newIomButtonClick,
    openEditIomDialog: iomsUIEvents.openEditIomDialog,
    openViewIomDialog: iomsUIEvents.openViewIomDialog,
    openDeleteIomDialog: iomsUIEvents.openDeleteIomDialog,
    openDeleteIomsDialog: iomsUIEvents.openDeleteIomsDialog,
    openFetchIomsDialog: iomsUIEvents.openFetchIomsDialog,
    openUpdateIomsStatusDialog: iomsUIEvents.openUpdateIomsStatusDialog 
  };

  return <IomsUIContext.Provider value={value}>{children}</IomsUIContext.Provider>;
}