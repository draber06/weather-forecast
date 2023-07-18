import { Descriptions } from "antd";
import { formatTemperature } from "../utils";
import { Weather } from "../types";

export const WeatherNowDescription = ({ weather }: { weather: Weather }) => {
	return (
		<Descriptions column={1} size="small">
			<Descriptions.Item label="Ощущается" style={{ padding: 0 }}>
				{formatTemperature(weather.fact.feels_like)}
			</Descriptions.Item>
			<Descriptions.Item label="Скорость ветра" style={{ padding: 0 }}>
				{weather.fact.wind_speed} м/с
			</Descriptions.Item>
			<Descriptions.Item label="Давление" style={{ padding: 0 }}>
				{weather.fact.pressure_mm} мм рт. ст.
			</Descriptions.Item>
			<Descriptions.Item label="Влажность" style={{ padding: 0 }}>
				{weather.fact.humidity}%
			</Descriptions.Item>
		</Descriptions>
	);
};
