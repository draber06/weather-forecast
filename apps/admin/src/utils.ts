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
 * Capitalize first letter of the given string
 * @param s string to convert
 * @returns {string}
 */
export const capitalizeFirstLetter = (s: string): string => s.charAt(0).toUpperCase() + s.slice(1);

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
