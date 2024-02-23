import { DateManager } from "../services/date";
import { useEffect, useState } from "react";

export function Timer({ endDate }) {
    const Dates = new DateManager();
    const [timeDifference, setTimeDifference] = useState(Dates.getTimeDifference(new Date(endDate)));
    const { diffDays, diffHours, diffMinutes, diffSeconds} = Dates.getTimerData(timeDifference);
    useEffect(() => {
        const intervalId = setInterval(() => {
            const newTimeDifference = Dates.getTimeDifference(new Date(endDate));
            setTimeDifference(newTimeDifference);

            if (newTimeDifference <= 0) {
                clearInterval(intervalId);
            }
        }, 1000);

        return () => clearInterval(intervalId);
    }, [timeDifference, endDate]);


    return (
        <div className='timer'>
            <div className='timer-item'>
                <span className='timer-item__count'>{diffDays}</span>
                <span className='timer-item__metric'>DAYS</span>
            </div>
            <div className='timer-item'>
                <span className='timer-item__count'>{diffHours}</span>
                <span className='timer-item__metric'>HOURS</span>
            </div>
            <div className='timer-item'>
                <span className='timer-item__count'>{diffMinutes}</span>
                <span className='timer-item__metric'>MINUTES</span>
            </div>
            <div className='timer-item'>
                <span className='timer-item__count'>{diffSeconds}</span>
                <span className='timer-item__metric'>SECONDS</span>
            </div>
        </div>
    );
}
