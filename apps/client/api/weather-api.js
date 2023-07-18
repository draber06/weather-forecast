export default async (request, response) => {
	try {
		const url = new URL("https://api.weather.yandex.ru/v2/forecast/");
		console.log("-----", "request.params", request.params);

		url.searchParams.set("lang", "ru_RU");
		url.searchParams.set("lat", request.query.lat);
		url.searchParams.set("lon", request.query.lat);
		url.searchParams.set("lang", "ru_RU");

		const res = await fetch(url);
		return response.status(200).send({ message: "success", data: res });
	} catch (error) {
		return response.status(403).send({ message: error.message });
	}
};
