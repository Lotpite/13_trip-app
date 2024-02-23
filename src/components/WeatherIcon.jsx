import WeatherIcons from "../constants/icons";
export function WeatherIcon ({ iconName, tempMax, tempMin }) {

    const Icons = new WeatherIcons();
    const transformedIconName = iconName.replace(/-([a-z])/g, (match, letter) => letter.toUpperCase());
    return (
        <div className="weather-card">
            <p>Sunday</p>
            <img src={Icons[transformedIconName] || Icons['cloudy']} alt="Weather Icon"/>
            <h3>
                {tempMax}°/{tempMin}°
            </h3>
        </div>
    )
}