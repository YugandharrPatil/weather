import axios from "axios";
import { useState } from "react";
import { Button } from "./components/ui/button";
import { Input } from "./components/ui/input";
import { countryCodes } from "./data/country-codes";

export default function App() {
	const [city, setCity] = useState("");
	const [data, setData] = useState();
	const [error, setError] = useState();

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
			setCity("");
		}
	};

	// TODO: fix this function
	const fetchForecast = async () => {
		try {
			const { data } = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${APIKey}&units=${unit}`);
			console.log(data);

			let Humidity;
			if (data.list[0].main.humidity >= 65) {
				Humidity = "High";
			} else if (65 > data.list[0].main.humidity > 55) {
				Humidity = "Medium";
			} else {
				Humidity = "Low";
			}

			let Fog;
			if (data.list[0].visibility >= 770) {
				Fog = "Low";
			} else if (770 > data.list[0].visibility > 200) {
				Fog = "Medium";
			} else {
				Fog = "High";
			}
			let Rain;
			if (data.list[0].rain >= 40) {
				Rain = "High";
			} else if (40 > data.list[0].rain > 20) {
				Rain = "Medium";
			} else {
				Rain = "Low";
			}

			let ProbalilityOfRain;
			if ((data.list[0].pop = 1)) {
				ProbalilityOfRain = "High";
			} else if ((data.list[0].pop = 0)) {
				ProbalilityOfRain = "Low";
			}

			document.querySelector(".area").innerHTML = `
			<h1>5 Day Weather Forecast in ${city} (every 3 hours)</h1>
			<h1>Date & Time of Forecast: ${data.list[0].dt_txt}</h1>
			<img src="http://openweathermap.org/img/wn/${data.list[0].weather[0].icon}@4x.png">
			<h2>Temp: ${data.list[0].main.temp} &#8451;</h2>
			<h2>Weather: ${data.list[0].weather[0].main}</h2>
			<h2>Weather Description: ${data.list[0].weather[0].description}</h2>
			<h2>Humidity: ${Humidity}</h2>
			<h2>Fog: ${Fog}</h2>
			<h2>Rain in last 3 hours: ${Rain}</h2>
			<h2>Probability of Rain: ${ProbalilityOfRain}</h2>
			<h1>Date & Time of Forecast: ${data.list[1].dt_txt}</h1>
			<img src="http://openweathermap.org/img/wn/${data.list[1].weather[0].icon}@4x.png">
			<h2>Temp: ${data.list[1].main.temp} &#8451;</h2>
			<h2>Weather: ${data.list[1].weather[0].main}</h2>
			<h2>Weather Description: ${data.list[1].weather[0].description}</h2>
			<h2>Humidity: ${Humidity}</h2>
			<h2>Fog: ${Fog}</h2>
			<h2>Rain in last 3 hours: ${Rain}</h2>
			<h2>Probability of Rain: ${ProbalilityOfRain}</h2>
			<h1>Date & Time of Forecast: ${data.list[2].dt_txt}</h1>
			<img src="http://openweathermap.org/img/wn/${data.list[2].weather[0].icon}@4x.png">
			<h2>Temp: ${data.list[2].main.temp} &#8451;</h2>
			<h2>Weather: ${data.list[2].weather[0].main}</h2>
			<h2>Weather Description: ${data.list[2].weather[0].description}</h2>
			<h2>Humidity: ${Humidity}</h2>
			<h2>Fog: ${Fog}</h2>
			<h2>Rain in last 3 hours: ${Rain}</h2>
			<h2>Probability of Rain: ${ProbalilityOfRain}</h2>
			<h1>Date & Time of Forecast: ${data.list[3].dt_txt}</h1>
			<img src="http://openweathermap.org/img/wn/${data.list[3].weather[0].icon}@4x.png">
			<h2>Temp: ${data.list[3].main.temp} &#8451;</h2>
			<h2>Weather: ${data.list[3].weather[0].main}</h2>
			<h2>Weather Description: ${data.list[3].weather[0].description}</h2>
			<h2>Humidity: ${Humidity}</h2>
			<h2>Fog: ${Fog}</h2>
			<h2>Rain in last 3 hours: ${Rain}</h2>
			<h2>Probability of Rain: ${ProbalilityOfRain}</h2>
			<h1>Date & Time of Forecast: ${data.list[4].dt_txt}</h1>
			<img src="http://openweathermap.org/img/wn/${data.list[4].weather[0].icon}@4x.png">
			<h2>Temp: ${data.list[4].main.temp} &#8451;</h2>
			<h2>Weather: ${data.list[4].weather[0].main}</h2>
			<h2>Weather Description: ${data.list[4].weather[0].description}</h2>
			<h2>Humidity: ${Humidity}</h2>
			<h2>Fog: ${Fog}</h2>
			<h2>Rain in last 3 hours: ${Rain}</h2>
			<h2>Probability of Rain: ${ProbalilityOfRain}</h2>
			<h1>Date & Time of Forecast: ${data.list[5].dt_txt}</h1>
			<img src="http://openweathermap.org/img/wn/${data.list[5].weather[0].icon}@4x.png">
			<h2>Temp: ${data.list[5].main.temp} &#8451;</h2>
			<h2>Weather: ${data.list[5].weather[0].main}</h2>
			<h2>Weather Description: ${data.list[5].weather[0].description}</h2>
			<h2>Humidity: ${Humidity}</h2>
			<h2>Fog: ${Fog}</h2>
			<h2>Rain in last 3 hours: ${Rain}</h2>
			<h2>Probability of Rain: ${ProbalilityOfRain}</h2>
			<h1>Date & Time of Forecast: ${data.list[6].dt_txt}</h1>
			<img src="http://openweathermap.org/img/wn/${data.list[6].weather[0].icon}@4x.png">
			<h2>Temp: ${data.list[6].main.temp} &#8451;</h2>
			<h2>Weather: ${data.list[6].weather[0].main}</h2>
			<h2>Weather Description: ${data.list[6].weather[0].description}</h2>
			<h2>Humidity: ${Humidity}</h2>
			<h2>Fog: ${Fog}</h2>
			<h2>Rain in last 3 hours: ${Rain}</h2>
			<h2>Probability of Rain: ${ProbalilityOfRain}</h2>
			<h1>Date & Time of Forecast: ${data.list[7].dt_txt}</h1>
			<img src="http://openweathermap.org/img/wn/${data.list[7].weather[0].icon}@4x.png">
			<h2>Temp: ${data.list[7].main.temp} &#8451;</h2>
			<h2>Weather: ${data.list[7].weather[0].main}</h2>
			<h2>Weather Description: ${data.list[7].weather[0].description}</h2>
			<h2>Humidity: ${Humidity}</h2>
			<h2>Fog: ${Fog}</h2>
			<h2>Rain in last 3 hours: ${Rain}</h2>
			<h2>Probability of Rain: ${ProbalilityOfRain}</h2>
			<h1>Date & Time of Forecast: ${data.list[8].dt_txt}</h1>
			<img src="http://openweathermap.org/img/wn/${data.list[8].weather[0].icon}@4x.png">
			<h2>Temp: ${data.list[8].main.temp} &#8451;</h2>
			<h2>Weather: ${data.list[8].weather[0].main}</h2>
			<h2>Weather Description: ${data.list[8].weather[0].description}</h2>
			<h2>Humidity: ${Humidity}</h2>
			<h2>Fog: ${Fog}</h2>
			<h2>Rain in last 3 hours: ${Rain}</h2>
			<h2>Probability of Rain: ${ProbalilityOfRain}</h2>
			<h1>Date & Time of Forecast: ${data.list[9].dt_txt}</h1>
			<img src="http://openweathermap.org/img/wn/${data.list[9].weather[0].icon}@4x.png">
			<h2>Temp: ${data.list[9].main.temp} &#8451;</h2>
			<h2>Weather: ${data.list[9].weather[0].main}</h2>
			<h2>Weather Description: ${data.list[9].weather[0].description}</h2>
			<h2>Humidity: ${Humidity}</h2>
			<h2>Fog: ${Fog}</h2>
			<h2>Rain in last 3 hours: ${Rain}</h2>
			<h2>Probability of Rain: ${ProbalilityOfRain}</h2>
			<h1>Date & Time of Forecast: ${data.list[10].dt_txt}</h1>
			<img src="http://openweathermap.org/img/wn/${data.list[10].weather[0].icon}@4x.png">
			<h2>Temp: ${data.list[10].main.temp} &#8451;</h2>
			<h2>Weather: ${data.list[10].weather[0].main}</h2>
			<h2>Weather Description: ${data.list[10].weather[0].description}</h2>
			<h2>Humidity: ${Humidity}</h2>
			<h2>Fog: ${Fog}</h2>
			<h2>Rain in last 3 hours: ${Rain}</h2>
			<h2>Probability of Rain: ${ProbalilityOfRain}</h2>
			<h1>Date & Time of Forecast: ${data.list[11].dt_txt}</h1>
			<img src="http://openweathermap.org/img/wn/${data.list[11].weather[0].icon}@4x.png">
			<h2>Temp: ${data.list[11].main.temp} &#8451;</h2>
			<h2>Weather: ${data.list[11].weather[0].main}</h2>
			<h2>Weather Description: ${data.list[11].weather[0].description}</h2>
			<h2>Humidity: ${Humidity}</h2>
			<h2>Fog: ${Fog}</h2>
			<h2>Rain in last 3 hours: ${Rain}</h2>
			<h2>Probability of Rain: ${ProbalilityOfRain}</h2>
			<h1>Date & Time of Forecast: ${data.list[12].dt_txt}</h1>
			<img src="http://openweathermap.org/img/wn/${data.list[12].weather[0].icon}@4x.png">
			<h2>Temp: ${data.list[12].main.temp} &#8451;</h2>
			<h2>Weather: ${data.list[12].weather[0].main}</h2>
			<h2>Weather Description: ${data.list[12].weather[0].description}</h2>
			<h2>Humidity: ${Humidity}</h2>
			<h2>Fog: ${Fog}</h2>
			<h2>Rain in last 3 hours: ${Rain}</h2>
			<h2>Probability of Rain: ${ProbalilityOfRain}</h2>
			<h1>Date & Time of Forecast: ${data.list[13].dt_txt}</h1>
			<img src="http://openweathermap.org/img/wn/${data.list[13].weather[0].icon}@4x.png">
			<h2>Temp: ${data.list[13].main.temp} &#8451;</h2>
			<h2>Weather: ${data.list[13].weather[0].main}</h2>
			<h2>Weather Description: ${data.list[13].weather[0].description}</h2>
			<h2>Humidity: ${Humidity}</h2>
			<h2>Fog: ${Fog}</h2>
			<h2>Rain in last 3 hours: ${Rain}</h2>
			<h2>Probability of Rain: ${ProbalilityOfRain}</h2>
			<h1>Date & Time of Forecast: ${data.list[14].dt_txt}</h1>
			<img src="http://openweathermap.org/img/wn/${data.list[14].weather[0].icon}@4x.png">
			<h2>Temp: ${data.list[14].main.temp} &#8451;</h2>
			<h2>Weather: ${data.list[14].weather[0].main}</h2>
			<h2>Weather Description: ${data.list[14].weather[0].description}</h2>
			<h2>Humidity: ${Humidity}</h2>
			<h2>Fog: ${Fog}</h2>
			<h2>Rain in last 3 hours: ${Rain}</h2>
			<h2>Probability of Rain: ${ProbalilityOfRain}</h2>
			<h1>Date & Time of Forecast: ${data.list[15].dt_txt}</h1>
			<img src="http://openweathermap.org/img/wn/${data.list[15].weather[0].icon}@4x.png">
			<h2>Temp: ${data.list[15].main.temp} &#8451;</h2>
			<h2>Weather: ${data.list[15].weather[0].main}</h2>
			<h2>Weather Description: ${data.list[15].weather[0].description}</h2>
			<h2>Humidity: ${Humidity}</h2>
			<h2>Fog: ${Fog}</h2>
			<h2>Rain in last 3 hours: ${Rain}</h2>
			<h2>Probability of Rain: ${ProbalilityOfRain}</h2>
			<h1>Date & Time of Forecast: ${data.list[16].dt_txt}</h1>
			<img src="http://openweathermap.org/img/wn/${data.list[16].weather[0].icon}@4x.png">
			<h2>Temp: ${data.list[16].main.temp} &#8451;</h2>
			<h2>Weather: ${data.list[16].weather[0].main}</h2>
			<h2>Weather Description: ${data.list[16].weather[0].description}</h2>
			<h2>Humidity: ${Humidity}</h2>
			<h2>Fog: ${Fog}</h2>
			<h2>Rain in last 3 hours: ${Rain}</h2>
			<h2>Probability of Rain: ${ProbalilityOfRain}</h2>
			<h1>Date & Time of Forecast: ${data.list[17].dt_txt}</h1>
			<img src="http://openweathermap.org/img/wn/${data.list[17].weather[0].icon}@4x.png">
			<h2>Temp: ${data.list[17].main.temp} &#8451;</h2>
			<h2>Weather: ${data.list[17].weather[0].main}</h2>
			<h2>Weather Description: ${data.list[17].weather[0].description}</h2>
			<h2>Humidity: ${Humidity}</h2>
			<h2>Fog: ${Fog}</h2>
			<h2>Rain in last 3 hours: ${Rain}</h2>
			<h2>Probability of Rain: ${ProbalilityOfRain}</h2>
			<h1>Date & Time of Forecast: ${data.list[18].dt_txt}</h1>
			<img src="http://openweathermap.org/img/wn/${data.list[18].weather[0].icon}@4x.png">
			<h2>Temp: ${data.list[18].main.temp} &#8451;</h2>
			<h2>Weather: ${data.list[18].weather[0].main}</h2>
			<h2>Weather Description: ${data.list[18].weather[0].description}</h2>
			<h2>Humidity: ${Humidity}</h2>
			<h2>Fog: ${Fog}</h2>
			<h2>Rain in last 3 hours: ${Rain}</h2>
			<h2>Probability of Rain: ${ProbalilityOfRain}</h2>
			<h1>Date & Time of Forecast: ${data.list[19].dt_txt}</h1>
			<img src="http://openweathermap.org/img/wn/${data.list[19].weather[0].icon}@4x.png">
			<h2>Temp: ${data.list[19].main.temp} &#8451;</h2>
			<h2>Weather: ${data.list[19].weather[0].main}</h2>
			<h2>Weather Description: ${data.list[19].weather[0].description}</h2>
			<h2>Humidity: ${Humidity}</h2>
			<h2>Fog: ${Fog}</h2>
			<h2>Rain in last 3 hours: ${Rain}</h2>
			<h2>Probability of Rain: ${ProbalilityOfRain}</h2>
			<h1>Date & Time of Forecast: ${data.list[20].dt_txt}</h1>
			<img src="http://openweathermap.org/img/wn/${data.list[20].weather[0].icon}@4x.png">
			<h2>Temp: ${data.list[20].main.temp} &#8451;</h2>
			<h2>Weather: ${data.list[20].weather[0].main}</h2>
			<h2>Weather Description: ${data.list[20].weather[0].description}</h2>
			<h2>Humidity: ${Humidity}</h2>
			<h2>Fog: ${Fog}</h2>
			<h2>Rain in last 3 hours: ${Rain}</h2>
			<h2>Probability of Rain: ${ProbalilityOfRain}</h2>
			<h1>Date & Time of Forecast: ${data.list[21].dt_txt}</h1>
			<img src="http://openweathermap.org/img/wn/${data.list[21].weather[0].icon}@4x.png">
			<h2>Temp: ${data.list[21].main.temp} &#8451;</h2>
			<h2>Weather: ${data.list[21].weather[0].main}</h2>
			<h2>Weather Description: ${data.list[21].weather[0].description}</h2>
			<h2>Humidity: ${Humidity}</h2>
			<h2>Fog: ${Fog}</h2>
			<h2>Rain in last 3 hours: ${Rain}</h2>
			<h2>Probability of Rain: ${ProbalilityOfRain}</h2>
			<h1>Date & Time of Forecast: ${data.list[22].dt_txt}</h1>
			<img src="http://openweathermap.org/img/wn/${data.list[22].weather[0].icon}@4x.png">
			<h2>Temp: ${data.list[22].main.temp} &#8451;</h2>
			<h2>Weather: ${data.list[22].weather[0].main}</h2>
			<h2>Weather Description: ${data.list[22].weather[0].description}</h2>
			<h2>Humidity: ${Humidity}</h2>
			<h2>Fog: ${Fog}</h2>
			<h2>Rain in last 3 hours: ${Rain}</h2>
			<h2>Probability of Rain: ${ProbalilityOfRain}</h2>
			<h1>Date & Time of Forecast: ${data.list[23].dt_txt}</h1>
			<img src="http://openweathermap.org/img/wn/${data.list[23].weather[0].icon}@4x.png">
			<h2>Temp: ${data.list[23].main.temp} &#8451;</h2>
			<h2>Weather: ${data.list[23].weather[0].main}</h2>
			<h2>Weather Description: ${data.list[23].weather[0].description}</h2>
			<h2>Humidity: ${Humidity}</h2>
			<h2>Fog: ${Fog}</h2>
			<h2>Rain in last 3 hours: ${Rain}</h2>
			<h2>Probability of Rain: ${ProbalilityOfRain}</h2>
			<h1>Date & Time of Forecast: ${data.list[24].dt_txt}</h1>
			<img src="http://openweathermap.org/img/wn/${data.list[24].weather[0].icon}@4x.png">
			<h2>Temp: ${data.list[24].main.temp} &#8451;</h2>
			<h2>Weather: ${data.list[24].weather[0].main}</h2>
			<h2>Weather Description: ${data.list[24].weather[0].description}</h2>
			<h2>Humidity: ${Humidity}</h2>
			<h2>Fog: ${Fog}</h2>
			<h2>Rain in last 3 hours: ${Rain}</h2>
			<h2>Probability of Rain: ${ProbalilityOfRain}</h2>
			<h1>Date & Time of Forecast: ${data.list[25].dt_txt}</h1>
			<img src="http://openweathermap.org/img/wn/${data.list[25].weather[0].icon}@4x.png">
			<h2>Temp: ${data.list[25].main.temp} &#8451;</h2>
			<h2>Weather: ${data.list[25].weather[0].main}</h2>
			<h2>Weather Description: ${data.list[25].weather[0].description}</h2>
			<h2>Humidity: ${Humidity}</h2>
			<h2>Fog: ${Fog}</h2>
			<h2>Rain in last 3 hours: ${Rain}</h2>
			<h2>Probability of Rain: ${ProbalilityOfRain}</h2>
			<h1>Date & Time of Forecast: ${data.list[26].dt_txt}</h1>
			<img src="http://openweathermap.org/img/wn/${data.list[26].weather[0].icon}@4x.png">
			<h2>Temp: ${data.list[26].main.temp} &#8451;</h2>
			<h2>Weather: ${data.list[26].weather[0].main}</h2>
			<h2>Weather Description: ${data.list[26].weather[0].description}</h2>
			<h2>Humidity: ${Humidity}</h2>
			<h2>Fog: ${Fog}</h2>
			<h2>Rain in last 3 hours: ${Rain}</h2>
			<h2>Probability of Rain: ${ProbalilityOfRain}</h2>
			<h1>Date & Time of Forecast: ${data.list[27].dt_txt}</h1>
			<img src="http://openweathermap.org/img/wn/${data.list[27].weather[0].icon}@4x.png">
			<h2>Temp: ${data.list[27].main.temp} &#8451;</h2>
			<h2>Weather: ${data.list[27].weather[0].main}</h2>
			<h2>Weather Description: ${data.list[27].weather[0].description}</h2>
			<h2>Humidity: ${Humidity}</h2>
			<h2>Fog: ${Fog}</h2>
			<h2>Rain in last 3 hours: ${Rain}</h2>
			<h2>Probability of Rain: ${ProbalilityOfRain}</h2>
			<h1>Date & Time of Forecast: ${data.list[28].dt_txt}</h1>
			<img src="http://openweathermap.org/img/wn/${data.list[28].weather[0].icon}@4x.png">
			<h2>Temp: ${data.list[28].main.temp} &#8451;</h2>
			<h2>Weather: ${data.list[28].weather[0].main}</h2>
			<h2>Weather Description: ${data.list[28].weather[0].description}</h2>
			<h2>Humidity: ${Humidity}</h2>
			<h2>Fog: ${Fog}</h2>
			<h2>Rain in last 3 hours: ${Rain}</h2>
			<h2>Probability of Rain: ${ProbalilityOfRain}</h2>
			<h1>Date & Time of Forecast: ${data.list[29].dt_txt}</h1>
			<img src="http://openweathermap.org/img/wn/${data.list[29].weather[0].icon}@4x.png">
			<h2>Temp: ${data.list[29].main.temp} &#8451;</h2>
			<h2>Weather: ${data.list[29].weather[0].main}</h2>
			<h2>Weather Description: ${data.list[29].weather[0].description}</h2>
			<h2>Humidity: ${Humidity}</h2>
			<h2>Fog: ${Fog}</h2>
			<h2>Rain in last 3 hours: ${Rain}</h2>
			<h2>Probability of Rain: ${ProbalilityOfRain}</h2>
			<h1>Date & Time of Forecast: ${data.list[30].dt_txt}</h1>
			<img src="http://openweathermap.org/img/wn/${data.list[30].weather[0].icon}@4x.png">
			<h2>Temp: ${data.list[30].main.temp} &#8451;</h2>
			<h2>Weather: ${data.list[30].weather[0].main}</h2>
			<h2>Weather Description: ${data.list[30].weather[0].description}</h2>
			<h2>Humidity: ${Humidity}</h2>
			<h2>Fog: ${Fog}</h2>
			<h2>Rain in last 3 hours: ${Rain}</h2>
			<h2>Probability of Rain: ${ProbalilityOfRain}</h2>
			<h1>Date & Time of Forecast: ${data.list[31].dt_txt}</h1>
			<img src="http://openweathermap.org/img/wn/${data.list[31].weather[0].icon}@4x.png">
			<h2>Temp: ${data.list[31].main.temp} &#8451;</h2>
			<h2>Weather: ${data.list[31].weather[0].main}</h2>
			<h2>Weather Description: ${data.list[31].weather[0].description}</h2>
			<h2>Humidity: ${Humidity}</h2>
			<h2>Fog: ${Fog}</h2>
			<h2>Rain in last 3 hours: ${Rain}</h2>
			<h2>Probability of Rain: ${ProbalilityOfRain}</h2>
			<h1>Date & Time of Forecast: ${data.list[32].dt_txt}</h1>
			<img src="http://openweathermap.org/img/wn/${data.list[32].weather[0].icon}@4x.png">
			<h2>Temp: ${data.list[32].main.temp} &#8451;</h2>
			<h2>Weather: ${data.list[32].weather[0].main}</h2>
			<h2>Weather Description: ${data.list[32].weather[0].description}</h2>
			<h2>Humidity: ${Humidity}</h2>
			<h2>Fog: ${Fog}</h2>
			<h2>Rain in last 3 hours: ${Rain}</h2>
			<h2>Probability of Rain: ${ProbalilityOfRain}</h2>
			<h1>Date & Time of Forecast: ${data.list[33].dt_txt}</h1>
			<img src="http://openweathermap.org/img/wn/${data.list[33].weather[0].icon}@4x.png">
			<h2>Temp: ${data.list[33].main.temp} &#8451;</h2>
			<h2>Weather: ${data.list[33].weather[0].main}</h2>
			<h2>Weather Description: ${data.list[33].weather[0].description}</h2>
			<h2>Humidity: ${Humidity}</h2>
			<h2>Fog: ${Fog}</h2>
			<h2>Rain in last 3 hours: ${Rain}</h2>
			<h2>Probability of Rain: ${ProbalilityOfRain}</h2>
			<h1>Date & Time of Forecast: ${data.list[34].dt_txt}</h1>
			<img src="http://openweathermap.org/img/wn/${data.list[34].weather[0].icon}@4x.png">
			<h2>Temp: ${data.list[34].main.temp} &#8451;</h2>
			<h2>Weather: ${data.list[34].weather[0].main}</h2>
			<h2>Weather Description: ${data.list[34].weather[0].description}</h2>
			<h2>Humidity: ${Humidity}</h2>
			<h2>Fog: ${Fog}</h2>
			<h2>Rain in last 3 hours: ${Rain}</h2>
			<h2>Probability of Rain: ${ProbalilityOfRain}</h2>
			<h1>Date & Time of Forecast: ${data.list[35].dt_txt}</h1>
			<img src="http://openweathermap.org/img/wn/${data.list[35].weather[0].icon}@4x.png">
			<h2>Temp: ${data.list[35].main.temp} &#8451;</h2>
			<h2>Weather: ${data.list[35].weather[0].main}</h2>
			<h2>Weather Description: ${data.list[35].weather[0].description}</h2>
			<h2>Humidity: ${Humidity}</h2>
			<h2>Fog: ${Fog}</h2>
			<h2>Rain in last 3 hours: ${Rain}</h2>
			<h2>Probability of Rain: ${ProbalilityOfRain}</h2>
			<h1>Date & Time of Forecast: ${data.list[36].dt_txt}</h1>
			<img src="http://openweathermap.org/img/wn/${data.list[36].weather[0].icon}@4x.png">
			<h2>Temp: ${data.list[36].main.temp} &#8451;</h2>
			<h2>Weather: ${data.list[36].weather[0].main}</h2>
			<h2>Weather Description: ${data.list[36].weather[0].description}</h2>
			<h2>Humidity: ${Humidity}</h2>
			<h2>Fog: ${Fog}</h2>
			<h2>Rain in last 3 hours: ${Rain}</h2>
			<h2>Probability of Rain: ${ProbalilityOfRain}</h2>
			<h1>Date & Time of Forecast: ${data.list[37].dt_txt}</h1>
			<img src="http://openweathermap.org/img/wn/${data.list[37].weather[0].icon}@4x.png">
			<h2>Temp: ${data.list[37].main.temp} &#8451;</h2>
			<h2>Weather: ${data.list[37].weather[0].main}</h2>
			<h2>Weather Description: ${data.list[37].weather[0].description}</h2>
			<h2>Humidity: ${Humidity}</h2>
			<h2>Fog: ${Fog}</h2>
			<h2>Rain in last 3 hours: ${Rain}</h2>
			<h2>Probability of Rain: ${ProbalilityOfRain}</h2>
			<h1>Date & Time of Forecast: ${data.list[38].dt_txt}</h1>
			<img src="http://openweathermap.org/img/wn/${data.list[38].weather[0].icon}@4x.png">
			<h2>Temp: ${data.list[38].main.temp} &#8451;</h2>
			<h2>Weather: ${data.list[38].weather[0].main}</h2>
			<h2>Weather Description: ${data.list[38].weather[0].description}</h2>
			<h2>Humidity: ${Humidity}</h2>
			<h2>Fog: ${Fog}</h2>
			<h2>Rain in last 3 hours: ${Rain}</h2>
			<h2>Probability of Rain: ${ProbalilityOfRain}</h2>
			<h1>Date & Time of Forecast: ${data.list[39].dt_txt}</h1>
			<img src="http://openweathermap.org/img/wn/${data.list[39].weather[0].icon}@4x.png">
			<h2>Temp: ${data.list[39].main.temp} &#8451;</h2>
			<h2>Weather: ${data.list[39].weather[0].main}</h2>
			<h2>Weather Description: ${data.list[39].weather[0].description}</h2>
			<h2>Humidity: ${Humidity}</h2>
			<h2>Fog: ${Fog}</h2>
			<h2>Rain in last 3 hours: ${Rain}</h2>
			<h2>Probability of Rain: ${ProbalilityOfRain}</h2>
			`;
		} catch (err) {
			document.querySelector(".area").innerHTML = `<h2 style="background: #ff5f5f">Please enter a valid city</h2>`;
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
						<Button disabled onClick={fetchForecast}>
							Get 5 Day Forecast
						</Button>
					</div>
				</form>
				{data ? (
					<div className="data">
						<img src={`http://openweathermap.org/img/wn/${data.icon}@4x.png`} />
						<h1>Current weather in {data.city}</h1>
						<h1>
							Country: {data.country} {data.countryEmoji}
						</h1>
						<h2>
							Weather: <span className="text-blue-500">{data.weather}</span>
						</h2>
						<h2>
							Weather Description: <span className="text-blue-500">{data.description}</span>
						</h2>
						<h2>
							Temperature: <span className="text-blue-500">{data.temperature} &#8451;</span>
						</h2>
					</div>
				) : (
					""
				)}
				{error && <p className="text-red-500">Please enter a valid city</p>}
			</div>
		</>
	);
}
