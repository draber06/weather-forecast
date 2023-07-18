import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Weather } from "types";

// const { protocol, hostname } = window.location;
// const devBaseUrl = `${protocol}//${hostname}:5001`;

export const api = createApi({
	baseQuery: fetchBaseQuery({
		baseUrl: "api/weather-api",
		timeout: 5000,
	}),
	endpoints: (build) => ({
		getWeatherForecast: build.query<Weather, { lat: number; lon: number }>({
			query: (pos) => ({
				url: "",
				params: pos,
			}),
			transformResponse: (response: { data: Weather }) => response.data,
		}),
	}),
});

export const { useGetWeatherForecastQuery } = api;
