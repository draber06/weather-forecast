import { useAppDispatch, useTypedSelector } from "./store";
import { useCallback } from "react";
import { modalActions } from "./modal-slice";

export const useModal = () => {
	const dispatch = useAppDispatch();

	const { isOpened } = useTypedSelector((state) => state.modal);

	const open = useCallback(() => {
		dispatch(modalActions.open());
	}, [dispatch]);

	const ok = useCallback(() => {
		dispatch(modalActions.ok());
	}, [dispatch]);

	const cancel = useCallback(() => {
		dispatch(modalActions.cancel());
	}, [dispatch]);

	return {
		isOpened,
		open,
		ok,
		cancel,
	};
};
