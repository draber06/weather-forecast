import React from "react";
import { useGetWeatherForecastQuery } from "./app/services/yandex-weather";
import { useAppDispatch, useTypedSelector } from "./app/store";
import {
	addLocation,
	selectActiveLocation,
	selectLocations,
	setLocationError,
} from "./locations-slice";
import { List, Typography } from "antd";

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
	/**
		Отображается информация по текущему месту и погоде
		[x] - Широта и долгота - lon + lat
		[x] - Название местности - weather.get
		[x] - Местное время
		[x] - Температура
		[x] - Температура (ощущается)
		[] - Описание (солнечно, ветрено и т.д.)
		[] - Скорость ветра
		[] - Атмосферное давление
		[] - Влажность
	 */

	const res = {
		longitude: activeLocation?.longitude,
		latitude: activeLocation?.latitude,
		locationName: weather.geo_object.district.name + ", " + weather.geo_object.locality.name,
		now: new Date(weather.now_dt).toLocaleTimeString(),
		temp: weather.fact.temp,
		feelsLike: weather.fact.feels_like,
		condition: weather.fact.condition,
	};

	return (
		<div>
			<List
				bordered
				dataSource={Object.entries(res).map(([k, v]) => ({ title: k, description: v }))}
				renderItem={(item) => (
					<List.Item>
						<Typography.Text strong>{item.title}</Typography.Text> {item.description}
					</List.Item>
				)}
			/>
			<br />
			{JSON.stringify(activeLocation, null, 4)}
		</div>
	);
}

export default App;
