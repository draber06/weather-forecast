import React, { useEffect } from "react";
import { useGetWeatherForecastQuery } from "./app/services/yandex-weather";
import { useAppDispatch, useTypedSelector } from "./app/store";
import { addLocation, selectActiveLocation } from "./locations/locations-slice";
import { Card, Divider, Empty, Layout, Space, theme, Typography } from "antd";
import { WeatherNowInfo } from "./weather-now/weather-now-info";
import { WeatherNowDescription } from "./weather-now/weather-now-description";
import { Forecasts } from "./forecast-details/forecasts";
import { AsyncSection } from "./components/async-section";
import { ReactComponent as LogoIcon } from "./assets/logo-white.svg";
import { Locations } from "./locations/locations";
import { getTitle } from "./utils";
import { useLocation } from "./hooks/use-location";

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

	const { isGeolocationAvailable, isGeolocationEnabled, coords } = useLocation();

	useEffect(() => {
		if (coords) {
			dispatch(
				addLocation({
					latitude: coords.latitude,
					longitude: coords.longitude,
				}),
			);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [JSON.stringify(coords), dispatch]);

	return (
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
					{isGeolocationAvailable && isGeolocationEnabled && <Locations />}
				</Layout.Sider>
				<Layout.Content style={{ padding: "16px 0 24px 24px" }}>
					{!isGeolocationAvailable ? (
						<Card>
							<Empty description="К сожалению ваш бразуер не поддерживает геолокацию" />
						</Card>
					) : !isGeolocationEnabled ? (
						<Card>
							<Empty description="Пожалуйста разрешите доступ к данными геопозиции в настройках вашего бразуера!" />
						</Card>
					) : (
						<AsyncSection isLoading={isLoading} isError={isError}>
							{weather && (
								<>
									<Typography.Title>{getTitle(weather)}</Typography.Title>
									<Layout
										style={{
											padding: 24,
											background: token.colorBgContainer,
										}}
									>
										<Space direction="vertical" size={15}>
											<Space align="start" size={14}>
												<WeatherNowInfo weather={weather} />
												<WeatherNowDescription weather={weather} />
											</Space>
											<Divider style={{ margin: 0 }} />

											<Forecasts forecasts={weather.forecasts} />
										</Space>
									</Layout>
								</>
							)}
						</AsyncSection>
					)}
				</Layout.Content>
			</Layout>
		</Layout>
	);
};
