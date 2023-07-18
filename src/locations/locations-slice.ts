import { createEntityAdapter, createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../app/store";
import { round } from "lodash";
import { getLocationAlias } from "../utils";

export type UserLocation = {
	id: string;
	title: string;
	alias: string;
	latitude: number;
	longitude: number;
	createdAt: number;
};

const adapter = createEntityAdapter<UserLocation>({
	sortComparer: (a, b) => a.createdAt - b.createdAt,
});

const initialState = adapter.getInitialState<{
	activeLocation: null | string;
	error: null | string;
}>({ activeLocation: null, error: null });

export const sliceKey = "geo-positions";

const locationsSlice = createSlice({
	name: sliceKey,
	initialState,
	reducers: {
		setActiveLocation(state, { payload }: PayloadAction<{ id: string }>) {
			state.activeLocation = payload.id;
		},
		addLocation: {
			reducer: (state, action: PayloadAction<UserLocation>) => {
				adapter.addOne(state, action);
				state.activeLocation = action.payload.id;
			},
			prepare: (payload: Pick<UserLocation, "latitude" | "longitude">) => {
				// Leave no more than  7 decimal places for good accuracy (consistent to yandex api)
				// example - 0.0000001 = 11.1 mm
				const latitude = round(payload.latitude, 7);
				const longitude = round(payload.longitude, 7);
				return {
					payload: {
						latitude,
						longitude,
						id: String(latitude + longitude),
						title: "",
						alias: getLocationAlias({ lat: latitude, lon: longitude }),
						createdAt: Date.now(),
					},
				};
			},
		},
		updateLocation: adapter.updateOne,
		removeLocation(state, { payload }: PayloadAction<{ id: string }>) {
			adapter.removeOne(state, payload.id);
			if (state.activeLocation === payload.id) {
				state.activeLocation = String(state.ids[0]);
			}
		},
		setLocationError(state, { payload }: PayloadAction<GeolocationPositionError>) {
			state.error = payload.message;
		},
	},
});

export const { addLocation, removeLocation, setLocationError, setActiveLocation, updateLocation } =
	locationsSlice.actions;

export default locationsSlice.reducer;

const selectSliceState = (state: RootState) => state[sliceKey];

export const { selectAll: selectLocations } = adapter.getSelectors<RootState>(selectSliceState);

export const selectActiveLocationId = (state: RootState) => state[sliceKey].activeLocation;

export const selectActiveLocation = createSelector([selectSliceState], (state) =>
	state.activeLocation === null ? null : state.entities[state.activeLocation],
);
