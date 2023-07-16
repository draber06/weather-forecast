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

// const pluralRules = new Intl.PluralRules("ru");

// /**
//  * Pluralization
//  * @param count
//  * @param singular
//  * @param plural
//  * @returns {string}
//  */

// export const pluralize = (count: number, singular: string, plural: string): string => {
// 	const grammaticalNumber = pluralRules.select(count);
// 	switch (grammaticalNumber) {
// 		case "one":
// 			return count + " " + singular;
// 		case "other":
// 			return count + " " + plural;
// 		default:
// 			throw new Error("Unknown: " + grammaticalNumber);
// 	}
// };
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
