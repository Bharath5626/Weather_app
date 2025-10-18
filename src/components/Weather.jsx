    import React, { useEffect, useRef, useState } from 'react'
    import './Weather.css'
    import searchIcon from '../assets/search.png'
    import clear_icon from '../assets/clear.png'
    import humidity_icon from '../assets/humidity.png'
    import wind_icon from '../assets/wind.png'
    import cloud_icon from '../assets/cloud.png'
    import drizzle_icon from '../assets/drizzle.png'
    import rain_icon from '../assets/rain.png'
    import snow_icon from '../assets/snow.png'  

    const Weather = () => {
        const [weatherData, setWeatherData] = useState(null);
        const inputRef = useRef();
    const allIcons = {
        "01d": clear_icon,
        "01n": clear_icon,
        "02d": cloud_icon,
        "02n": cloud_icon,
        "03d": cloud_icon,
        "03n": cloud_icon,
        "04d": drizzle_icon,
        "04n": drizzle_icon,
        "09d": rain_icon,
        "09n": rain_icon,
        "10d": rain_icon,
        "10n": rain_icon,
        "13d": snow_icon,
        "13n": snow_icon,
    }

        const search = async (city) => {
            if (!city || city.trim() === "") {
                alert("Please enter a city name");
                return;
            }
            try {
                const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_APP_ID}`;
                const response = await fetch(url);
                const data = await response.json();
                if(!response.ok){
                    alert(data.message);
                    return;
                }
                console.log(data);
                const icon = allIcons[data.weather[0].icon] || clear_icon;
                setWeatherData({
                    humidity: data.main.humidity,
                    windSpeed: data.wind.speed,
                    temperature: Math.floor(data.main.temp),
                    location: data.name,
                    icon: icon,
                });
            } catch (error) {
                setWeatherData(false)
                console.log(error, "Error in data fetch")
            }
        };

            useEffect(() => {
                
                (async () => {
                    try {
                        const city = "Chennai";
                        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_APP_ID}`;
                        const response = await fetch(url);
                        const data = await response.json();
                        if (!response.ok) {
                            
                            console.warn('Initial fetch failed:', data.message);
                            return;
                        }
                        const icon = allIcons[data.weather[0].icon] || clear_icon;
                        setWeatherData({
                            humidity: data.main.humidity,
                            windSpeed: data.wind.speed,
                            temperature: Math.floor(data.main.temp),
                            location: data.name,
                            icon: icon,
                        });
                    } catch (err) {
                        console.error('Initial weather fetch error', err);
                        setWeatherData(false);
                    }
                })();
            }, []);

        return (
        <div className='weather'>
            <div className="search-bar">
                <input ref={inputRef} type="text" placeholder='Search' />
                <img src={searchIcon} alt="" onClick={() => search(inputRef.current.value)} />
            </div>
            {weatherData? <>  <img src={weatherData.icon} alt="" className='Weather_icon' />
        <p className='temperature'> {weatherData.temperature}°C</p>
        <p className='location'>{weatherData.location}</p>
        <div className="weather-data">
            <div className="col">
                <img src={humidity_icon} alt="" />
                <div>
                    <p>{weatherData.humidity} %</p>
                    <span>Humidity</span>
                </div>
            </div>

            <div className="col">
                <img src={wind_icon} alt="" />
                <div>
                    <p>{weatherData.windSpeed} km/h</p>
                    <span>wind speed</span>
                </div>
            </div>
        </div> </>: <> </>} 
       
        </div>
    )
}

    export default Weather
