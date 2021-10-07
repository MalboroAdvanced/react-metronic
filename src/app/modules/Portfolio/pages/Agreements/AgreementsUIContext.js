import React, {createContext, useContext, useState, useCallback} from "react";
import {isEqual, isFunction} from "lodash";
import {initialFilter} from "./AgreementsUIHelpers";

const AgreementsUIContext = createContext();

export function useAgreementsUIContext() {
  return useContext(AgreementsUIContext);
}

export const AgreementsUIConsumer = AgreementsUIContext.Consumer;

export function AgreementsUIProvider({agreementsUIEvents, children}) {


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

  const initAgreement = {
    agreementMasterId:undefined,
    // agreementName: "",
    // agreementHO: "",
    // agreementAddress: "",
    // emailid: "",
    // phoneno: "",
    
    // joiningDate: ""





    stratDate:"",
    endDate:"",

buyerportfolio:"",
   sellerportfolio:"",
  
    applicationNo:"",
    approvalNo:"",
    contractType:"",
    transactionType:"",
    loiUniqueNo:"",
    firstRoute:"",
    secondRoute:"",
    thirdRoute:"",

bullingHead:"",
deliveryPoint:"",
tarrifAtDeliveryPoint:"",
dueDate:"",
provisionalBillingCycle:"",
rebate:"",
finalBillingCycle:"",
compensationPercent:"",
surcharge:"",
compensationRate:"",

margin:"",
billingSource:"",
    
   
  };
  const value = {
    queryParams,
    setQueryParamsBase,
    ids,
    setIds,
    setQueryParams,
    initAgreement,
    newAgreementButtonClick: agreementsUIEvents.newAgreementButtonClick,
    openEditAgreementDialog: agreementsUIEvents.openEditAgreementDialog,
    openAgreementviewDialog:agreementsUIEvents.openAgreementviewDialog,
    openDeleteAgreementDialog: agreementsUIEvents.openDeleteAgreementDialog,
    openDeleteAgreementsDialog: agreementsUIEvents.openDeleteAgreementsDialog,
    openFetchAgreemnetsDialog: agreementsUIEvents.openFetchAgreementsDialog,
    openUpdateAgreementsStatusDialog: agreementsUIEvents.openUpdateAgreementsStatusDialog 



  };

  return <AgreementsUIContext.Provider value={value}>{children}</AgreementsUIContext.Provider>;
}