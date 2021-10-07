import {all} from "redux-saga/effects";
import {combineReducers} from "redux";

import * as auth from "../app/modules/Auth/_redux/authRedux";
import {customersSlice} from "../app/modules/ECommerce/_redux/customers/customersSlice";
import {productsSlice} from "../app/modules/ECommerce/_redux/products/productsSlice";
import {remarksSlice} from "../app/modules/ECommerce/_redux/remarks/remarksSlice";
import {specificationsSlice} from "../app/modules/ECommerce/_redux/specifications/specificationsSlice";
import {companiesSlice} from "../app/modules/Portfolio/_redux/companies/companiesSlice";
import {portfoliosSlice} from "../app/modules/Portfolio/_redux/portfolios/portfoliosSlice";
import {agreementsSlice} from "../app/modules/Portfolio/_redux/agreements/agreementsSlice";
import {iomsSlice} from "../app/modules/Portfolio/_redux/ioms/iomsSlice";
import {discomsSlice} from "../app/modules/Portfolio/_redux/discoms/discomsSlice";

export const rootReducer = combineReducers({
  auth: auth.reducer,
  customers: customersSlice.reducer,
  products: productsSlice.reducer,
  remarks: remarksSlice.reducer,
  specifications: specificationsSlice.reducer,
  companies: companiesSlice.reducer,
  portfolios: portfoliosSlice.reducer,
  agreements:  agreementsSlice.reducer,
  ioms: iomsSlice.reducer,
  discoms: discomsSlice.reducer,
});

export function* rootSaga() {
  yield all([auth.saga()]);
}
