import { useTranslate } from "./useTranslate";

export const Trans = ({ key }: { key: string }) => {
	const t = useTranslate();

	return t(key);
};
