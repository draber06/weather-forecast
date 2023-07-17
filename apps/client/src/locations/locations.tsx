import { Menu, MenuProps } from "antd";
import { useAppDispatch, useTypedSelector } from "../app/store";
import { selectActiveLocationId, selectLocations, setActiveLocation } from "./locations-slice";
import { AddLocationModal } from "./add-location-modal";

import "./locations.css";
import { LocationItem } from "./location-item";

export const Locations = () => {
	const dispatch = useAppDispatch();

	const locations = useTypedSelector(selectLocations);
	const activeLocationId = useTypedSelector(selectActiveLocationId);

	const menuItems = locations.map((l, idx) => ({
		key: l.id,
		label: <LocationItem location={l} canBeDeleted={Boolean(idx)} />,
	}));

	const handleClick: MenuProps["onClick"] = ({ key, domEvent }) => {
		// do nothing if action button was clicked
		if (domEvent.defaultPrevented) {
			return;
		}
		dispatch(setActiveLocation({ id: key }));
	};

	return (
		<div>
			<Menu
				onClick={handleClick}
				mode="vertical"
				items={menuItems}
				selectedKeys={activeLocationId === null ? [] : [activeLocationId]}
			/>

			<AddLocationModal />
		</div>
	);
};
