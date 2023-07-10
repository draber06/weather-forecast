import { json, urlencoded } from "body-parser";
import express from "express";
import morgan from "morgan";
import cors from "cors";
import axios, { AxiosError } from "axios";

const instance = axios.create({
	baseURL: "https://api.weather.yandex.ru/v2/forecast/",
	headers: {
		// TODO move to env
		"X-Yandex-API-Key": "2335e23e-9cec-4e4c-886f-be7bdfc00d5c",
	},
});

export const createServer = () => {
	const app = express();
	app.disable("x-powered-by")
		.use(morgan("dev"))
		.use(urlencoded({ extended: true }))
		.use(json())
		.use(cors())
		.get("/forecast", async (req, res) => {
			try {
				const response = await instance.request({
					method: "GET",
					params: Object.assign({}, req.query, { lang: "ru_RU" }),
				});

				return res.status(200).send({ message: "success", data: response.data });
			} catch (error) {
				let message = "Something went wrong";
				if (error instanceof AxiosError) {
					message = error.message;
				}

				return res.status(403).send({ message });
			}
		});

	return app;
};
