import l from "./ru.json";
import { get, has } from "lodash";

/**
 * Translate string by key
 * @param {string} key
 * @returns {string}
 */
const getTranslation = (key: string): string => {
	if (!has(l, key) || typeof get(l, key) !== "string") {
		if (import.meta.env.DEV) {
			console.warn("Key is missing", key);
		}
		return key;
	}

	return get(l, key);
};

export { getTranslation as t };
