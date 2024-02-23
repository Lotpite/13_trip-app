import data from '../data/cities.json'
import {useState} from "react";
import {DateManager} from "../services/date";
export function Modal ( { addTrip, closeModal }) {
    const Dates = new DateManager();

    const [cityName, setCityName] = useState('Amsterdam');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    const submitTrip = (e) => {
        e.preventDefault()
        const trip = {
            id: Dates.getTodayDate().getTime(),
            cityName,
            startDate: new Date(startDate),
            endDate: new Date(endDate)
        }
        addTrip(trip);
        clearForm();
        closeModal(false);
    }

    const clearForm = () => {
        setCityName('');
        setStartDate('');
        setEndDate('');
    }

    return (
        <form className='modal-form' id="tripForm" onSubmit={(e) => submitTrip(e)}>
            <div className='modal-header'>
                <h2 className='modal-title'>Create trip</h2>
                <span className='modal-close' onClick={() => closeModal()}>X</span>
            </div>
            <div className='modal-main'>
                <label htmlFor="city"><span>*</span> Select City:</label>
                <select id="city" name="city" defaultValue={cityName}
                        onChange={(event) => setCityName(event.target.value)}>
                    {data.map(city => (
                        <option key={city.id} value={city.name}>{city.name}</option>
                    ))}
                </select>

                <label htmlFor="startDate"><span>*</span> Start Date:</label>
                <input type="date" id="startDate" name="startDate"
                       min={Dates.getFormattedDateForLimits(Dates.getDateAfterDays(1))}
                       max={Dates.getFormattedDateForLimits(Dates.getDateAfterDays(16))}
                       placeholder='select date'
                       required
                       onChange={(e) => setStartDate(e.target.value)}
                />

                <label htmlFor="endDate"><span>*</span> End Date:</label>
                <input type="date" id="endDate" name="endDate" required disabled={!startDate}
                       min={startDate}
                       max={Dates.getFormattedDateForLimits(Dates.getDateAfterDays(15, startDate))}
                       onChange={(e) => setEndDate(e.target.value)}/>

            </div>
            <div className='modal-navigation'>
                <button className='modal-button__close' type="button" onClick={() => closeModal()}>Cancel</button>
                <button className='modal-button__submit' type="submit">Add Trip</button>
            </div>
        </form>
    )
}