import React from "react";
import { Route } from "react-router-dom";
import { AgreementsLoadingDialog } from "./agreements-loading-dialog/AgreementsLoadingDialog";
import { AgreementEditDialog } from "./agreement-edit-dialog/AgreementEditDialog";
import { AgreementDeleteDialog } from "./agreement-delete-dialog/AgreementDeleteDialog";
import { AgreementsDeleteDialog } from "./agreements-delete-dialog/AgreementsDeleteDialog";
import { AgreementsFetchDialog } from "./agreements-fetch-dialog/AgreementsFetchDialog";
import { AgreementsUpdateStateDialog } from "./agreements-update-status-dialog/AgreementsUpdateStateDialog";
import { AgreementsUIProvider } from "./AgreementsUIContext";
import { AgreementsCard } from "./AgreementsCard";
import {AgreementviewEditDialog} from "./agreement-view-list/AgreementviewEditDialog"
export function AgreementsPage({ history }) {



    
  const agreementsUIEvents = {
    newAgreementButtonClick: () => {
      history.push("/portfolio/agreements/new");
    },
     openEditAgreementDialog: (agreementMasterId) => {
      history.push(`/portfolio/agreements/${agreementMasterId}/edit`);
    },


    openAgreementviewDialog: (agreementMasterId) => {
      history.push(`/portfolio/agreements/${agreementMasterId}/view`);
    },





    openDeleteAgreementDialog: (agreementMasterId) => {
      history.push(`/portfolio/agreements/${agreementMasterId}/delete`);
    },
    openDeleteAgreementsDialog: () => {
      history.push(`/portfolio/agreements/deleteAgreements`);
    },
    openFetchAgreementsDialog: () => {
      history.push(`/portfolio/agreements/fetch`);
    },
    openUpdateAgreementsStatusDialog: () => {
      history.push("/portfolio/agreements/updateStatus");
    } 
  }

  return (
      
    <AgreementsUIProvider agreementsUIEvents={agreementsUIEvents}>
 {/*  <AgreementsLoadingDialog />  */}
       <Route path="/portfolio/agreements/new">
        {({ history, match }) => (
          <AgreementEditDialog
            show={match != null}
            onHide={() => {
              history.push("/portfolio/agreements");
            }}
          />
        )}
      </Route> 
      <Route path="/portfolio/agreements/:agreementMasterId/edit">
        {({ history, match }) => (
          <AgreementEditDialog
            show={match != null}
            agreementMasterId={match && match.params.agreementMasterId}
            onHide={() => {
              history.push("/portfolio/agreements");
            }}
          />
        )}
      </Route>



      <Route path="/portfolio/agreements/:agreementMasterId/view">
        {({ history, match }) => (
          <AgreementviewEditDialog
            show={match != null}
            agreementMasterId={match && match.params.agreementMasterId}
            onHide={() => {
              history.push("/portfolio/agreements");
            }}
          />
        )}
      </Route>



      <Route path="/portfolio/agreements/deleteAgreements">
        {({ history, match }) => (
          <AgreementsDeleteDialog
            show={match != null}
            onHide={() => {
              history.push("/portfolio/agreements");
            }}
          />
        )}
      </Route>
      
      <Route path="/portfolio/agreements/:agreementMasterId/delete">
        {({ history, match }) => (
          <AgreementDeleteDialog
            show={match != null}
            agreementMasterId={match && match.params.agreementMasterId}
            onHide={() => {
              history.push("/portfolio/agreements");
            }}
          />
        )}
      </Route>
      
      <Route path="/portfolio/agreements/fetch">
        {({ history, match }) => (
          <AgreementsFetchDialog
            show={match != null}
            onHide={() => {
              history.push("/portfolio/agreements");
            }}
          />
        )}
      </Route>
      <Route path="/portfolio/agreements/updateStatus">
        {({ history, match }) => (
          <AgreementsUpdateStateDialog
            show={match != null}
            onHide={() => {
              history.push("/portfolio/agreements");
            }}
          />
        )}
      </Route>       <AgreementsCard />
    </AgreementsUIProvider>
  );
}
