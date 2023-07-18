import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Weather } from "types";

// const { protocol, hostname } = window.location;
// const devBaseUrl = `${protocol}//${hostname}:5001`;
const WEATHER_API_URL = "https://api.weather.yandex.ru/v2/forecast/";
// Better to hide it in the future
const API_KEY = "2335e23e-9cec-4e4c-886f-be7bdfc00d5c";

export const api = createApi({
	baseQuery: fetchBaseQuery({
		timeout: 5000,
		headers: {
			"X-Yandex-API-Key": API_KEY,
		},
	}),
	endpoints: (build) => ({
		getWeatherForecast: build.query<Weather, { lat: number; lon: number }>({
			query: (pos) => ({
				url: WEATHER_API_URL,
				params: { ...pos, lang: "ru_RU" },
			}),
		}),
	}),
});

export const { useGetWeatherForecastQuery } = api;
