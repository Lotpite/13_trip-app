const apiKey = '7MDMASLJYFWHT7CSHU2QWDJRQ';

export const  getWeatherByCity = async (cityName= 'london') => await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${cityName}/today?unitGroup=metric&include=days&key=${apiKey}&contentType=json`)
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return  response.json();
    })
    .then(data => {
        // Handle the data
        console.log( data.days[0]);
    })
    .catch(error => {
        // Handle errors
        console.error('There was a problem with the fetch operation:', error);
    });

export const getWeatherForecast = async (cityName, startDate, endDate) => await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${cityName}/${startDate}/${endDate}?unitGroup=metric&include=days&key=${apiKey}&contentType=json`)
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        // Handle the data
        return data.days.map(day => {
            return {
                icon: day.icon,
                tempMax: day.tempmax,
                tempMin: day.tempmin
            }
        });
    })
    .catch(error => {
        // Handle errors
        console.error('There was a problem with the fetch operation:', error);
    });