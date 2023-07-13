import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Weather } from "types";

const { protocol, hostname } = window.location;
const baseUrl = `${protocol}//${hostname}:5001`;

export const api = createApi({
	baseQuery: fetchBaseQuery({ baseUrl }),
	// tagTypes: ["Weather Forecast"],
	endpoints: (build) => ({
		getWeatherForecast: build.query<Weather, { lat: number; lon: number }>({
			query: (pos) => ({
				url: "/forecast",
				params: pos,
			}),
			transformResponse: (response: { data: Weather }) => response.data,
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

export const { useGetWeatherForecastQuery } = api;
