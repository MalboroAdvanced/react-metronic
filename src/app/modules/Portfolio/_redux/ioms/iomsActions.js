import * as requestFromServer from "./iomsCrud";
import {iomsSlice, callTypes} from "./iomsSlice";

const {actions} = iomsSlice;

export const fetchIoms = queryParams => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer
    .findIoms(queryParams)
    .then(response => {
      const { totalCount, entities } = response.data;
      // console.log("showalllist",response.data)
      dispatch(actions.iomsFetched({ totalCount, entities }));
    })
    .catch(error => {
      error.clientMessage = "Can't find ioms";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};

export const fetchIom = id => dispatch => {
  if (!id) {
    return dispatch(actions.iomFetched({ iomForEdit: undefined }));
  }

  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .getIomById(id)
    .then(response => {
      const iom = response.data;
  
      dispatch(actions.iomFetched({ iomForEdit: iom }));
    })
    .catch(error => {
      error.clientMessage = "Can't find iom";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const deleteIom = id => dispatch => {
  // console.log("popatlal",id)
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteIom(id)
    .then(response => {
      dispatch(actions.iomDeleted({ id }));
    })
    .catch(error => {
      // console.log(error)
      error.clientMessage = "Can't delete iom";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const createIom = iomForCreation => dispatch => {
  console.log("lala",iomForCreation)
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .createIom(iomForCreation)
    .then(response => {
      const { iom } = response.data;
      dispatch(actions.iomCreated({ iom }));
    })
    .catch(error => {
      console.log(error)
      error.clientMessage = "Can't create iom";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};


export const DateTime = iomForCreation => dispatch => {
  console.log("lala",iomForCreation)
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .DateTime(iomForCreation)
    .then(response => {
    
      const { iom } = response.data;
      dispatch(actions.iomCreated({ iom }));
    })
    .catch(error => {
      console.log(error)
      error.clientMessage = "Can't create iom";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};




export const createDateTime = iomForCreation => dispatch => {
  // console.log("lala",iomForCreation)
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .createDateTime(iomForCreation)
    .then(response => {
      // console.log("lala",response)
      // console.log("lal",response.data.details)
      // return response.data.details
      // const { iom } = response.data;
      // dispatch(actions.iomCreated({ iom }));
    })
    .catch(error => {
      console.log(error)
      error.clientMessage = "Can't create DateTime";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};


export const iomCompany = iom => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateIom(iom)
    .then(() => {
      dispatch(actions.iomUpdated({iom }));
    })
    .catch(error => {
      error.clientMessage = "Can't update company";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const updateIomsStatus = (ids, status) => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateStatusForIoms(ids, status)
    .then(() => {
      dispatch(actions.iomsStatusUpdated({ ids, status }));
    })
    .catch(error => {
      error.clientMessage = "Can't update companyies status";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const updateIom = (ids,iom) => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateIom(ids,iom)
    .then(() => {
      dispatch(actions.iomUpdated({ ids,iom }));
    })
    .catch(error => {
      error.clientMessage = "Can't update iom";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const deleteIoms = ids => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteIoms(ids)
    .then(() => {
      dispatch(actions.iomsDeleted({ ids }));
    })
    .catch(error => {
      error.clientMessage = "Can't delete ioms";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
