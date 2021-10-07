import React from "react";
import { Route } from "react-router-dom";
import { PortfoliosLoadingDialog } from "./portfolios-loading-dialog/PortfoliosLoadingDialog";
import { PortfolioEditDialog } from "./portfolio-edit-dialog/PortfolioEditDialog";
import { PortfolioDeleteDialog } from "./portfolio-delete-dialog/PortfolioDeleteDialog";
import { PortfoliosDeleteDialog } from "./portfolios-delete-dialog/PortfoliosDeleteDialog";
import { PortfoliosFetchDialog } from "./portfolios-fetch-dialog/PortfoliosFetchDialog";
import { PortfoliosUpdateStateDialog } from "./portfolios-update-status-dialog/PortfoliosUpdateStateDialog";
import { PortfoliosUIProvider } from "./PortfoliosUIContext";
import { PortfoliosCard } from "./PortfoliosCard";

import { PortfolioViewDialog } from "./portfolio-view-dialog/PortfolioViewDialog";

export function PortfoliosPage({ history }) {



    
  const portfoliosUIEvents = {
    newPortfolioButtonClick: () => {
      history.push("/portfolio/portfolios/new");
    },
     openEditPortfolioDialog: (portfolioMasterId) => {
      history.push(`/portfolio/portfolios/${portfolioMasterId}/edit`);
    },


    openViewPortfolioDialog: (portfolioMasterId) => {
      history.push(`/portfolio/portfolios/${portfolioMasterId}/view`);
    },

    openDeletePortfolioDialog: (portfolioMasterId) => {
      history.push(`/portfolio/portfolios/${portfolioMasterId}/delete`);
    },
    openDeletePortfoliosDialog: () => {
      history.push(`/portfolio/portfolios/deletePortfolios`);
    },
    openFetchPortfoliosDialog: () => {
      history.push(`/portfolio/portfolios/fetch`);
    },
    openUpdatePortfoliosStatusDialog: () => {
      history.push("/portfolio/portfolios/updateStatus");
    } 
  }

  return (
      
    <PortfoliosUIProvider portfoliosUIEvents={portfoliosUIEvents}>
 {/*  <PortfoliosLoadingDialog />  */}
       <Route path="/portfolio/portfolios/new">
        {({ history, match }) => (
          <PortfolioEditDialog
            show={match != null}
            onHide={() => {
              history.push("/portfolio/portfolios");
            }}
          />
        )}
      </Route> 
      <Route path="/portfolio/portfolios/:portfolioMasterId/edit">
        {({ history, match }) => (
          <PortfolioEditDialog
            show={match != null}
            portfolioMasterId={match && match.params.portfolioMasterId}
            onHide={() => {
              history.push("/portfolio/portfolios");
            }}
          />
        )}
      </Route>



      <Route path="/portfolio/portfolios/:portfolioMasterId/view">
        {({ history, match }) => (
          <PortfolioViewDialog
            show={match != null}
            portfolioMasterId={match && match.params.portfolioMasterId}
            onHide={() => {
              history.push("/portfolio/portfolios");
            }}
          />
        )}
      </Route>



      <Route path="/portfolio/portfolios/deletePortfolios">
        {({ history, match }) => (
          <PortfoliosDeleteDialog
            show={match != null}
            onHide={() => {
              history.push("/portfolio/portfolios");
            }}
          />
        )}
      </Route>
      {/*
      <Route path="/portfolio/portfolios/:portfolioMasterId/delete">
        {({ history, match }) => (
          <PortfolioDeleteDialog
            show={match != null}
            portfolioMasterId={match && match.params.portfolioMasterId}
            onHide={() => {
              history.push("/portfolio/portfolios");
            }}
          />
        )}
      </Route>
      <Route path="/portfolio/portfolios/fetch">
        {({ history, match }) => (
          <PortfoliosFetchDialog
            show={match != null}
            onHide={() => {
              history.push("/portfolio/portfolios");
            }}
          />
        )}
      </Route>
      <Route path="/portfolio/portfolios/updateStatus">
        {({ history, match }) => (
          <PortfoliosUpdateStateDialog
            show={match != null}
            onHide={() => {
              history.push("/portfolio/portfolios");
            }}
          />
        )}
      </Route> */}
      <PortfoliosCard />
    </PortfoliosUIProvider>
  );
}
