import { configureStore, ConfigureStoreOptions } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { api } from "./services/yandex-weather";
import locationsReducer, { sliceKey as LOCATIONS_SLICE_KEY } from "../locations/locations-slice";
import modalReducer, { sliceKey as MODAL_SLICE_KEY } from "./modal-slice";

export const createStore = (options?: ConfigureStoreOptions["preloadedState"] | undefined) =>
	configureStore({
		reducer: {
			[LOCATIONS_SLICE_KEY]: locationsReducer,
			[MODAL_SLICE_KEY]: modalReducer,
			[api.reducerPath]: api.reducer,
		},
		middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware),
		...options,
	});

export const store = createStore();

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export type RootState = ReturnType<typeof store.getState>;
export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
