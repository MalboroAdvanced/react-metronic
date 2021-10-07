import * as requestFromServer from "./portfoliosCrud";
import {portfoliosSlice, callTypes} from "./portfoliosSlice";

const {actions} = portfoliosSlice;

export const fetchPortfolios = queryParams => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer
    .findPortfolios(queryParams)
    .then(response => {
      const { totalCount, entities } = response.data;
      dispatch(actions.portfoliosFetched({ totalCount, entities }));
    })
    .catch(error => {
      error.clientMessage = "Can't find portfolioies";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};

export const fetchPortfolio = portfolioMasterId => dispatch => {
  if (!portfolioMasterId) {
    return dispatch(actions.portfolioFetched({ portfolioForEdit: undefined }));
  }

  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .getPortfolioById(portfolioMasterId)
    .then(response => {
      const portfolio = response.data;
      dispatch(actions.portfolioFetched({ portfolioForEdit: portfolio }));
    })
    .catch(error => {
      error.clientMessage = "Can't find portfolio";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const fetchPortfolioDetails = portfolioMasterId => dispatch => {
  if (!portfolioMasterId) {
    return dispatch(actions.portfolioFetched({ portfolioForEdit: undefined }));
  }

  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .getPortfolioDetailsById(portfolioMasterId)
    .then(response => {
      const portfolio = response.data;
      dispatch(actions.portfolioFetched({ portfolioForEdit: portfolio }));
    })
    .catch(error => {
      error.clientMessage = "Can't find portfolio";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const deletePortfolio = portfolioMasterId => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deletePortfolio(portfolioMasterId)
    .then(response => {
      dispatch(actions.portfolioDeleted({ portfolioMasterId }));
    })
    .catch(error => {
      error.clientMessage = "Can't delete portfolio";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const createPortfolio = portfolioForCreation => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .createPortfolio(portfolioForCreation)
    .then(response => {
      const { portfolio } = response.data;
      dispatch(actions.portfolioCreated({ portfolio }));
    })
    .catch(error => {
      error.clientMessage = "Can't create portfolio";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const updatePortfolio = portfolio => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updatePortfolio(portfolio)
    .then(() => {
      dispatch(actions.portfolioUpdated({ portfolio }));
    })
    .catch(error => {
      error.clientMessage = "Can't update portfolio";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const updatePortfoliosStatus = (ids, status) => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateStatusForPortfolios(ids, status)
    .then(() => {
      dispatch(actions.portfoliosStatusUpdated({ ids, status }));
    })
    .catch(error => {
      error.clientMessage = "Can't update portfolioies status";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const deletePortfolios = ids => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deletePortfolios(ids)
    .then(() => {
      dispatch(actions.portfoliosDeleted({ ids }));
    })
    .catch(error => {
      error.clientMessage = "Can't delete portfolioies";
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
     // dispatch(actions.portfoliosFetched({ totalCount, entities }));
    })
    .catch(error => {
      error.clientMessage = "Can't find portfolioies";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};
export const getDiscomForState = queryParams => dispatch => {
 
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer
    .findDiscomForState(queryParams)
    .then(response => {
      console.log(response.data);
      //const {discomName } = response.data;
     // return discomName;

    
      var dd;
      let initialStates = [];
      let initialStates1 = [];
      var d=response.data;
     // alert(d)
    
       initialStates = d.map((states) => {
          return states
      });
      // alert('dd '+JSON.stringify(dd));
       alert(initialStates)
    
      initialStates.forEach((repo) => {
          var st_id=repo['discomName'];
          var st_name=repo['discomName'];
        //  let object = {id: st_id, name: st_name};
          initialStates1.push(st_name);
          /* Object.entries(repo).forEach(([key, value]) => {
            console.log(`${key}: ${value}`);
          });*/
        }); 
   
  
  alert(initialStates1)

  return initialStates1;

      //alert(mainregionName);
     // dispatch(actions.portfoliosFetched({ totalCount, entities }));
    })
    .catch(error => {
      error.clientMessage = "Can't find discomName";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};
