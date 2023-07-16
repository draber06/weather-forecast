import { Button, Form, Input, Menu, Modal } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useTypedSelector } from "./app/store";
import { selectLocations, UserLocation } from "./app/locations-slice";
import { useState } from "react";

const AddLocationForm = () => {
	const [form] = Form.useForm<UserLocation>();

	const onFinish = (values: any) => {
		console.log("Success:", values);
	};

	const onFinishFailed = (errorInfo: any) => {
		console.log("Failed:", errorInfo);
	};
	return (
		<Form
			form={form}
			name="add-location"
			initialValues={{ longitude: null, latitude: null }}
			onFinish={onFinish}
			onFinishFailed={onFinishFailed}
			layout="vertical"
			autoComplete="off"
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

			<Form.Item wrapperCol={{ offset: 8, span: 16 }}>
				<Button type="default" icon={<PlusOutlined />} htmlType="submit">
					Добавить локацию
				</Button>
			</Form.Item>
		</Form>
	);
};

export const Locations = () => {
	const [modalOpen, setModalOpen] = useState(false);
	const locations = useTypedSelector(selectLocations);

	const menuItems = locations.map((l) => ({
		key: l.latitude + l.longitude,
		label: `Широта ${l.latitude}, Долгота: ${l.longitude}`,
	}));

	return (
		<div>
			<Menu onClick={(e) => console.log(e)} mode="vertical" items={menuItems} theme="dark" />
			<div className="flex justify-center" style={{ marginTop: 24 }}>
				<Button type="default" icon={<PlusOutlined />} onClick={() => setModalOpen(true)}>
					Добавить локацию
				</Button>

				<Modal
					title="Добавить локацию"
					centered
					open={modalOpen}
					onOk={() => setModalOpen(true)}
					onCancel={() => setModalOpen(false)}
					okText="Ок"
					cancelText="Отмена"
				>
					<AddLocationForm />
				</Modal>
			</div>
		</div>
	);
};
