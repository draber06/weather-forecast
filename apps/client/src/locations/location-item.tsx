import { Button, Col, Dropdown, MenuProps, Row, Typography } from "antd";
import { useAppDispatch } from "../app/store";
import { removeLocation, updateLocation, UserLocation } from "./locations-slice";
import { EllipsisOutlined } from "@ant-design/icons";

type MenuItem = Required<MenuProps>["items"][number];

type MenuItemProps = {
	location: UserLocation;
	canBeDeleted?: boolean;
};

export const LocationItem = ({ location, canBeDeleted = true }: MenuItemProps) => {
	const dispatch = useAppDispatch();

	const items: MenuItem[] = [
		canBeDeleted
			? {
					key: "delete",
					label: "Удалить",
			  }
			: null,
	].filter(Boolean);

	const handleMenuClick: MenuProps["onClick"] = () => {
		dispatch(removeLocation({ id: location.id }));
	};

	const handleTitleChange = (value: string) =>
		dispatch(updateLocation({ id: location.id, changes: { title: value } }));

	return (
		<Row gutter={8}>
			<Col flex="auto">
				<Typography.Text
					editable={{
						onChange: handleTitleChange,
						maxLength: 30,
						autoSize: { minRows: 1, maxRows: 1 },
						tooltip: "Переименовать",
					}}
					style={{ fontWeight: 600 }}
				>
					{location.title || location.alias}
				</Typography.Text>
			</Col>
			{items.length > 0 && (
				<Col>
					<Dropdown menu={{ items, onClick: handleMenuClick }} trigger={["click"]}>
						<Button
							type="text"
							shape="circle"
							style={{ marginRight: -12 }}
							icon={<EllipsisOutlined style={{ transform: "rotate(90deg)" }} />}
							onClick={(e) => {
								// help main menu listener to not react on it
								e.preventDefault();
							}}
						/>
					</Dropdown>
				</Col>
			)}
		</Row>
	);
};
