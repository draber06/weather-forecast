import { chain, isNull, round } from "lodash-es";
import { Weather } from "types";

/**
 * Return the date string in this format - hh:mm, DD MMM
 * @param date
 * @returns {string}
 */
export const formatCurrentTime = (date: string): string => {
	const d = new Date(date);

	const locale = "ru";
	const time = d.toLocaleString(locale, { timeStyle: "short" });
	const day = d.getDate();
	const month = d.toLocaleString(locale, { month: "short" });

	return time + ", " + day + " " + month;
};

/**
 * Get an icon according to Yandex Weather guidelines
 * https://yandex.ru/dev/weather/doc/dg/concepts/forecast-info.html#resp-format__fact
 *
 * @param name
 * @returns {string}
 */
export const getIconUrl = (name: string): string =>
	`https://yastatic.net/weather/i/icons/funky/dark/${name}.svg`;

/**
 * Add sign to temperature if needed
 * @example
 * // returns +20°
 * formatTemp(20)
 *
 * @example
 * // returns -20°
 * formatTemp(-20)
 *
 * @param {number}  t
 * @returns {string}
 */
export const formatTemperature = (t: number): string => {
	const formattedT = t > 0 ? "+" + t : t;
	return formattedT + "°";
};

/**
 * Format longitude and latitude
 *
 * @example
 * // returns 80 с.ш., 100 в.д.
 * formatCoords(80, 100)
 *
 * @example
 * // returns 80 ю.ш., 100 з.д.
 * formatCoords(-80, -100)
 *
 * @param lat - latitude
 * @param lon - longitude
 * @returns {string}
 */
export const getLocationAlias = ({ lat, lon }: { lat: number; lon: number }): string => {
	const latUnits = lat >= 0 ? "с.ш." : "ю.ш.";
	const longUnits = lon >= 0 ? "в.д." : "з.д.";

	return `${round(lat, 5)} ${latUnits}` + ", " + `${round(lon, 5)} ${longUnits}`;
};

export const getTitle = (weather: Weather) => {
	return chain(weather.geo_object)
		.reject(isNull)
		.map("name")
		.take(2)
		.concat(getLocationAlias(weather.info))
		.join(", ")
		.value();
};
