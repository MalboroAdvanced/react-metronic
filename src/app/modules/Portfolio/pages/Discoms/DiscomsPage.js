import React from "react";
import { Route } from "react-router-dom";
import { DiscomsLoadingDialog } from "./discoms-loading-dialog/DiscomsLoadingDialog";
import { DiscomEditDialog } from "./discom-edit-dialog/DiscomEditDialog";
import { DiscomDeleteDialog } from "./discom-delete-dialog/DiscomDeleteDialog";
import { DiscomsDeleteDialog } from "./discoms-delete-dialog/DiscomsDeleteDialog";
import { DiscomsFetchDialog } from "./discoms-fetch-dialog/DiscomsFetchDialog";
import { DiscomsUpdateStateDialog } from "./discoms-update-status-dialog/DiscomsUpdateStateDialog";
import { DiscomsUIProvider } from "./DiscomsUIContext";
import { DiscomsCard } from "./DiscomsCard";

/* import { DiscomViewDialog } from "./discom-view-dialog/DiscomViewDialog"; */

export function DiscomsPage({ history }) {



    
  const discomsUIEvents = {
    newDiscomButtonClick: () => {
      history.push("/portfolio/discom/new");
    },
     openEditDiscomDialog: (discomMasterId) => {
      history.push(`/portfolio/discom/${discomMasterId}/edit`);
    },


    openViewDiscomDialog: (discomMasterId) => {
      history.push(`/portfolio/discom/${discomMasterId}/view`);
    },

    openDeleteDiscomDialog: (discomMasterId) => {
      history.push(`/portfolio/discom/${discomMasterId}/delete`);
    },
    openDeleteDiscomsDialog: () => {
      history.push(`/portfolio/discom/deleteDiscoms`);
    },
    openFetchDiscomsDialog: () => {
      history.push(`/portfolio/discom/fetch`);
    },
    openUpdateDiscomsStatusDialog: () => {
      history.push("/portfolio/discom/updateStatus");
    } 
  }

  return (
      
    <DiscomsUIProvider discomsUIEvents={discomsUIEvents}>
 {/*  <DiscomsLoadingDialog />  */}
       <Route path="/portfolio/discom/new">
        {({ history, match }) => (
          <DiscomEditDialog
            show={match != null}
            onHide={() => {
              history.push("/portfolio/discom");
            }}
          />
        )}
      </Route> 
      <Route path="/portfolio/discom/:discomMasterId/edit">
        {({ history, match }) => (
          <DiscomEditDialog
            show={match != null}
            discomMasterId={match && match.params.discomMasterId}
            onHide={() => {
              history.push("/portfolio/discom");
            }}
          />
        )}
      </Route>


{/* 
      <Route path="/portfolio/discom/:discomMasterId/view">
        {({ history, match }) => (
          <DiscomViewDialog
            show={match != null}
            discomMasterId={match && match.params.discomMasterId}
            onHide={() => {
              history.push("/portfolio/discom");
            }}
          />
        )}
      </Route> */}



      <Route path="/portfolio/discom/deleteDiscoms">
        {({ history, match }) => (
          <DiscomsDeleteDialog
            show={match != null}
            onHide={() => {
              history.push("/portfolio/discom");
            }}
          />
        )}
      </Route>
      {/*
      <Route path="/portfolio/discom/:discomMasterId/delete">
        {({ history, match }) => (
          <DiscomDeleteDialog
            show={match != null}
            discomMasterId={match && match.params.discomMasterId}
            onHide={() => {
              history.push("/portfolio/discom");
            }}
          />
        )}
      </Route>
      <Route path="/portfolio/discom/fetch">
        {({ history, match }) => (
          <DiscomsFetchDialog
            show={match != null}
            onHide={() => {
              history.push("/portfolio/discom");
            }}
          />
        )}
      </Route>
      <Route path="/portfolio/discom/updateStatus">
        {({ history, match }) => (
          <DiscomsUpdateStateDialog
            show={match != null}
            onHide={() => {
              history.push("/portfolio/discom");
            }}
          />
        )}
      </Route> */}
      <DiscomsCard />
    </DiscomsUIProvider>
  );
}
