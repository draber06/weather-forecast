import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { ConfigProvider } from "antd";
import { store } from "./app/store";
import App from "./app";

import "antd/dist/reset.css";
import "./main.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<Provider store={store}>
			<ConfigProvider
				theme={{
					components: {
						Layout: {
							colorBgBody: "white",
						},
					},
					token: {
						fontSizeHeading1: 28,
						fontSizeHeading2: 20,
						fontSizeHeading3: 16,
						fontSizeSM: 13,
						fontSizeXL: 18,
					},
				}}
			>
				<App />
			</ConfigProvider>
		</Provider>
	</React.StrictMode>,
);
