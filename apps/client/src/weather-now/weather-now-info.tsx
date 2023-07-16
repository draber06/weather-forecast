import { ClockCircleOutlined } from "@ant-design/icons";
import { Card, Space, Typography, Image } from "antd";
import { Weather } from "types";
import { formatCurrentTime, formatTemperature, getIconUrl } from "../utils";
import { t } from "../locale";

export const WeatherNowInfo = ({ weather }: { weather: Weather }) => {
	const title = (
		<Space align="center" size={10}>
			<Typography.Text>Сейчас</Typography.Text>
			<Space size={2}>
				<ClockCircleOutlined style={{ fontSize: 11 }} />
				<time dateTime={weather.now_dt} style={{ fontSize: 12 }}>
					{formatCurrentTime(weather.now_dt)}
				</time>
			</Space>
		</Space>
	);

	return (
		<Card
			headStyle={{ backgroundColor: "#fff5e6", fontWeight: "normal", width: 240 }}
			bordered
			title={title}
			size="small"
		>
			<Space align="center" style={{ width: "100%" }}>
				<Image
					width={48}
					src={getIconUrl(weather.fact.icon)}
					style={{ marginTop: 2 }}
					preview={false}
				/>
				<Typography.Text style={{ fontSize: 36 }}>
					{formatTemperature(weather.fact.temp)}
				</Typography.Text>
			</Space>

			<Typography.Paragraph type="secondary" style={{ margin: 0 }}>
				{t(`WeatherCondition|${weather.fact.condition}`)}
			</Typography.Paragraph>
		</Card>
	);
};
