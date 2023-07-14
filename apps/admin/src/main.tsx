import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { ConfigProvider } from "antd";
import { store } from "./app/store";
import App from "./app";

import "./main.css";
import "antd/dist/reset.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<Provider store={store}>
			<ConfigProvider
				theme={{
					token: {
						colorBgLayout: "white",
					},
				}}
			>
				<App />
			</ConfigProvider>
		</Provider>
	</React.StrictMode>
);
