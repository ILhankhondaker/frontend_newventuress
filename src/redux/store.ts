import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // Default storage (localStorage for web)
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import authReducer from "@/redux/features/authentication/AuthSlice";
import filtersReducer from "@/redux/features/filtering/FilterSlice";
import cardReducer from "@/redux/features/cart/cartSlice";
import { baseApi } from "./api/baseApi";

// Combine reducers
const rootReducer = combineReducers({
  auth: authReducer,
  filters: filtersReducer,
  cart: cardReducer,
  [baseApi.reducerPath]: baseApi.reducer,
});

// Persist configuration
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth", "cart"], // Only persist auth and cart slices
};

// Create persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Prevent warnings due to non-serializable data in redux-persist
    }).concat(baseApi.middleware),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
