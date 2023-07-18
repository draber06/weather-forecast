import { useAppDispatch } from "../app/store";
import { useModal } from "../app/use-modal";
import { Button, Col, Form, InputNumber, Modal, Row } from "antd";
import { addLocation, UserLocation } from "./locations-slice";
import { PlusOutlined } from "@ant-design/icons";

export const AddLocationModal = () => {
	const dispatch = useAppDispatch();
	const { isOpened, ok, cancel, open } = useModal();
	const [form] = Form.useForm<UserLocation>();

	const onOk = async () => {
		try {
			const values = await form.validateFields();
			form.resetFields();
			dispatch(addLocation(values));
			ok();
		} catch (error) {
			console.log("Validate Failed:", error);
		}
	};
	return (
		<div className="flex justify-center" style={{ marginTop: 24 }}>
			<Button type="default" icon={<PlusOutlined />} onClick={open}>
				Добавить локацию
			</Button>
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
					style={{ padding: "16px 0" }}
					layout="vertical"
				>
					<Row gutter={24}>
						<Col span={12}>
							<Form.Item
								label="Широта"
								name="latitude"
								rules={[{ required: true, message: "Пожалуйста введите широту!" }]}
							>
								<InputNumber max={90} min={-90} style={{ width: "100%" }} />
							</Form.Item>
						</Col>
						<Col span={12}>
							<Form.Item
								label="Долгота"
								name="longitude"
								rules={[{ required: true, message: "Пожалуйста введите долготу!" }]}
							>
								<InputNumber max={180} min={-180} style={{ width: "100%" }} />
							</Form.Item>
						</Col>
					</Row>
				</Form>
			</Modal>
		</div>
	);
};
