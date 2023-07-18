import { Spin } from "antd";
import React from "react";

export const FullScreenLoader = () => (
	<div
		style={{
			height: "100vh",
			display: "flex",
			alignItems: "center",
			justifyContent: "center",
		}}
	>
		<Spin size="large" />
	</div>
);
