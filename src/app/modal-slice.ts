import { createSlice } from "@reduxjs/toolkit";

type ModalState = {
	isOpened: boolean;
	isConfirmed: boolean;
	isDeclined: boolean;
};

const initialState: ModalState = {
	isOpened: false,
	isConfirmed: false,
	isDeclined: false,
};

export const sliceKey = "modal";

const modalSlice = createSlice({
	name: sliceKey,
	initialState,
	reducers: {
		open: (state) => {
			state.isOpened = true;
			state.isDeclined = false;
			state.isConfirmed = false;
		},
		ok: (state) => {
			state.isConfirmed = true;
			state.isOpened = false;
		},
		cancel: (state) => {
			state.isDeclined = true;
			state.isOpened = false;
		},
	},
});

export const modalActions = modalSlice.actions;

export default modalSlice.reducer;
