import React from "react";
import { Route } from "react-router-dom";
import { CompaniesLoadingDialog } from "./companies-loading-dialog/CompaniesLoadingDialog";
import { CompanyEditDialog } from "./company-edit-dialog/CompanyEditDialog";
import { CompanyDeleteDialog } from "./company-delete-dialog/CompanyDeleteDialog";
import { CompaniesDeleteDialog } from "./companies-delete-dialog/CompaniesDeleteDialog";
import { CompaniesFetchDialog } from "./companies-fetch-dialog/CompaniesFetchDialog";
import { CompaniesUpdateStateDialog } from "./companies-update-status-dialog/CompaniesUpdateStateDialog";
import { CompaniesUIProvider } from "./CompaniesUIContext";
import { CompaniesCard } from "./CompaniesCard";

export function CompaniesPage({ history }) {



    
  const companiesUIEvents = {
    newCompanyButtonClick: () => {
      history.push("/portfolio/companies/new");
    },
     openEditCompanyDialog: (companyMasterId) => {
      history.push(`/portfolio/companies/${companyMasterId}/edit`);
    },
    openDeleteCompanyDialog: (companyMasterId) => {
      history.push(`/portfolio/companies/${companyMasterId}/delete`);
    },
    openDeleteCompaniesDialog: () => {
      history.push(`/portfolio/companies/deleteCompanies`);
    },
    openFetchCompaniesDialog: () => {
      history.push(`/portfolio/companies/fetch`);
    },
    openUpdateCompaniesStatusDialog: () => {
      history.push("/portfolio/companies/updateStatus");
    } 
  }

  return (
      
    <CompaniesUIProvider companiesUIEvents={companiesUIEvents}>
 {/*  <CompaniesLoadingDialog />  */}
       <Route path="/portfolio/companies/new">
        {({ history, match }) => (
          <CompanyEditDialog
            show={match != null}
            onHide={() => {
              history.push("/portfolio/companies");
            }}
          />
        )}
      </Route> 
      <Route path="/portfolio/companies/:companyMasterId/edit">
        {({ history, match }) => (
          <CompanyEditDialog
            show={match != null}
            companyMasterId={match && match.params.companyMasterId}
            onHide={() => {
              history.push("/portfolio/companies");
            }}
          />
        )}
      </Route>
      <Route path="/portfolio/companies/deleteCompanies">
        {({ history, match }) => (
          <CompaniesDeleteDialog
            show={match != null}
            onHide={() => {
              history.push("/portfolio/companies");
            }}
          />
        )}
      </Route>
      <Route path="/portfolio/companies/:companyMasterId/delete">
        {({ history, match }) => (
          <CompanyDeleteDialog
            show={match != null}
            companyMasterId={match && match.params.companyMasterId}
            onHide={() => {
              history.push("/portfolio/companies");
            }}
          />
        )}
      </Route>
      <Route path="/portfolio/companies/fetch">
        {({ history, match }) => (
          <CompaniesFetchDialog
            show={match != null}
            onHide={() => {
              history.push("/portfolio/companies");
            }}
          />
        )}
      </Route>
      <Route path="/portfolio/companies/updateStatus">
        {({ history, match }) => (
          <CompaniesUpdateStateDialog
            show={match != null}
            onHide={() => {
              history.push("/portfolio/companies");
            }}
          />
        )}
      </Route>
      <CompaniesCard />
    </CompaniesUIProvider>
  );
}
