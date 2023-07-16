import { Space, Table, Typography } from "antd";
import { formatTemperature, getIconUrl } from "./utils";
import l from "./ru.json";
import { Day, Forecast } from "types";
import type { ColumnsType } from "antd/es/table";
import { WindDirection } from "./wind-direction";

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
				<div>
					<img alt="" src={getIconUrl(name)} width={36} style={{ marginRight: 3 }} />
					{l.condition[record.condition]}
				</div>
			);
		},
	},
	{
		dataIndex: "temp_avg",
		title: "Ср. температура",
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
		time_of_day: (l.time_of_day as Record<string, string>)[k],
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
