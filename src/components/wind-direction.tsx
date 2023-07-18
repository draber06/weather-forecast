import { theme, Typography } from "antd";
import { ReactComponent as WindDirectionIcon } from "../assets/wind-direction.svg";
import { t } from "../locale";
import { WindDir } from "../types";

// Wind direction
const mapper = {
	nw: 135,
	n: 180,
	ne: -135,
	e: -90,
	se: 45,
	s: 0,
	sw: 45,
	w: 90,
	c: 0,
};

export const WindDirection = ({ wind_dir }: { wind_dir: WindDir }) => {
	const { token } = theme.useToken();

	return (
		<Typography.Text style={{ fontSize: token.fontSizeSM }} type="secondary">
			<WindDirectionIcon
				style={{
					position: "relative",
					top: 4,
					marginRight: 3,
					transform: `rotate(${mapper[wind_dir]}deg)`,
				}}
			/>
			{wind_dir !== "c" && (
				<span style={{ lineHeight: 1 }}>{t(`WindDirection|${wind_dir}`)}</span>
			)}
		</Typography.Text>
	);
};
