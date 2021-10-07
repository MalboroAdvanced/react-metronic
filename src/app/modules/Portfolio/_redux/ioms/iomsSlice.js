import {createSlice} from "@reduxjs/toolkit";

const initialIomsState = {
  listLoading: false,
  actionsLoading: false,
  totalCount: 0,
  entities: null,
  iomForEdit: undefined,
  lastError: null
};
export const callTypes = {
  list: "list",
  action: "action"
};

export const iomsSlice = createSlice({
  name: "ioms",
  initialState: initialIomsState,
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
    // getCompanyById
    iomFetched: (state, action) => {
      state.actionsLoading = false;
      state.iomForEdit = action.payload.iomForEdit;
      state.error = null;
    },
    // findCompanies
    iomsFetched: (state, action) => {
      const { totalCount, entities } = action.payload;
      state.listLoading = false;
      state.error = null;
      state.entities = entities;
      state.totalCount = totalCount;
    },
    // createCompany
    iomCreated: (state, action) => {
      state.ewactionsLoading = false;
      state.error = null;
      state.entities.push(action.payload.iom);
    },
    // iomDateTime: (state, action) => {
    //   state.ewactionsLoading = false;
    //   state.error = null;
    //   state.entities.push(action.payload.iom);
    // },
    // updateCompany
  iomUpdated: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.map(entity => {
        if (entity.iomMasterId === action.payload.iom.iomMasterId) {
          return action.payload.iom;
        }
        return entity;
      });
    },
    // deleteCompany
    iomDeleted: (state, action) => {
     
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(el => el.id !== action.payload.id);
    },
    // deleteCompanies
    iomsDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        el => !action.payload.ids.includes(el.id)
      );
    },



    // companiesUpdateState
    iomsStatusUpdated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      const { ids, status } = action.payload;
      state.entities = state.entities.map(entity => {
        if (ids.findIndex(iomMasterId => iomMasterId === entity.iomMasterId) > -1) {
          entity.status = status;
        }
        return entity;
      });
    }
  }
});
