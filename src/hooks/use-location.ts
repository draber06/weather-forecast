import { useEffect, useState } from "react";
import { pick } from "lodash";

const options: PositionOptions = {
	enableHighAccuracy: true,
	timeout: 5000,
	maximumAge: 0,
};

type UseLocationReturn = {
	coords: { longitude: number; latitude: number } | null;
	isGeolocationEnabled: boolean;
	isGeolocationAvailable: boolean;
};

export const useLocation = (): UseLocationReturn => {
	const [coords, setCoords] = useState<null | GeolocationCoordinates>(null);
	const [isGeolocationEnabled, setIsGeolocationEnabled] = useState<boolean>(false);
	const [isGeolocationAvailable, setIsGeolocationAvailable] = useState<boolean>(false);

	useEffect(() => {
		if (!navigator.geolocation) {
			console.log("Oops! It looks like Geolocation API is not supported by the browser.");
			return;
		}

		setIsGeolocationAvailable(true);

		navigator.permissions.query({ name: "geolocation" }).then((res) => {
			switch (res.state) {
				case "granted":
				case "prompt":
					navigator.geolocation.getCurrentPosition(
						(pos) => {
							setCoords(pos.coords);
							setIsGeolocationEnabled(true);
						},
						() => setIsGeolocationEnabled(false),
						options,
					);
					break;
				case "denied":
					console.warn("Geolocation permission = ", res.state);
					setIsGeolocationEnabled(false);
			}
		});
	}, []);

	return {
		coords: coords ? pick(coords, ["longitude", "latitude"]) : coords,
		isGeolocationEnabled,
		isGeolocationAvailable,
	};
};
