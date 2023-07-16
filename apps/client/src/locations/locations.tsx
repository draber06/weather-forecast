import { Button, Menu, MenuProps } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useAppDispatch, useTypedSelector } from "../app/store";
import { selectLocations, setActiveLocation } from "../app/locations-slice";
import { useModal } from "../app/use-modal";
import { AddLocationModal } from "./add-location-modal";

export const Locations = () => {
	const dispatch = useAppDispatch();
	const { open } = useModal();

	const locations = useTypedSelector(selectLocations);

	const menuItems = locations.map<Required<MenuProps>["items"][number]>((l) => ({
		key: l.latitude + l.longitude,
		label: `Широта ${l.latitude}, Долгота: ${l.longitude}`,
	}));

	const handleClick: MenuProps["onClick"] = ({ key }) => {
		dispatch(setActiveLocation({ id: +key }));
	};

	return (
		<div>
			<Menu onClick={handleClick} mode="vertical" items={menuItems} />
			<div className="flex justify-center" style={{ marginTop: 24 }}>
				<Button type="default" icon={<PlusOutlined />} onClick={open}>
					Добавить локацию
				</Button>

				<AddLocationModal />
			</div>
		</div>
	);
};
