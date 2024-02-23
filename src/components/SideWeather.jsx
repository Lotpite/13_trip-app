import WeatherIcons from "../constants/icons";
import {Timer} from "./Timer";
import {useEffect, useState} from "react";
import {getWeatherByCity} from "../services/api";
export function SideWeather ({ city, iconName='cloudy' }) {

    const Icons = new WeatherIcons();

    const [weather, setWeather] = useState();
    useEffect(() => {
        getWeatherByCity(city.cityName)
            .then(res => {
                if(res) {
                    setWeather({
                        icon: res.icon,
                        temp: res.temp
                    })
                }
            })
    }, [city]);

    return (
        <div className='side-panel'>
            <h1>Wednesday</h1>
            <div className='side-panel_weather'>
                <img  src={weather ? Icons[weather?.icon] : Icons[iconName]}  alt={`weather icon: ${weather ? Icons[weather?.icon] : Icons[iconName]}`}/>
                <span>{weather?.temp || 13}<sup>°C</sup></span>
            </div>
            <h2>{city.cityName}</h2>
            <Timer endDate={city.endDate}/>
        </div>
    )
}