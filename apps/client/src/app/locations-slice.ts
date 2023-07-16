import { PayloadAction, createSlice, createEntityAdapter, createSelector } from "@reduxjs/toolkit";
import { RootState } from "./store";

// name is kinda strange because there are built-in types like GeoLocationPosition, Location, etc.
export type UserLocation = {
	latitude: number;
	longitude: number;
};

const adapter = createEntityAdapter<UserLocation>({
	selectId: (position) => position.latitude + position.longitude,
});

const initialState = adapter.getInitialState<{
	activeLocation: null | number;
	error: null | string;
}>({ activeLocation: null, error: null });

export const sliceKey = "geo-positions";

const locationsSlice = createSlice({
	name: sliceKey,
	initialState,
	reducers: {
		setActiveLocation(state, { payload }: PayloadAction<{ id: number }>) {
			state.activeLocation = payload.id;
		},
		addLocation(state, action: PayloadAction<UserLocation>) {
			adapter.addOne(state, action);
			if (!state.activeLocation) {
				state.activeLocation = action.payload.latitude + action.payload.longitude;
			}
		},
		removeLocation(state, { payload }: PayloadAction<{ id: number }>) {
			adapter.removeOne(state, payload.id);
			if (state.activeLocation === payload.id) {
				state.activeLocation = null;
			}
		},
		setLocationError(state, { payload }: PayloadAction<GeolocationPositionError>) {
			state.error = payload.message;
		},
	},
});

export const { addLocation, removeLocation, setLocationError, setActiveLocation } =
	locationsSlice.actions;

export default locationsSlice.reducer;

export const { selectAll: selectLocations } = adapter.getSelectors<RootState>(
	(state) => state[sliceKey],
);

export const selectActiveLocation = createSelector([(state) => state[sliceKey]], (state) => {
	return state.activeLocation === null ? null : state.entities[state.activeLocation];
});
