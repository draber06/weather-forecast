import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Weather } from "types";

const { protocol, hostname } = window.location;
const baseUrl = `${protocol}//${hostname}:5001`;

export const api = createApi({
	baseQuery: fetchBaseQuery({ baseUrl }),
	endpoints: (build) => ({
		getWeatherForecast: build.query<Weather, { lat: number; lon: number }>({
			query: (pos) => ({
				url: "/forecast",
				params: pos,
			}),
			transformResponse: (response: { data: Weather }) => response.data,
		}),
	}),
});

export const { useGetWeatherForecastQuery } = api;
