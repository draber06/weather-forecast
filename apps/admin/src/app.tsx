import { useGetWeatherForecastQuery } from "./app/services/yandex-weather";
import { useAppDispatch, useTypedSelector } from "./app/store";
import { addLocation, selectActiveLocation, setLocationError } from "./locations-slice";
import { Layout, Space, Typography, Divider } from "antd";
import l from "./ru.json";
import { WeatherNowInfo } from "./weather-now-info";
import { WeatherNowDescription } from "./weather-now-description";
import { Forecasts } from "./forecasts";
import { useEffect } from "react";

const { Content } = Layout;

const options: PositionOptions = {
	enableHighAccuracy: true,
	timeout: 5000,
	maximumAge: 0,
};

function App() {
	const dispatch = useAppDispatch();

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
		<Layout style={{ minHeight: "100vh" }}>
			<Content style={{ maxWidth: 960, margin: "auto", padding: "16px 24px" }}>
				<Typography.Title>
					Погода в <span className="capitalize">{weather.geo_object.district.name}</span>,{" "}
					{weather.geo_object.locality.name}
				</Typography.Title>

				<Space direction="vertical" size={15}>
					<Space align="start" size={14}>
						<WeatherNowInfo weather={weather} />
						<WeatherNowDescription weather={weather} />
					</Space>
					<Divider style={{ margin: 0 }} />
					<div>
						<Typography.Title level={2}>Прогноз погоды по дням </Typography.Title>
						<Typography.Paragraph>
							Сегодня {new Date().getDate()}{" "}
							{new Date().toLocaleString("ru", { month: "long" })}, погода +
							{weather.fact.temp}°C.{" "}
							<span className="capitalize">
								{l.condition[weather.fact.condition]}
							</span>
							, ветер
							{weather.fact.wind_speed} м/с. Атмосферное давление{" "}
							{weather.fact.pressure_mm} мм рт. ст. Относительная влажность воздуха{" "}
							{weather.fact.humidity}%.
						</Typography.Paragraph>
					</div>
					<Forecasts forecasts={weather.forecasts} />
				</Space>
			</Content>
		</Layout>
	);
}

export default App;
