import { useGetWeatherForecastQuery } from "./app/services/yandex-weather";
import { useAppDispatch, useTypedSelector } from "./app/store";
import { addLocation, selectActiveLocation, setLocationError } from "./locations/locations-slice";
import { Divider, Layout, Space, theme, Typography } from "antd";
import { WeatherNowInfo } from "./weather-now/weather-now-info";
import { WeatherNowDescription } from "./weather-now/weather-now-description";
import { Forecasts } from "./forecast-details/forecasts";
import { AsyncSection } from "./components/async-section";
import { useEffect } from "react";
import { ReactComponent as LogoIcon } from "./assets/logo-white.svg";
import { Locations } from "./locations/locations";

import { getTitle } from "./utils";

const { Content } = Layout;

const options: PositionOptions = {
	enableHighAccuracy: true,
	timeout: 5000,
	maximumAge: 0,
};

export const App = () => {
	const dispatch = useAppDispatch();
	const { token } = theme.useToken();

	const activeLocation = useTypedSelector(selectActiveLocation);
	const {
		data: weather,
		isLoading,
		isError,
	} = useGetWeatherForecastQuery(
		{ lat: activeLocation?.latitude ?? 0, lon: activeLocation?.longitude ?? 0 },
		{ skip: !activeLocation, refetchOnMountOrArgChange: true },
	);

	useEffect(() => {
		if (navigator.geolocation) {
			navigator.permissions.query({ name: "geolocation" }).then((res) => {
				switch (res.state) {
					case "granted":
					case "prompt":
						navigator.geolocation.getCurrentPosition(
							(pos) =>
								dispatch(
									addLocation({
										latitude: pos.coords.latitude,
										longitude: pos.coords.longitude,
									}),
								),
							(err) => dispatch(setLocationError(err)),
							options,
						);
						break;
					case "denied":
						// TODO show button "Разрешить доступ к данным геопозиции"
						console.log(res.state);
				}
			});
		} else {
			console.log("Oops! It looks like Geolocation API is not supported by the browser.");
		}
	}, [dispatch]);

	return (
		<Layout>
			<Layout style={{ maxWidth: 1200, margin: "auto", minHeight: "100vh", minWidth: 1200 }}>
				<Layout.Header>
					<a href="https://yandex.ru/pogoda/">
						<LogoIcon style={{ verticalAlign: "middle" }} height={32} />
					</a>
				</Layout.Header>
				<Layout hasSider>
					<Layout.Sider
						style={{ overflow: "hidden", padding: "24px 0" }}
						width={320}
						theme="light"
					>
						<Locations />
					</Layout.Sider>
					<Layout style={{ padding: "16px 24px 24px" }}>
						{weather && (
							<AsyncSection isLoading={isLoading} isError={isError}>
								<Typography.Title>{getTitle(weather)}</Typography.Title>
								<Content
									style={{ padding: 24, background: token.colorBgContainer }}
								>
									<Space direction="vertical" size={15}>
										<Space align="start" size={14}>
											<WeatherNowInfo weather={weather} />
											<WeatherNowDescription weather={weather} />
										</Space>
										<Divider style={{ margin: 0 }} />

										<Forecasts forecasts={weather.forecasts} />
									</Space>
								</Content>
							</AsyncSection>
						)}
					</Layout>
				</Layout>
			</Layout>
		</Layout>
	);
};