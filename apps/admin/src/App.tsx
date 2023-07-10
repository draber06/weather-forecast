import React from "react";
import "antd/dist/reset.css";
import { useGetWeatherForecastsQuery } from "./app/services/yandex-weather";

function errors(err: GeolocationPositionError) {
	console.warn(`ERROR(${err.code}): ${err.message}`);
}

const options: PositionOptions = {
	enableHighAccuracy: true,
	timeout: 5000,
	maximumAge: 0,
};

function App() {
	const [coords, setCoords] = React.useState<GeolocationCoordinates | null>(null);
	const { data } = useGetWeatherForecastsQuery(
		{ lat: coords?.latitude, lon: coords?.longitude },
		{ skip: !coords }
	);

	React.useEffect(() => {
		if (navigator.geolocation) {
			navigator.permissions.query({ name: "geolocation" }).then((res) => {
				switch (res.state) {
					case "granted":
					case "prompt":
						navigator.geolocation.getCurrentPosition(
							(pos) => {
								setCoords(pos.coords);
							},
							// TODO Show errors?
							errors,
							options
						);
						break;
					case "denied":
						// TODO show button "Разрешить доступ к данным геопозиции"
						console.log(res.state);
				}
				res.onchange = function () {
					console.log(res.state);
				};
			});
		} else {
			console.log("Oops! It looks like Geolocation API is not supported by the browser.");
		}
	}, []);

	console.log("-----", "data", data);
	console.log("-----", "coords", coords);

	return <div>Hello</div>;
}

export default App;
