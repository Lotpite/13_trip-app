import './App.css';
import {CityCard} from "./components/CityCard";
import {WeatherIcon} from "./components/WeatherIcon";
import {SideWeather} from "./components/SideWeather";
import {useEffect, useState} from "react";
import {Modal} from "./components/Modal";
import {DateManager} from "./services/date";
import StorageService from "./services/storage";
import {getWeatherByCity, getWeatherForecast} from "./services/api";
function App() {

    const Dates = new DateManager();
    const Storage = new StorageService()

    const initialTrip = {
        id: 0,
        cityName: "L'viv",
        startDate: Dates.getTodayDate(),
        endDate: Dates.getDateAfterDays(5)
    }

    const [trips, setTrips] = useState(Storage.getAll('trips') || [initialTrip]);
    const [activeTrip, setActiveTrip] = useState(initialTrip);
    const [isOpenedModal, setIsOpenedModal] = useState(false)
    const [forecast, setForecast] = useState();
    const [query, setQuery] = useState('')
    const [sortedTrips, setSortedTrips] = useState();

    const addTrip = (trip) => {
        const newTrips = [...trips, trip];
        setTrips(newTrips)
        Storage.setByKey('trips', trips)
    }


    useEffect(() => {
        if (query === '') {
            setSortedTrips(trips);
        } else {
            const filteredTrips = trips.filter(trip => trip.cityName.toLowerCase().includes(query.toLowerCase()));
            setSortedTrips(filteredTrips);
        }
        getWeatherForecast(activeTrip.cityName, new Date(activeTrip.startDate).toISOString(), new Date(activeTrip.endDate).toISOString())
            .then(res => res && setForecast(res))
        Storage.setByKey('trips', trips)
    }, [query, activeTrip, trips]);

  return (
    <div className="App">
      <div className='main'>
          <h1>Weather <b>Forecast</b></h1>
          <input type="search" className='searchbar' placeholder='Search your trips...' onChange={(e) => setQuery(e.target.value)}/>
          <div className='cities-wrapper'>
              <div className='cities-container'>
                  {
                      sortedTrips?.map(trip => {
                          if(trip.id === activeTrip.id) {
                              return (
                                  <CityCard key={trip.id} city={trip} isActive={true} setActiveTrip={setActiveTrip}/>
                              )
                          }

                          return (
                              <CityCard key={trip.id} city={trip} setActiveTrip={setActiveTrip}/>
                          )
                      })
                  }

              </div>

              <button className='add-button' onClick={() => setIsOpenedModal(!isOpenedModal)}><span>+</span><span>Add trip</span></button>
          </div>
          <div>
              <h2>Week</h2>
              <div className='weathers-container'>
                  {
                      forecast ? (
                          forecast.map(day => {
                              return (
                                  <WeatherIcon iconName={day.icon} tempMax={day.tempMax} tempMin={day.tempMin}/>
                              )
                          })
                      ) : <WeatherIcon iconName={'cloudy'} tempMax={22} tempMin={1}/>

                  }

              </div>
          </div>
      </div>
      <SideWeather city={activeTrip}/>
        {
            isOpenedModal
            ? (
                <>
                    <Modal addTrip={addTrip} closeModal={setIsOpenedModal}/>
                    <div className='shade'></div>
                </>
                ) : ''
        }
    </div>
  );
}

export default App;
