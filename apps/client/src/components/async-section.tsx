import { QueryStatus } from "@reduxjs/toolkit/query";
import { ReactNode } from "react";
import { Alert, Spin } from "antd";

export const AsyncSection = ({
	status,
	children,
}: {
	status: QueryStatus;
	children: ReactNode;
}) => {
	switch (status) {
		case QueryStatus.pending:
			return <Spin size="large" />;
		case QueryStatus.rejected:
			return <Alert message="Не удалось получить данные." type="error" />;
		default:
			return children;
	}
};
