import { Segmented, Space, theme, Typography } from "antd";
import { Forecast } from "types";
import { formatTemperature, getIconUrl } from "../utils";
import { useState } from "react";

import "./forecasts.css";
import { ForecastDetails } from "./forecast-details";

const ForecastBriefly = ({ forecast }: { forecast: Forecast }) => {
	const { token } = theme.useToken();

	const date = new Date(forecast.date);
	const dayOfWeek = date.toLocaleString("ru", {
		weekday: "short",
	});
	const dayOfMonth = date.toLocaleString("ru", {
		day: "numeric",
		month: "long",
	});

	return (
		<div>
			<Typography.Paragraph
				strong
				className="capitalize"
				style={{ fontSize: token.fontSizeXL, marginBottom: 0 }}
			>
				{dayOfWeek}
			</Typography.Paragraph>
			<Typography.Text type="secondary">
				<time dateTime={forecast.date}>{dayOfMonth}</time>
			</Typography.Text>
			<div style={{ margin: "10px 0" }}>
				<img alt="" src={getIconUrl(forecast.parts.day_short.icon)} width={48} />
			</div>
			<Typography.Paragraph
				strong
				style={{
					margin: 0,
					fontSize: token.fontSizeXL,
				}}
			>
				{formatTemperature(forecast.parts.day.temp_avg)}
			</Typography.Paragraph>
			<Typography.Paragraph
				type="secondary"
				style={{
					margin: 0,
					fontSize: token.fontSizeSM,
				}}
			>
				<span style={{ marginRight: 3 }}>ночью</span>
				{formatTemperature(forecast.parts.night.temp_avg)}
			</Typography.Paragraph>
		</div>
	);
};

export const Forecasts = ({ forecasts }: { forecasts: Forecast[] }) => {
	// TODO move to redux
	const [value, setValue] = useState<string | number>(forecasts[0].date_ts);

	const activeForecast = forecasts.find((f) => f.date_ts === value);

	const options = forecasts.map((forecast) => ({
		label: <ForecastBriefly forecast={forecast} />,
		value: forecast.date_ts,
	}));

	return (
		<Space direction="vertical" size={8} style={{ width: "100%" }}>
			<Typography.Title level={2}>Прогноз погоды по дням </Typography.Title>
			<Segmented block value={value} onChange={setValue} options={options} />
			{activeForecast && <ForecastDetails forecast={activeForecast} />}
		</Space>
	);
};
