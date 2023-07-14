import React from "react";
import { useGetWeatherForecastQuery } from "./app/services/yandex-weather";
import { useAppDispatch, useTypedSelector } from "./app/store";
import {
	addLocation,
	selectActiveLocation,
	selectLocations,
	setLocationError,
} from "./locations-slice";
import { Layout, Space, Typography, Image, Divider, Segmented } from "antd";
import { Fact } from "types";
import l from "./ru.json";
import { WeatherNowInfo } from "./weather-now-info";
import { WeatherNowDescription } from "./weather-now-description";
import { capitalizeFirstLetter, getIconUrl } from "./utils";
import { Forecasts } from "./forecasts";

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
		{ skip: !activeLocation }
	);

	React.useEffect(() => {
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
									})
								),
							(err) => dispatch(setLocationError(err)),
							options
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
	}, []);

	if (!weather) return;

	const dataSource = [
		{
			title: "Долгота",
			description: activeLocation?.longitude,
		},
		{
			title: "Широта",
			description: activeLocation?.latitude,
		},
	];

	const currentLocation = capitalizeFirstLetter(weather.geo_object.district.name);
	", " + weather.geo_object.locality.name;

	return (
		<Layout style={{ minHeight: "100vh" }}>
			<Content>
				<Typography.Title>Погода в {currentLocation}</Typography.Title>

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
							{capitalizeFirstLetter(l.condition[weather.fact.condition])}, ветер
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
