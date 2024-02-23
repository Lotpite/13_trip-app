import data from '../data/cities.json';
import {DateManager} from "../services/date";

export function CityCard ({ city, isActive=false, setActiveTrip}) {
    let imgUrl = city ? data.find(item => item.name === city.cityName).imageUrl : '';
    const Dates = new DateManager();

    return (
        <div className={isActive ? "city-card city-card_active" : "city-card"} onClick={() => setActiveTrip(city)}>
            <img src={imgUrl} alt={city.cityName}/>
            <div className="city-card__info">
                <div><b> {city.cityName}</b></div>
                <span>
                    {Dates.getFormattedDate(new Date(city.startDate))} - {Dates.getFormattedDate(new Date(city.endDate))}
                </span>
            </div>
        </div>
    )
}