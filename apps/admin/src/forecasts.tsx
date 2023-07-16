import { Card, Image, Segmented, Space, theme, Typography } from "antd";
import { Forecast } from "types";
import l from "./ru.json";
import { formatTemperature, getIconUrl } from "./utils";
import { useState } from "react";

import "./forecasts.css";

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

const ForecastDetails = ({ forecast }: { forecast: Forecast }) => {
	const {
		temp_avg,
		temp_max,
		temp_min,
		wind_speed,
		pressure_mm,
		humidity,
		feels_like,
		condition,
	} = forecast.parts.day;

	return (
		<Card>
			<div>
				<Image src={getIconUrl(forecast.parts.day_short.icon)} width={48} preview={false} />
				<div>{temp_min}</div>
				<div>{temp_max}</div>
				<div>{temp_avg}</div>
				<div>{feels_like}</div>
				<div>{l.condition[condition]}</div>
				<div>{wind_speed} м/с</div>
				<div>{pressure_mm} мм. рт. ст.</div>
				<div>{humidity}%</div>
			</div>
		</Card>
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
		<Space direction="vertical" size={0} style={{ width: "100%" }}>
			{/*TODO switch to tabs?*/}
			<Segmented block value={value} onChange={setValue} options={options} />

			{activeForecast && <ForecastDetails forecast={activeForecast} />}
		</Space>
	);
};
