import { ClockCircleOutlined } from "@ant-design/icons";
import { Card, Space, Typography, Image } from "antd";
import { Weather } from "types";
import { formatCurrentTime, getIconUrl } from "./utils";

export const WeatherNowInfo = ({ weather }: { weather: Weather }) => {
	return (
		<Card
			style={{ width: 240 }}
			headStyle={{ backgroundColor: "#fff5e6", fontWeight: "normal" }}
			bordered
			title={
				<Space align="center" size={10}>
					<Typography.Text>Сейчас</Typography.Text>
					<Space size={2}>
						<ClockCircleOutlined style={{ fontSize: 11 }} />
						<time dateTime={weather.now_dt} style={{ fontSize: 12 }}>
							{formatCurrentTime(weather.now_dt)}
						</time>
					</Space>
				</Space>
			}
			size="small"
		>
			<Space>
				<Image
					width={48}
					src={getIconUrl(weather.fact.icon)}
					style={{ marginTop: 2 }}
					preview={false}
				/>
				<div>
					<Typography.Text style={{ fontSize: 36 }}>
						+{weather.fact.temp}&deg;
					</Typography.Text>
				</div>
			</Space>
		</Card>
	);
};
