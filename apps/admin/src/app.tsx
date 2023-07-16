import React from "react";
import { useGetWeatherForecastQuery } from "./app/services/yandex-weather";
import { useAppDispatch, useTypedSelector } from "./app/store";
import {
	addLocation,
	selectActiveLocation,
	selectLocations,
	setLocationError,
} from "./locations-slice";
import { Card, Col, Descriptions, Layout, List, Row, Space, Typography } from "antd";
import { Fact } from "types";
import l from "./ru.json";

const { Content } = Layout;

const options: PositionOptions = {
	enableHighAccuracy: true,
	timeout: 5000,
	maximumAge: 0,
};

/**
	Отображается информация по текущему месту и погоде
	[x] - Широта и долгота - lon + lat
	[x] - Название местности - weather.get
	[x] - Местное время
	[x] - Температура
	[x] - Температура (ощущается)
	[x] - Описание (солнечно, ветрено и т.д.)
	[x] - Скорость ветра
	[x] - Атмосферное давление
	[x] - Влажность

	[] - создать карточку с погодой
*/

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
		{
			title: "Название местности",
			description: weather.geo_object.district.name + ", " + weather.geo_object.locality.name,
		},
		{
			title: "Местное время",
			description: new Date(weather.now_dt).toLocaleTimeString(),
		},
		{
			title: "Температура",
			description: weather.fact.temp,
		},
		{
			title: "Температура (ощущается)",
			description: weather.fact.feels_like,
		},
		{
			title: "Описание",
			// TODO add translation system?
			description: (l.condition as { [key: string]: any })[weather.fact.condition],
		},
		{
			title: "Скорость ветра",
			description: weather.fact.wind_speed,
		},
		{
			title: "Атмосферное давление",
			description: weather.fact.pressure_mm,
		},
		{
			title: "Влажность",
			description: weather.fact.humidity,
		},
	];

	const title =
		weather.geo_object.district.name[0].toUpperCase() +
		weather.geo_object.district.name.slice(1) +
		", " +
		weather.geo_object.locality.name;

	return (
		<Layout style={{ minHeight: "100vh" }}>
			<Content>
				<Typography.Title style={{ fontSize: 24 }}>Погода в {title}</Typography.Title>

				<Space align="start">
					<Card style={{ width: 240 }}>
						<Typography.Text>Сейчас</Typography.Text>
					</Card>

					<Descriptions column={1} size="small">
						<Descriptions.Item label="Ощущается">
							+{weather.fact.feels_like}°
						</Descriptions.Item>
						<Descriptions.Item label="Скорость ветра">
							{weather.fact.wind_speed} м/с
						</Descriptions.Item>
						<Descriptions.Item label="Давление">
							{weather.fact.pressure_mm} мм рт. ст.{" "}
						</Descriptions.Item>
						<Descriptions.Item label="Влажность">
							{weather.fact.humidity}%
						</Descriptions.Item>
					</Descriptions>
				</Space>
			</Content>
		</Layout>
	);
}

export default App;
