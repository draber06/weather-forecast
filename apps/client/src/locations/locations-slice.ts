import { PayloadAction, createSlice, createEntityAdapter, createSelector } from "@reduxjs/toolkit";
import { RootState } from "../app/store";

// name is kinda strange because there are built-in types like GeoLocationPosition, Location, etc.
export type UserLocation = {
	id: string;
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
				if (!state.activeLocation) {
					state.activeLocation = action.payload.id;
				}
			},
			prepare: (payload: Pick<UserLocation, "latitude" | "longitude">) => {
				return {
					payload: {
						id: String(payload.latitude + payload.longitude),
						...payload,
						createdAt: Date.now(),
					},
				};
			},
		},
		removeLocation(state, { payload }: PayloadAction<{ id: string }>) {
			adapter.removeOne(state, payload.id);
			// TODO - it doesn't work at the moment
			if (state.activeLocation === payload.id) {
				state.activeLocation = String(state.ids[0]);
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

const selectSliceState = (state: RootState) => state[sliceKey];

export const { selectAll: selectLocations } = adapter.getSelectors<RootState>(selectSliceState);

export const selectActiveLocationId = (state: RootState) => state[sliceKey].activeLocation;

export const selectActiveLocation = createSelector([selectSliceState], (state) =>
	state.activeLocation === null ? null : state.entities[state.activeLocation],
);
