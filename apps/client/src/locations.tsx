import { Button, Form, Input, Menu, Modal } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useAppDispatch, useTypedSelector } from "./app/store";
import { addLocation, selectLocations, UserLocation } from "./app/locations-slice";
import { useModal } from "./app/use-modal";

const AddLocationModal = () => {
	const dispatch = useAppDispatch();
	const { isOpened, ok, cancel } = useModal();
	const [form] = Form.useForm<UserLocation>();

	const onOk = async () => {
		// TODO does it make sense to check if location unique or replacing it is good enough?
		try {
			const values = await form.validateFields();
			console.log("-----", "values", values);
			form.resetFields();
			dispatch(addLocation(values));
			ok();
		} catch (error) {
			console.log("Validate Failed:", error);
		}
	};
	return (
		<Modal
			title="Добавить локацию"
			centered
			open={isOpened}
			onOk={onOk}
			onCancel={cancel}
			okText="Ок"
			cancelText="Отмена"
		>
			<Form
				form={form}
				name="add-location"
				initialValues={{ longitude: null, latitude: null }}
				layout="vertical"
			>
				<Form.Item
					label="Широта"
					name="latitude"
					rules={[{ required: true, message: "Пожалуйста введите широту" }]}
				>
					<Input type="number" />
				</Form.Item>

				<Form.Item
					label="Долгота"
					name="longitude"
					rules={[{ required: true, message: "Пожалуйста введите долготу!" }]}
				>
					<Input type="number" />
				</Form.Item>
			</Form>
		</Modal>
	);
};

export const Locations = () => {
	const { open } = useModal();

	const locations = useTypedSelector(selectLocations);

	const menuItems = locations.map((l) => ({
		key: l.latitude + l.longitude,
		label: `Широта ${l.latitude}, Долгота: ${l.longitude}`,
	}));

	return (
		<div>
			<Menu onClick={(e) => console.log(e)} mode="vertical" items={menuItems} theme="dark" />
			<div className="flex justify-center" style={{ marginTop: 24 }}>
				<Button type="default" icon={<PlusOutlined />} onClick={open}>
					Добавить локацию
				</Button>

				<AddLocationModal />
			</div>
		</div>
	);
};
