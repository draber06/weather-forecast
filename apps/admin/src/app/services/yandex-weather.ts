import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface WeatherForecast {
	id: string;
	name: string;
}

type WeatherForecastResponse = WeatherForecast[];

const { protocol, hostname } = window.location;
const baseUrl = `${protocol}//${hostname}:5001`;

export const api = createApi({
	baseQuery: fetchBaseQuery({ baseUrl }),
	tagTypes: ["Weather Forecast"],
	endpoints: (build) => ({
		getWeatherForecasts: build.query<WeatherForecastResponse, { lat: string; lon: string }>({
			query: (pos) => ({
				url: "/forecast",
				params: pos,
			}),
			// providesTags: result => {
			// 	console.log("-----", "result", result);
			// 	return result
			// 		? [
			// 				...result.map(({ id }) => ({ type: "Weather Forecast" as const, id })),
			// 				{ type: "Weather Forecast", id: "LIST" },
			// 		  ]
			// 		: [{ type: "Weather Forecast", id: "LIST" }];
			// },
		}),
	}),
});

export const { useGetWeatherForecastsQuery } = api;
