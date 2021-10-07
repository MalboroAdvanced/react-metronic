import {createSlice} from "@reduxjs/toolkit";

const initialAgreementsState = {
  listLoading: false,
  actionsLoading: false,
  totalCount: 0,
  entities: null,
  agreementForEdit: undefined,
  lastError: null
};
export const callTypes = {
  list: "list",
  action: "action"
};

export const agreementsSlice = createSlice({
  name: "agreements",
  initialState: initialAgreementsState,
  reducers: {
    catchError: (state, action) => {
      state.error = `${action.type}: ${action.payload.error}`;
      if (action.payload.callType === callTypes.list) {
        state.listLoading = false;
      } else {
        state.actionsLoading = false;
      }
    },
    startCall: (state, action) => {
      state.error = null;
      if (action.payload.callType === callTypes.list) {
        state.listLoading = true;
      } else {
        state.actionsLoading = true;
      }
    },
    // getAgreementById
    agreementFetched: (state, action) => {
      state.actionsLoading = false;
      state.agreementForEdit = action.payload.agreementForEdit;
      state.error = null;
    },
    // findAgreements
    agreementsFetched: (state, action) => {
      const { totalCount, entities } = action.payload;
      state.listLoading = false;
      state.error = null;
      state.entities = entities;
      state.totalCount = totalCount;
    },
    // createAgreement
    agreementCreated: (state, action) => {
      state.ewactionsLoading = false;
      state.error = null;
      state.entities.push(action.payload.agreement);
    },
    // updateAgreement
    agreementUpdated: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.map(entity => {
        if (entity.agreementMasterId === action.payload.agreement.agreementMasterId) {
          return action.payload.agreement;
        }
        return entity;
      });
    },
    // deleteAgreement
    agreementDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(el => el.agreementMasterId !== action.payload.agreementMasterId);
    },
    // deleteAgreements
    agreementsDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        el => !action.payload.ids.includes(el.agreementMasterId)
      );
    },
    // agreementsUpdateState
    agreementsStatusUpdated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      const { ids, status } = action.payload;
      state.entities = state.entities.map(entity => {
        if (ids.findIndex(agreementMasterId => agreementMasterId === entity.agreementMasterId) > -1) {
          entity.status = status;
        }
        return entity;
      });
    }
  }
});
