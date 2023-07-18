import { ReactNode } from "react";
import { Alert, Spin } from "antd";

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
		return <Spin size="large" />;
	}

	if (isError) {
		return <Alert message="Не удалось получить данные." type="error" />;
	}

	return children;
};
