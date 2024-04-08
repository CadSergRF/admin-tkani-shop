import { createSlice } from '@reduxjs/toolkit';
import { IProduct } from '../../../models/IProduct.model';

interface AdminStoreView {
  products: IProduct[];
  isLoading: boolean;
  error: string;
}

const initialState: AdminStoreView = {
  products: [],
  isLoading: false,
  error: '',
};

export const adminStoreViewSlice = createSlice({
  name: 'adminStoreView',
  initialState,
  reducers: {},
});

export default adminStoreViewSlice.reducer;
