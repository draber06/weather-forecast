export interface Weather {
	now: number;
	now_dt: string;
	info: Info;
	geo_object: GeoObject;
	yesterday: Yesterday;
	fact: Fact;
	forecasts: Forecasts;
}

type Forecasts = [Forecast, Forecast, Forecast, Forecast, Forecast, Forecast, Forecast];

export interface Info {
	n: boolean;
	geoid: number;
	url: string;
	lat: number;
	lon: number;
	tzinfo: Tzinfo;
	def_pressure_mm: number;
	def_pressure_pa: number;
	slug: string;
	zoom: number;
	nr: boolean;
	ns: boolean;
	nsr: boolean;
	p: boolean;
	f: boolean;
	_h: boolean;
}

export interface Tzinfo {
	name: string;
	abbr: string;
	dst: boolean;
	offset: number;
}

export interface GeoObject {
	district: District | null;
	locality: Locality | null;
	province: Province | null;
	country: Country | null;
}

export interface District {
	id: number;
	name: string;
}

export interface Locality {
	id: number;
	name: string;
}

export interface Province {
	id: number;
	name: string;
}

export interface Country {
	id: number;
	name: string;
}

export interface Yesterday {
	temp: number;
}

export interface Fact {
	obs_time: number;
	uptime: number;
	temp: number;
	feels_like: number;
	icon: string;
	condition: string;
	cloudness: number;
	prec_type: number;
	prec_prob: number;
	prec_strength: number;
	is_thunder: boolean;
	wind_speed: number;
	wind_dir: string;
	pressure_mm: number;
	pressure_pa: number;
	humidity: number;
	daytime: string;
	polar: boolean;
	season: string;
	source: string;
	accum_prec: AccumPrec;
	soil_moisture: number;
	soil_temp: number;
	uv_index: number;
	wind_gust: number;
}

export interface AccumPrec {
	"1": number;
	"3": number;
	"7": number;
}

export interface Forecast {
	date: string;
	date_ts: number;
	week: number;
	sunrise: string;
	sunset: string;
	rise_begin: string;
	set_end: string;
	moon_code: number;
	moon_text: string;
	parts: Parts;
	hours: Hour[];
	biomet?: Biomet;
}

export interface Parts {
	evening: Evening;
	night: Night;
	night_short: NightShort;
	day_short: DayShort;
	morning: Morning;
	day: Day;
}

export interface Evening {
	_source: string;
	temp_min: number;
	temp_avg: number;
	temp_max: number;
	wind_speed: number;
	wind_gust: number;
	wind_dir: string;
	pressure_mm: number;
	pressure_pa: number;
	humidity: number;
	soil_temp: number;
	soil_moisture: number;
	prec_mm: number;
	prec_prob: number;
	prec_period: number;
	cloudness: number;
	prec_type: number;
	prec_strength: number;
	icon: string;
	condition: string;
	uv_index?: number;
	feels_like: number;
	daytime: string;
	polar: boolean;
	fresh_snow_mm: number;
}

export interface Night {
	_source: string;
	temp_min: number;
	temp_avg: number;
	temp_max: number;
	wind_speed: number;
	wind_gust: number;
	wind_dir: string;
	pressure_mm: number;
	pressure_pa: number;
	humidity: number;
	soil_temp: number;
	soil_moisture: number;
	prec_mm: number;
	prec_prob: number;
	prec_period: number;
	cloudness: number;
	prec_type: number;
	prec_strength: number;
	icon: string;
	condition: string;
	uv_index?: number;
	feels_like: number;
	daytime: string;
	polar: boolean;
	fresh_snow_mm: number;
}

export interface NightShort {
	_source: string;
	temp: number;
	wind_speed: number;
	wind_gust: number;
	wind_dir: string;
	pressure_mm: number;
	pressure_pa: number;
	humidity: number;
	soil_temp: number;
	soil_moisture: number;
	prec_mm: number;
	prec_prob: number;
	prec_period: number;
	cloudness: number;
	prec_type: number;
	prec_strength: number;
	icon: string;
	condition: string;
	uv_index?: number;
	feels_like: number;
	daytime: string;
	polar: boolean;
	fresh_snow_mm: number;
}

export interface DayShort {
	_source: string;
	temp: number;
	temp_min: number;
	wind_speed: number;
	wind_gust: number;
	wind_dir: string;
	pressure_mm: number;
	pressure_pa: number;
	humidity: number;
	soil_temp: number;
	soil_moisture: number;
	prec_mm: number;
	prec_prob: number;
	prec_period: number;
	cloudness: number;
	prec_type: number;
	prec_strength: number;
	icon: string;
	condition: string;
	uv_index?: number;
	feels_like: number;
	daytime: string;
	polar: boolean;
	fresh_snow_mm: number;
}

export interface Morning {
	_source: string;
	temp_min: number;
	temp_avg: number;
	temp_max: number;
	wind_speed: number;
	wind_gust: number;
	wind_dir: string;
	pressure_mm: number;
	pressure_pa: number;
	humidity: number;
	soil_temp: number;
	soil_moisture: number;
	prec_mm: number;
	prec_prob: number;
	prec_period: number;
	cloudness: number;
	prec_type: number;
	prec_strength: number;
	icon: string;
	condition: string;
	uv_index?: number;
	feels_like: number;
	daytime: string;
	polar: boolean;
	fresh_snow_mm: number;
}

export type WindDir = "nw" | "n" | "ne" | "e" | "se" | "s" | "sw" | "w" | "c";

export interface Day {
	_source: string;
	temp_min: number;
	temp_avg: number;
	temp_max: number;
	wind_speed: number;
	wind_gust: number;
	wind_dir: WindDir;
	pressure_mm: number;
	pressure_pa: number;
	humidity: number;
	soil_temp: number;
	soil_moisture: number;
	prec_mm: number;
	prec_prob: number;
	prec_period: number;
	cloudness: number;
	prec_type: number;
	prec_strength: number;
	icon: string;
	condition: string;
	uv_index?: number;
	feels_like: number;
	daytime: string;
	polar: boolean;
	fresh_snow_mm: number;
}

export interface Hour {
	hour: string;
	hour_ts: number;
	temp: number;
	feels_like: number;
	icon: string;
	condition: string;
	cloudness: number;
	prec_type: number;
	prec_strength: number;
	is_thunder: boolean;
	wind_dir: string;
	wind_speed: number;
	wind_gust: number;
	pressure_mm: number;
	pressure_pa: number;
	humidity: number;
	uv_index: number;
	soil_temp: number;
	soil_moisture: number;
	prec_mm: number;
	prec_period: number;
	prec_prob: number;
}

export interface Biomet {
	index: number;
	condition: string;
}
