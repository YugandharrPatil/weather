import { Card } from "@/components/ui/card";
import axios from "axios";
import { useState } from "react";
import { Button } from "./components/ui/button";
import { Input } from "./components/ui/input";
import { countryCodes } from "./data/country-codes";

export default function App() {
	const [city, setCity] = useState("");
	const [data, setData] = useState();
	const [error, setError] = useState();
	const [forecast, setForecast] = useState();

	const APIKey = import.meta.env.VITE_API_KEY;
	const unit = "metric";

	const fetchCurrentWeather = async (e) => {
		e.preventDefault();
		try {
			const { data } = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKey}&units=${unit}`);
			// console.log(data);
			const { name: country, emoji } = countryCodes.filter((country) => country.code === data.sys.country)[0];
			setData({
				city: data.name,
				country: country,
				countryEmoji: emoji,
				icon: data.weather[0].icon,
				weather: data.weather[0].main,
				description: data.weather[0].description,
				temperature: data.main.temp,
			});
			setError(false);
		} catch (err) {
			console.error("this is the fucking error:", err);
			setError(err);
			setData(false);
		} finally {
			setForecast(null);
		}
	};

	const fetchForecast = async (e) => {
		e.preventDefault();
		try {
			const { data } = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${APIKey}&units=${unit}`);
			setForecast(data.list);
		} catch (err) {
			console.error(err);
		} finally {
			setData(null);
		}
	};

	return (
		<>
			<div className="container text-center mx-auto mt-10">
				<h1 className="text-3xl font-bold my-4">Weather App</h1>
				<form>
					<Input className="w-1/3 mx-auto my-5" type="text" placeholder="Enter a City" value={city} onChange={(e) => setCity(e.target.value)} />
					<div className="flex gap-4 w-fit mx-auto">
						<Button onClick={fetchCurrentWeather}>Get Current Weather</Button>
						<Button onClick={fetchForecast}>Get 5 Day Forecast</Button>
					</div>
				</form>
				{data ? (
					<Card className="text-center mt-8 pb-8 md:w-2/3 lg:w-1/2 mx-auto">
						<img src={`http://openweathermap.org/img/wn/${data.icon}@4x.png`} className="mx-auto" />
						<h1 className="text-2xl my-2">
							Current weather in <span className="font-bold">{`${data.city}, ${data.country} ${data.countryEmoji}`}</span>
						</h1>
						<div className="flex flex-col gap-2 mt-3 font-bold text-xl">
							<p>
								Weather: <span className="text-blue-500">{data.weather}</span>
							</p>
							<p>
								Weather Description: <span className="text-blue-500">{data.description}</span>
							</p>
							<p>
								Temperature: <span className="text-blue-500">{data.temperature} &#8451;</span>
							</p>
						</div>
					</Card>
				) : (
					""
				)}
				{forecast && (
					<div className="">
						<h1 className="text-3xl text-center font-bold mt-8 mb-3">5 Day Weather Forecast in {city} (3 hour intervals)</h1>
						<div className="flex justify-center flex-wrap">
							{forecast.map((weather) => (
								<Card className="m-3 p-3">
									<p className="font-bold">Date & Time: {weather.dt_txt}</p>
									<img className="h-32 w-32 mx-auto" src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`}></img>
									<p>Temperature: {weather.main.temp} &#8451;</p>
									<p>Weather: {weather.weather[0].main}</p>
									<p>Description: {weather.weather[0].description}</p>
									<p>
										Humidity:{" "}
										{weather.main.humidity >= 65 ? "High" : 65 > weather.main.humidity >= 55 ? "Medium" : weather.main.humidity < 55 ? "Low" : null}
									</p>
									<p>
										Visibility:{" "}
										{weather.visibility >= 65 ? "High" : 65 > weather.visibility >= 55 ? "Medium" : weather.visibility < 55 ? "Low" : null}
									</p>
									<p>Probability of Precipitation: {Math.round(weather.pop * 100)}&#37;</p>
								</Card>
							))}
							{error && <p className="text-red-500">Please enter a valid city</p>}
						</div>
					</div>
				)}
			</div>
		</>
	);
}
