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
 * Get an icon according to Yandex Weather guidelines (https://yandex.ru/dev/weather/doc/dg/concepts/forecast-info.html#resp-format__fact)
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
