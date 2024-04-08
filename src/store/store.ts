import { combineReducers, configureStore } from '@reduxjs/toolkit';
// import { combineReducers, configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import adminStoreViewReducer from './reducers/basket/adminStoreView.slice';
import adminReqCatalogReducer from './reducers/reqCatalog/adminReqCatalog.slice';
import { instantsApi } from './api/instants.api';
// import { adminBasketSlice } from "./basket/adminBasket.slice";

const rootReducer = combineReducers({
  adminView: adminStoreViewReducer,
  adminReq: adminReqCatalogReducer,
  [instantsApi.reducerPath]: instantsApi.reducer,
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(instantsApi.middleware),
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
