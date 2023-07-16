import { useGetWeatherForecastQuery } from "./app/services/yandex-weather";
import { useAppDispatch, useTypedSelector } from "./app/store";
import { addLocation, selectActiveLocation, setLocationError } from "./app/locations-slice";
import { Layout, Space, Typography, Divider, theme } from "antd";
import { WeatherNowInfo } from "./weather-now/weather-now-info";
import { WeatherNowDescription } from "./weather-now/weather-now-description";
import { Forecasts } from "./forecast-details/forecasts";
import { useEffect } from "react";
import { ReactComponent as WeatherLogoIcon } from "./assets/logo_weather_ru_indoor.svg";

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
	const { data: weather } = useGetWeatherForecastQuery(
		{ lat: activeLocation?.latitude ?? 0, lon: activeLocation?.longitude ?? 0 },
		{ skip: !activeLocation },
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

	if (!weather) return;

	return (
		<Layout style={{ maxWidth: 1200, margin: "auto", minHeight: "100vh" }}>
			<Layout.Header>
				<a href="https://yandex.ru/pogoda/">
					<WeatherLogoIcon style={{ verticalAlign: "middle" }} />
				</a>
			</Layout.Header>
			<Layout hasSider>
				<Layout.Sider style={{ background: token.colorBgContainer }}>Hello</Layout.Sider>
				<Layout style={{ padding: "16px 24px 24px" }}>
					<Typography.Title>
						Погода в{" "}
						<span className="capitalize">{weather.geo_object.district.name}</span>,{" "}
						{weather.geo_object.locality.name}
					</Typography.Title>
					<Content style={{ padding: 24, background: token.colorBgContainer }}>
						<Space direction="vertical" size={15}>
							<Space align="start" size={14}>
								<WeatherNowInfo weather={weather} />
								<WeatherNowDescription weather={weather} />
							</Space>
							<Divider style={{ margin: 0 }} />

							<Forecasts forecasts={weather.forecasts} />
						</Space>
					</Content>
				</Layout>
			</Layout>
		</Layout>
	);
};
