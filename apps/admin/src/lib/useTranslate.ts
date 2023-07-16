import l from "../ru.json";
import { useCallback } from "react";
import * as _ from "lodash-es";

export const useTranslate = (keyPrefix?: string) => {
	return useCallback(
		(key: string): string => {
			let path = key;
			if (keyPrefix) {
				path = `${keyPrefix}.${path}`;
			}
			const translation = _.get(l, path);
			if (!translation || typeof translation !== "string") {
				if (import.meta.env.DEV) {
					console.warn("Key is missing", key);
				}

				return key;
			}

			return translation;
		},
		[keyPrefix],
	);
};
