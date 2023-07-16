import { configureStore, ConfigureStoreOptions } from "@reduxjs/toolkit";
// TODO delete react-redux bindings?
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { api } from "./services/yandex-weather";
import locationsReducer from "./locations-slice";

export const createStore = (options?: ConfigureStoreOptions["preloadedState"] | undefined) =>
	configureStore({
		reducer: {
			locations: locationsReducer,
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
