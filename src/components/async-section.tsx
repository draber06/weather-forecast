import { ReactNode } from "react";
import { Alert, Card, Empty, Spin } from "antd";

export const AsyncSection = ({
	isLoading,
	isError,
	children,
}: {
	isLoading?: boolean;
	isError?: boolean;
	children: ReactNode;
}) => {
	if (isLoading) {
		return (
			<Card>
				<Empty image={<Spin size="large" />} description="Загрузка..." />
			</Card>
		);
	}

	if (isError) {
		return <Alert message="Не удалось получить данные." type="error" />;
	}

	return children;
};
