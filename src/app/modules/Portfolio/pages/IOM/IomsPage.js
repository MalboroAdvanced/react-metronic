import React from "react";
import { Route } from "react-router-dom";
import { IomsLoadingDialog } from "./ioms-loading-dialog/IomsLoadingDialog";
import { IomEditDialog } from "./iom-edit-dialog/IomEditDialog";
import { IomDeleteDialog } from "./iom-delete-dialog/IomDeleteDialog";
import { IomsDeleteDialog } from "./ioms-delete-dialog/IomsDeleteDialog";
import { IomsFetchDialog } from "./ioms-fetch-dialog/IomsFetchDialog";
import { IomsUpdateStateDialog } from "./ioms-update-status-dialog/IomsUpdateStateDialog";
import { IomsUIProvider } from "./IomsUIContext";
import  {IomsCard } from "./IomsCard";
import { IomViewDialog } from "./iom-view-dialog/IomViewDialog";
export function IomsPage({ history }) {



    
  const iomsUIEvents = {
    newIomButtonClick: () => {
      history.push("/portfolio/ioms/new");
    },
     openEditIomDialog: (id) => {
      history.push(`/portfolio/ioms/${id}/edit`);
    },



    openViewIomDialog: (id) => {
      history.push(`/portfolio/ioms/${id}/view`);
    },

    openDeleteIomDialog: (id) => {
      history.push(`/portfolio/ioms/${id}/delete`);
    },
    openDeleteIomsDialog: () => {
      history.push(`/portfolio/ioms/deleteioms`);
    },
    openFetchIomsDialog: () => {
      history.push(`/portfolio/ioms/fetch`);
    },
    openUpdateIomsStatusDialog: () => {
      history.push("/portfolio/ioms/updateStatus");
    } 
  }

  return (
      
    <IomsUIProvider iomsUIEvents={iomsUIEvents}>
 {/*  <CompaniesLoadingDialog />  */}
       <Route path="/portfolio/ioms/new">
        {({ history, match }) => (
          <IomEditDialog
            show={match != null}
            onHide={() => {
              history.push("/portfolio/ioms");
            }}
          />
        )}
      </Route> 
      <Route path="/portfolio/ioms/:id/view">
        {({ history, match }) => (
          <IomViewDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/portfolio/ioms");
            }}
          />
        )}
      </Route>
      <Route path="/portfolio/ioms/:id/edit">
        {({ history, match }) => (
          <IomEditDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/portfolio/ioms");
            }}
          />
        )}
      </Route>
      <Route path="/portfolio/ioms/:id/delete">
        {({ history, match }) => (
          <IomsDeleteDialog
            show={match != null}
            onHide={() => {
              history.push("/portfolio/ioms");
            }}
          />
        )}
      </Route>
      <Route path="/portfolio/ioms/:id/delete">
        {({ history, match }) => (
          <IomDeleteDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/portfolio/ioms");
            }}
          />
        )}
      </Route>
      <Route path="/portfolio/ioms/fetch">
        {({ history, match }) => (
          <IomsFetchDialog
            show={match != null}
            onHide={() => {
              history.push("/portfolio/ioms");
            }}
          />
        )}
      </Route>
      <Route path="/portfolio/ioms/updateStatus">
        {({ history, match }) => (
          <IomsUpdateStateDialog
            show={match != null}
            onHide={() => {
              history.push("/portfolio/ioms");
            }}
          />
        )}
      </Route>
      <IomsCard />
    </IomsUIProvider>
  );
}
