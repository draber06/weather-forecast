import { Segmented, Image } from "antd";
import { Forecast } from "types";
import l from "./ru.json";
import { getIconUrl } from "./utils";
import { useState } from "react";

const ForecastBriefly = ({ forecast }: { forecast: Forecast }) => {
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

	const date = new Date(forecast.date_ts * 1000);
	const day = date.getDate();
	const dayOfWeek = date.toLocaleString("ru", {
		weekday: "long",
	});
	const month = date.toLocaleString("ru", {
		month: "long",
	});
	return (
		<div>
			<div>{dayOfWeek}</div>
			<div>{day}</div>
			<div>{month}</div>
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
	);
};

export const Forecasts = ({ forecasts }: { forecasts: Forecast[] }) => {
	// TODO move to redux
	const [value, setValue] = useState<string | number>(forecasts[0].date_ts);
	return (
		// TODO switch to tabs?
		<Segmented
			block
			value={value}
			onChange={setValue}
			options={forecasts.map((forecast) => ({
				label: <ForecastBriefly forecast={forecast} />,
				value: forecast.date_ts,
			}))}
		/>
	);
};
