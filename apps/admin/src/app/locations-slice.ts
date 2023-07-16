import { PayloadAction, createSelector, createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";

type GeoPosition = Pick<GeolocationCoordinates, "latitude" | "longitude">;

type SliceState = {
	activeLocation: number | null;
	locations: Record<string, GeoPosition>;
	error: null | GeolocationPositionError;
};

const initialState: SliceState = {
	activeLocation: null,
	locations: {},
	error: null,
};

const slice = createSlice({
	name: "locations",
	initialState,
	reducers: {
		selectLocation(state, { payload }: PayloadAction<{ id: number }>) {
			state.activeLocation = payload.id;
		},
		addLocation(state, { payload }: PayloadAction<GeoPosition>) {
			const newKey = payload.longitude + payload.latitude;
			state.locations[newKey] = payload;
			state.activeLocation = newKey;
		},
		removeLocation(state, { payload }: PayloadAction<{ id: number }>) {
			delete state.locations[payload.id];
		},
		setLocationError(state, { payload }: PayloadAction<GeolocationPositionError>) {
			state.error = payload;
		},
	},
});

export const { addLocation, removeLocation, setLocationError } = slice.actions;

export default slice.reducer;

export const selectLocationsState = (state: RootState) => state.locations;

export const selectLocations = (state: RootState) => state.locations.locations;

export const selectActiveLocation = createSelector([selectLocationsState], (locationsState) => {
	if (locationsState.activeLocation) {
		return locationsState.locations[locationsState.activeLocation];
	}
	return null;
});
