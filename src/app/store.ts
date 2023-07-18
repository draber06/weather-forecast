import { combineReducers, configureStore, ConfigureStoreOptions } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import storage from "redux-persist/lib/storage";
import {
	persistReducer,
	persistStore,
	PersistConfig,
	FLUSH,
	REHYDRATE,
	PAUSE,
	PERSIST,
	PURGE,
	REGISTER,
} from "redux-persist";

import { api } from "./services/yandex-weather";
import locationsReducer, { sliceKey as LOCATIONS_SLICE_KEY } from "../locations/locations-slice";
import modalReducer, { sliceKey as MODAL_SLICE_KEY } from "./modal-slice";

const rootReducer = combineReducers({
	[LOCATIONS_SLICE_KEY]: locationsReducer,
	[MODAL_SLICE_KEY]: modalReducer,
	[api.reducerPath]: api.reducer,
});

const persistConfig: PersistConfig<RootState> = {
	key: "root",
	storage,
	whitelist: [LOCATIONS_SLICE_KEY],
	version: 1,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const createStore = (options?: ConfigureStoreOptions["preloadedState"] | undefined) => {
	const store = configureStore({
		reducer: persistedReducer,
		middleware: (getDefaultMiddleware) =>
			getDefaultMiddleware({
				serializableCheck: {
					ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
				},
			}).concat(api.middleware),
		...options,
	});

	const persistor = persistStore(store);

	return { store, persistor };
};

export type AppDispatch = ReturnType<typeof createStore>["store"]["dispatch"];
export const useAppDispatch: () => AppDispatch = useDispatch;
export type RootState = ReturnType<typeof rootReducer>;
export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
