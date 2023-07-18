import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { ConfigProvider, ThemeConfig } from "antd";
import { PersistGate } from "redux-persist/integration/react";
import { createStore } from "./app/store";
import { App } from "./app";

import "antd/dist/reset.css";
import "./main.css";
import { FullScreenLoader } from "./components/full-screen-loader";

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

const { store, persistor } = createStore();

ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<Provider store={store}>
			<PersistGate persistor={persistor} loading={<FullScreenLoader />}>
				<ConfigProvider theme={theme}>
					<App />
				</ConfigProvider>
			</PersistGate>
		</Provider>
	</React.StrictMode>,
);
