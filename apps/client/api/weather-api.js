export default async (request, response) => {
	try {
		const url = new URL("https://api.weather.yandex.ru/v2/forecast");

		url.searchParams.set("lat", request.query.lat);
		url.searchParams.set("lon", request.query.lon);
		url.searchParams.set("lang", "ru_RU");

		const res = await fetch(url, {
			// eslint-disable-next-line no-undef,turbo/no-undeclared-env-vars
			headers: { "X-Yandex-API-Key": process.env.YANDEX_WEATHER_API_KEY },
		});

		if (!res.ok) {
			return response.status(403).send({ message: res.statusText });
		}
		const json = await res.json();

		return response.status(200).send({ message: "success", data: json });
	} catch (error) {
		return response.status(403).send({ message: error.message });
	}
};
