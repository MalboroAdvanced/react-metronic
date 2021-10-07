import React, { Suspense } from "react";
import { Redirect, Switch } from "react-router-dom";
import { CompaniesPage } from "./Companies/CompaniesPage";
import { PortfoliosPage } from "./Portfolios/PortfoliosPage";
import { AgreementsPage } from "./Agreements/AgreementsPage";
// import { IomsPage } from "./IOM/IomsPage";

/* import { ProductsPage } from "./products/ProductsPage";
import { ProductEdit } from "./products/product-edit/ProductEdit"; */
import { LayoutSplashScreen, ContentRoute } from "../../../../_metronic/layout";
import { IomsPage } from "./IOM/IomsPage";
import {StatesPage}from "./state/StatesPage"
import {DiscomsPage} from "./Discoms/DiscomsPage"
export default function PortfolioPage() {
   
  return (
    <Suspense fallback={<LayoutSplashScreen />}>
      <Switch>
        {
          /* Redirect from eCommerce root URL to /companies */
        /*   <Redirect
            exact={true}
            from="/portfolio"
            to="/portfolio/companies"
          /> */
        }
        <ContentRoute path="/portfolio/companies" component={CompaniesPage} />
     {/*  <ContentRoute path="/portfolio/products/new" component={ProductEdit} />
        <ContentRoute
          path="/portfolio/products/:id/edit"
          component={ProductEdit} /> */}
        

       <ContentRoute path="/portfolio/portfolios" component={PortfoliosPage} /> 
       <ContentRoute path="/portfolio/agreements" component={AgreementsPage} />
       <ContentRoute path="/portfolio/ioms" component={IomsPage} />
       <ContentRoute path="/portfolio/states" component={StatesPage} />
       <ContentRoute path="/portfolio/discom" component={DiscomsPage} />
      </Switch>

    </Suspense>
  );
}
