import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { TGetProductRequest } from '../../../models/request.model';
import { initialGetProductRequest } from '../../../utils/catalog.constants';

type TAdminReqCatalog = {
  reqCatalog: TGetProductRequest;
  isLoading: boolean;
  error: string;
};

const initialState: TAdminReqCatalog = {
  reqCatalog: initialGetProductRequest,
  isLoading: false,
  error: '',
};

export const adminReqCatalogSlice = createSlice({
  name: 'adminReqCatalog',
  initialState,
  reducers: {
    changeSection(state, action: PayloadAction<string>) {
      state.reqCatalog.sectionName = action.payload;
    },
    changeSearch(state, action: PayloadAction<string>) {
      state.reqCatalog.searchName = action.payload;
    },
    changeSort(state, action: PayloadAction<string>) {
      state.reqCatalog.sortName = action.payload;
    },
    changePaginationLimit(state, action: PayloadAction<string>) {
      state.reqCatalog.paginationLimit = parseInt(action.payload);
    },
    changePaginationPage(state, action: PayloadAction<string>) {
      state.reqCatalog.paginationPage = parseInt(action.payload);
    },
  },
});
export const { changeSection } = adminReqCatalogSlice.actions;
export default adminReqCatalogSlice.reducer;
