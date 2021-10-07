import * as requestFromServer from "./discomsCrud";
import {discomsSlice, callTypes} from "./discomsSlice";

const {actions} = discomsSlice;

export const fetchDiscoms = queryParams => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer
    .findDiscoms(queryParams)
    .then(response => {
      const { totalCount, entities } = response.data;
      dispatch(actions.discomsFetched({ totalCount, entities }));
    })
    .catch(error => {
      error.clientMessage = "Can't find discomies";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};

export const fetchDiscom = discomMasterId => dispatch => {
  if (!discomMasterId) {
    return dispatch(actions.discomFetched({ discomForEdit: undefined }));
  }

  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .getDiscomById(discomMasterId)
    .then(response => {
      const discom = response.data;
      dispatch(actions.discomFetched({ discomForEdit: discom }));
    })
    .catch(error => {
      error.clientMessage = "Can't find discom";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const fetchDiscomDetails = discomMasterId => dispatch => {
  if (!discomMasterId) {
    return dispatch(actions.discomFetched({ discomForEdit: undefined }));
  }

  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .getDiscomDetailsById(discomMasterId)
    .then(response => {
      const discom = response.data;
      dispatch(actions.discomFetched({ discomForEdit: discom }));
    })
    .catch(error => {
      error.clientMessage = "Can't find discom";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const deleteDiscom = discomMasterId => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteDiscom(discomMasterId)
    .then(response => {
      dispatch(actions.discomDeleted({ discomMasterId }));
    })
    .catch(error => {
      error.clientMessage = "Can't delete discom";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const createDiscom = discomForCreation => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .createDiscom(discomForCreation)
    .then(response => {
      const { discom } = response.data;
      dispatch(actions.discomCreated({ discom }));
    })
    .catch(error => {
      error.clientMessage = "Can't create discom";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const updateDiscom = discom => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateDiscom(discom)
    .then(() => {
      dispatch(actions.discomUpdated({ discom }));
    })
    .catch(error => {
      error.clientMessage = "Can't update discom";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const updateDiscomsStatus = (ids, status) => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateStatusForDiscoms(ids, status)
    .then(() => {
      dispatch(actions.discomsStatusUpdated({ ids, status }));
    })
    .catch(error => {
      error.clientMessage = "Can't update discomies status";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const deleteDiscoms = ids => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteDiscoms(ids)
    .then(() => {
      dispatch(actions.discomsDeleted({ ids }));
    })
    .catch(error => {
      error.clientMessage = "Can't delete discomies";
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
     // dispatch(actions.discomsFetched({ totalCount, entities }));
    })
    .catch(error => {
      error.clientMessage = "Can't find discomies";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};
