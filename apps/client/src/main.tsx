import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { ConfigProvider, ThemeConfig } from "antd";
import { store } from "./app/store";
import { App } from "./app";

import "antd/dist/reset.css";
import "./main.css";

const theme: ThemeConfig = {
	token: {
		fontSizeHeading1: 28,
		fontSizeHeading2: 20,
		fontSizeHeading3: 16,
		fontSizeSM: 13,
		fontSizeXL: 18,
		colorText: "rgba(38,38,51,1)",
		colorTextSecondary: "rgba(133,136,158,1)",
	},
};

ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<Provider store={store}>
			<ConfigProvider theme={theme}>
				<App />
			</ConfigProvider>
		</Provider>
	</React.StrictMode>,
);
