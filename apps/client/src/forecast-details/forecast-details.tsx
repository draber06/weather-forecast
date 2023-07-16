import { Space, Table, Typography } from "antd";
import { formatTemperature, getIconUrl } from "../utils";
import { Day, Forecast } from "types";
import type { ColumnsType } from "antd/es/table";
import { WindDirection } from "../components/wind-direction";

import "./forecast-details.css";
import { t } from "../locale";

type ForecastColumn = Day & { time_of_day: string };

const columns: ColumnsType<ForecastColumn> = [
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
	},
	{
		title: "Ощущается как",
		dataIndex: "feels_like",
		render: (feels_like) => formatTemperature(feels_like),
	},
];

export const ForecastDetails = ({ forecast }: { forecast: Forecast }) => {
	const parts = (({ morning, day, night, evening }) => ({
		morning,
		day,
		evening,
		night,
	}))(forecast.parts);

	const dataSource = Object.entries(parts).map(([k, v]) => ({
		...v,
		time_of_day: t(`TimeOfDay|${k}`),
	})) as ForecastColumn[];

	return (
		<Table
			dataSource={dataSource}
			columns={columns}
			pagination={false}
			rowKey={(row) => row.time_of_day}
		/>
	);
};
