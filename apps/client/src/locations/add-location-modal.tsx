import { useAppDispatch } from "../app/store";
import { useModal } from "../app/use-modal";
import { Form, Input, Modal } from "antd";
import { addLocation, UserLocation } from "../app/locations-slice";

export const AddLocationModal = () => {
	const dispatch = useAppDispatch();
	const { isOpened, ok, cancel } = useModal();
	const [form] = Form.useForm<UserLocation>();

	const onOk = async () => {
		// TODO does it make sense to check if location unique or replacing it is good enough?
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
