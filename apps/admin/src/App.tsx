import React from "react";
import { useGetWeatherForecastsQuery } from "./app/services/yandex-weather";
import { useAppDispatch, useTypedSelector } from "./app/store";
import {
	addLocation,
	selectActiveLocation,
	selectLocations,
	setLocationError,
} from "./locations-slice";

const options: PositionOptions = {
	enableHighAccuracy: true,
	timeout: 5000,
	maximumAge: 0,
};

function App() {
	const dispatch = useAppDispatch();
	const activeLocation = useTypedSelector(selectActiveLocation);
	const { data } = useGetWeatherForecastsQuery(
		{ lat: activeLocation?.latitude, lon: activeLocation?.longitude },
		{ skip: !activeLocation }
	);

	React.useEffect(() => {
		if (navigator.geolocation) {
			navigator.permissions.query({ name: "geolocation" }).then((res) => {
				switch (res.state) {
					case "granted":
					case "prompt":
						navigator.geolocation.getCurrentPosition(
							(pos) =>
								dispatch(
									addLocation({
										latitude: pos.coords.latitude,
										longitude: pos.coords.longitude,
									})
								),
							(err) => dispatch(setLocationError(err)),
							options
						);
						break;
					case "denied":
						// TODO show button "Разрешить доступ к данным геопозиции"
						console.log(res.state);
				}
			});
		} else {
			console.log("Oops! It looks like Geolocation API is not supported by the browser.");
		}
	}, []);

	console.log("-----", "activeLocation", activeLocation);
	console.log(`-----data = `, JSON.stringify(data, null, 4));

	return <div>Hello</div>;
}

export default App;
