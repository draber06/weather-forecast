import { Descriptions } from "antd";
import { Weather } from "types";

export const WeatherNowDescription = ({ weather }: { weather: Weather }) => {
	return (
		<Descriptions
			column={1}
			size="small"
			contentStyle={{ fontSize: 13 }}
			labelStyle={{ fontSize: 13 }}
		>
			<Descriptions.Item label="Ощущается" style={{ padding: 0 }}>
				+{weather.fact.feels_like}&deg;
			</Descriptions.Item>
			<Descriptions.Item label="Скорость ветра" style={{ padding: 0 }}>
				{weather.fact.wind_speed} м/с
			</Descriptions.Item>
			<Descriptions.Item label="Давление" style={{ padding: 0 }}>
				{weather.fact.pressure_mm} мм рт. ст.{" "}
			</Descriptions.Item>
			<Descriptions.Item label="Влажность" style={{ padding: 0 }}>
				{weather.fact.humidity}%
			</Descriptions.Item>
		</Descriptions>
	);
};
