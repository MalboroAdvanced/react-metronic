import {createSlice} from "@reduxjs/toolkit";

const initialDiscomsState = {
  listLoading: false,
  actionsLoading: false,
  totalCount: 0,
  entities: null,
  discomForEdit: undefined,
  lastError: null
};
export const callTypes = {
  list: "list",
  action: "action"
};

export const discomsSlice = createSlice({
  name: "discoms",
  initialState: initialDiscomsState,
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
    // getDiscomById
    discomFetched: (state, action) => {
      state.actionsLoading = false;
      state.discomForEdit = action.payload.discomForEdit;
      state.error = null;
    },
    // findDiscoms
    discomsFetched: (state, action) => {
      const { totalCount, entities } = action.payload;
      state.listLoading = false;
      state.error = null;
      state.entities = entities;
      state.totalCount = totalCount;
    },
    // createDiscom
    discomCreated: (state, action) => {
      state.ewactionsLoading = false;
      state.error = null;
      state.entities.push(action.payload.discom);
    },
    // updateDiscom
    discomUpdated: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.map(entity => {
        if (entity.discomMasterId === action.payload.discom.discomMasterId) {
          return action.payload.discom;
        }
        return entity;
      });
    },
    // deleteDiscom
    discomDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(el => el.discomMasterId !== action.payload.discomMasterId);
    },
    // deleteDiscoms
    discomsDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        el => !action.payload.ids.includes(el.discomMasterId)
      );
    },
    // discomsUpdateState
    discomsStatusUpdated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      const { ids, status } = action.payload;
      state.entities = state.entities.map(entity => {
        if (ids.findIndex(discomMasterId => discomMasterId === entity.discomMasterId) > -1) {
          entity.status = status;
        }
        return entity;
      });
    }
  }
});
