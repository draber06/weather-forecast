import { Space, Table, Typography, TableColumnsType } from "antd";
import { Day, Forecast } from "types";
import { chain } from "lodash-es";
import { WindDirection } from "../components/wind-direction";
import { formatTemperature, getIconUrl } from "../utils";
import "./forecast-details.css";
import { t } from "../locale";

const columns: TableColumnsType<Day & { time_of_day: string }> = [
	{
		dataIndex: "time_of_day",
		render: (_, record) => {
			const tempRange = `${formatTemperature(record.temp_min)}...${formatTemperature(
				record.temp_max,
			)}`;

			return (
				<div>
					<Typography.Paragraph
						type="secondary"
						style={{ margin: 0, fontSize: 12, lineHeight: 1 }}
					>
						{record.time_of_day}
					</Typography.Paragraph>
					{tempRange}
				</div>
			);
		},
	},
	{
		dataIndex: "icon",
		title: "Атмосферные явления",
		render: (name, record) => {
			return (
				<div
					style={{
						display: "flex",
						flexWrap: "nowrap",
						alignItems: "center",
						lineHeight: 1,
					}}
				>
					<img alt="" src={getIconUrl(name)} width={36} style={{ marginRight: 5 }} />
					{t(`WeatherCondition|${record.condition}`)}
				</div>
			);
		},
	},
	{
		dataIndex: "temp_avg",
		title: "Ср. темп.",
		render: (_, record) => formatTemperature(record.temp_avg),
	},
	{
		title: "Давление мм рт. ст.",
		dataIndex: "pressure_mm",
		width: 80,
	},
	{
		title: "Влажность",
		dataIndex: "humidity",
		render: (humidity) => humidity + "%",
	},
	{
		title: "Ветер, м/с",
		dataIndex: "wind_speed",
		render: (_, { wind_speed, wind_dir }) => {
			return (
				<Space align="center" size={6}>
					<span>{wind_speed}</span>
					<WindDirection wind_dir={wind_dir} />
				</Space>
			);
		},
		width: 100,
	},
	{
		title: "Ощущается как",
		dataIndex: "feels_like",
		render: (feels_like) => formatTemperature(feels_like),
	},
];

export const ForecastDetails = ({ forecast }: { forecast: Forecast }) => {
	const dataSource = chain(forecast.parts)
		.pick(["morning", "day", "evening", "night"])
		.map((v, k) => ({ ...v, time_of_day: t(`TimeOfDay|${k}`) }))
		.value();

	return (
		<Table
			dataSource={dataSource}
			columns={columns}
			pagination={false}
			rowKey={(row) => row.time_of_day}
		/>
	);
};
