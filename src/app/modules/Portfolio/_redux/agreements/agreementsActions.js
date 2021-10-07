import * as requestFromServer from "./agreementsCrud";
import {agreementsSlice, callTypes} from "./agreementsSlice";

const {actions} = agreementsSlice;

export const fetchAgreements = queryParams => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer
    .findAgreements(queryParams)
    .then(response => {
      const { totalCount, entities } = response.data;
      dispatch(actions.agreementsFetched({ totalCount, entities }));
    })
    .catch(error => {
      error.clientMessage = "Can't find agreementies";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};

export const fetchAgreement = agreementMasterId => dispatch => {
  if (!agreementMasterId) {
    return dispatch(actions.agreementFetched({ agreementForEdit: undefined }));
  }

  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .getAgreementById(agreementMasterId)
    .then(response => {
      const agreement = response.data;
      dispatch(actions.agreementFetched({ agreementForEdit: agreement }));
    })
    .catch(error => {
      error.clientMessage = "Can't find agreement";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const fetchAgreementDetails = agreementMasterId => dispatch => {
  if (!agreementMasterId) {
    return dispatch(actions.agreementFetched({ agreementForEdit: undefined }));
  }

  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .getAgreementDetailsById(agreementMasterId)
    .then(response => {
      const agreement = response.data;
      dispatch(actions.agreementFetched({ agreementForEdit: agreement }));
    })
    .catch(error => {
      error.clientMessage = "Can't find agreement";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};


// export const fetchRedux = MasterId => dispatch => {
//   if (!MasterId) {
//     return dispatch(actions.agreementFetched({ agreementForEdit: undefined }));
//   }

//   dispatch(actions.startCall({ callType: callTypes.action }));
//   return requestFromServer

//     .then(response => {
//       const agreement = response.data;
//       console.log(agreement)
//       dispatch(actions.agreementFetched({ agreementForEdit: agreement }));
//     })
//     .catch(error => {
//       error.clientMessage = "Can't find agreement";
//       dispatch(actions.catchError({ error, callType: callTypes.action }));
//     });
// };


export const deleteAgreement = agreementMasterId => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteAgreement(agreementMasterId)
    .then(response => {
      dispatch(actions.agreementDeleted({ agreementMasterId }));
    })
    .catch(error => {
      error.clientMessage = "Can't delete agreement";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const createAgreement = agreementForCreation => dispatch => {
  // alert(agreementForCreation)
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .createAgreement(agreementForCreation)
    .then(response => {
      const { agreement } = response.data;
      console.log("responce",response)
      dispatch(actions.agreementCreated({ agreement }));
    })
    .catch(error => {
      error.clientMessage = "Can't create agreement";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const updateAgreement = (ids,agreement) => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateAgreement(ids,agreement)
    .then(() => {
      dispatch(actions.agreementUpdated({ ids,agreement }));
    })
    .catch(error => {
      error.clientMessage = "Can't update agreement";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const updateAgreementsStatus = (ids, status) => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateStatusForAgreements(ids, status)
    .then(() => {
      dispatch(actions.agreementsStatusUpdated({ ids, status }));
    })
    .catch(error => {
      error.clientMessage = "Can't update agreementies status";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const deleteAgreements = ids => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteAgreements(ids)
    .then(() => {
      dispatch(actions.agreementsDeleted({ ids }));
    })
    .catch(error => {
      error.clientMessage = "Can't delete agreementies";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const getRegionForState = queryParams => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer
    .findRegionForState(queryParams)
    .then(response => {
      console.log(response.data);
      const { mainregionName } = response.data;
      return mainregionName;
      //alert(mainregionName);
     // dispatch(actions.agreementsFetched({ totalCount, entities }));
    })
    .catch(error => {
      error.clientMessage = "Can't find agreementies";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};
