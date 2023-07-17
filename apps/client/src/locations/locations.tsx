import { Button, Dropdown, Menu, MenuProps, Typography } from "antd";
import { EllipsisOutlined } from "@ant-design/icons";
import { useAppDispatch, useTypedSelector } from "../app/store";
import {
	removeLocation,
	selectActiveLocationId,
	selectLocations,
	setActiveLocation,
	UserLocation,
} from "./locations-slice";
import { AddLocationModal } from "./add-location-modal";

type MenuItem = Required<MenuProps>["items"][number];

const MenuItem = ({
	location,
	canBeDeleted = true,
}: {
	location: UserLocation;
	canBeDeleted?: boolean;
}) => {
	const dispatch = useAppDispatch();

	const items: MenuItem[] = [
		{
			key: "rename",
			label: "Переименовать",
		},
		canBeDeleted
			? {
					key: "delete",
					label: "Удалить",
			  }
			: null,
	];

	const handleMenuClick: MenuProps["onClick"] = () => {
		dispatch(removeLocation({ id: location.id }));
	};

	const label = `Широта ${location.latitude}, Долгота: ${location.longitude}`;
	return (
		<span
			className="flex"
			style={{ justifyContent: "space-between", alignItems: "center", height: "100%" }}
		>
			<Typography.Text ellipsis>{label}</Typography.Text>
			<Dropdown menu={{ items, onClick: handleMenuClick }} trigger={["click"]}>
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

	const menuItems = locations.map<MenuItem>((l, idx) => ({
		key: l.id,
		label: <MenuItem location={l} canBeDeleted={Boolean(idx)} />,
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
