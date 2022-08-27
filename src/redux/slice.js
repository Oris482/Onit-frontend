import { configureStore, createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'info',
  initialState: {
    user: {
      nickname: '',
      user_seq: -1,
      url: '',
      profileImage: '',
      field: [],
    },
    modal: {
      imgInputWindow: false,
      targetWidgetId: '-1',
      popUpWindow: false,
      popUpWindowType: 'default',
    },
    widgets: {
      count: 0,
      list: [],
    },
    newWidget: {
      list: [],
    },
    singlePages: {
      data: [],
    },
    multiPages: {
      data: [],
    },
  },
  reducers: {
    replacementUser(state, action) {
      state.user = action.payload;
    },
    replacementWidgets(state, action) {
      state.widgets = action.payload;
    },
    replacementNewWidgets(state, action) {
      state.newWidget = action.payload;
    },
    replacementModal(state, action) {
      state.modal = action.payload;
    },
    replacementSinglePages(state, action) {
      state.singlePages = action.payload;
    },
    replacementMultiPages(state, action) {
      state.multiPages = action.payload;
    },
  },
});

export const infoReducer = slice.reducer;

export const {
  replacementWidgets: createReplacementWidgetsAction,
  replacementNewWidgets: createReplacementNewWidgetsAction,
  replacementModal: createReplacementModalAction,
  replacementUser: createReplacementUserAction,
  replacementSinglePages: createReplacementSinglePagesAction,
  replacementMultiPages: createReplacementMultiPagesAction,
} = slice.actions;

export const store = configureStore({
  reducer: {
    info: infoReducer,
  },
});
