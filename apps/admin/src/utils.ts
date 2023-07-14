/**
 * Return the date string in this format - hh:mm, DD MMM
 * @param date
 * @returns
 */
export const formatCurrentTime = (date: string) => {
	const d = new Date(date);

	const locale = "default";
	const time = d.toLocaleString(locale, { timeStyle: "short" });
	const day = d.toLocaleString(locale, { day: "numeric" });
	const month = d.toLocaleString(locale, { month: "short" }).slice(0, 3);

	return time + ", " + day + " " + month;
};
