import { Button, Dropdown, Menu, MenuProps, Typography } from "antd";
import { EllipsisOutlined } from "@ant-design/icons";
import { useAppDispatch, useTypedSelector } from "../app/store";
import {
	selectActiveLocationId,
	selectLocations,
	setActiveLocation,
	UserLocation,
} from "../app/locations-slice";
import { AddLocationModal } from "./add-location-modal";

const MenuItem = ({ location }: { location: UserLocation }) => {
	const items = [
		{
			key: "rename",
			label: "Переименовать",
		},
		{
			key: "delete",
			label: "Удалить",
		},
	];

	const label = `Широта ${location.latitude}, Долгота: ${location.longitude}`;
	return (
		<span
			className="flex"
			style={{ justifyContent: "space-between", alignItems: "center", height: "100%" }}
		>
			<Typography.Text ellipsis>{label}</Typography.Text>
			<Dropdown menu={{ items }} trigger={["click"]}>
				<Button
					type="text"
					shape="circle"
					style={{ marginRight: -12 }}
					icon={<EllipsisOutlined style={{ transform: "rotate(90deg)" }} />}
					onClick={(e) => e.preventDefault()}
				/>
			</Dropdown>
		</span>
	);
};

export const Locations = () => {
	const dispatch = useAppDispatch();

	const locations = useTypedSelector(selectLocations);
	const activeLocationId = useTypedSelector(selectActiveLocationId);

	const menuItems = locations.map<Required<MenuProps>["items"][number]>((l) => ({
		key: l.latitude + l.longitude,
		label: <MenuItem location={l} />,
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
