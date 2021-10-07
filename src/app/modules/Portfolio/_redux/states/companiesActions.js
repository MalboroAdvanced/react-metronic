import * as requestFromServer from "./companiesCrud";
import {companiesSlice, callTypes} from "./companiesSlice";

const {actions} = companiesSlice;

export const fetchCompanies = queryParams => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer
    .findCompanies(queryParams)
    .then(response => {
      const { totalCount, entities } = response.data;
     
      dispatch(actions.companiesFetched({ totalCount, entities }));
    })
    .catch(error => {
      error.clientMessage = "Can't find companyies";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};

export const fetchCompany = companyMasterId => dispatch => {
  if (!companyMasterId) {
    return dispatch(actions.companyFetched({ companyForEdit: undefined }));
  }

  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .getCompanyById(companyMasterId)
    .then(response => {
      const company = response.data;
      dispatch(actions.companyFetched({ companyForEdit: company }));
    })
    .catch(error => {
      error.clientMessage = "Can't find company";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const deleteCompany = companyMasterId => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteCompany(companyMasterId)
    .then(response => {
      dispatch(actions.companyDeleted({ companyMasterId }));
    })
    .catch(error => {
      error.clientMessage = "Can't delete company";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const createCompany = companyForCreation => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .createCompany(companyForCreation)
    .then(response => {
      const { company } = response.data;
      dispatch(actions.companyCreated({ company }));
    })
    .catch(error => {
      error.clientMessage = "Can't create company";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const updateCompany = company => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateCompany(company)
    .then(() => {
      dispatch(actions.companyUpdated({ company }));
    })
    .catch(error => {
      error.clientMessage = "Can't update company";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const updateCompaniesStatus = (ids, status) => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateStatusForCompanies(ids, status)
    .then(() => {
      dispatch(actions.companiesStatusUpdated({ ids, status }));
    })
    .catch(error => {
      error.clientMessage = "Can't update companyies status";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const deleteCompanies = ids => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteCompanies(ids)
    .then(() => {
      dispatch(actions.companiesDeleted({ ids }));
    })
    .catch(error => {
      error.clientMessage = "Can't delete companyies";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
