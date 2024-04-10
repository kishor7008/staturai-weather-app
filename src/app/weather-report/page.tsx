"use client"
// import { useRouter } from "next/router";

import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import CardToday from '../weatherCards/weatherCard';
import WeatherCard from '../weatherCards/weatherCard';
import MiniCards from '../weatherCards/miniCards';
import { FiToggleRight } from 'react-icons/fi';

interface weatherData {
    lon: number;
    lat: number;
    humidity: number;
    speed: number;

}

const Page = () => {
    const searchParams = useSearchParams();
    const [fiveDaydata, setFiveDayaData] = useState([])
    // api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}
    const [toDay, setToDay] = useState("")
    const city = searchParams.get('city')
    let key = "07f6e8c0dff0d9d6260082aee791ec34";
    const getWetherData = () => {
        fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&units=metric`
        ).then((res) => res.json())
            .then((data) => {
                setToDay(data);
                console.log("data current data", data);
                var lon = data.coord.lon;
                var lat = data.coord.lat;
                weatherData(lon, lat)
            })
            .catch((error) => console.log("error", error));
    }
    console.log("today data ", toDay)

    const weatherData = (lon: number, lat: number) => {
        fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${key}`)
            .then((res) => res.json())
            .then((data) => {
                setFiveDayaData(data);
                console.log("data...............", data);
            })
            .catch((error) => console.log("error", error));
    }



    // function to filter forcast data based on the time of the first objcet 
    const filterForcastByfirstObjTime = (fiveDaydata) => {
        if (!fiveDaydata) {
            return []
        }
        const firstObjTime = fiveDaydata[0]?.dt_txt.split(" ")[1];
        return fiveDaydata.filter((data) => data.dt_txt.endsWith(firstObjTime));
    }
    const filteredForcast = filterForcastByfirstObjTime(fiveDaydata?.list);
    console.log("filteredforedcasr", filteredForcast);
    console.log("fiveDaydata", fiveDaydata)


    useEffect(() => {
        // weatherData
        getWetherData();

    }, [])

    return <>
        <div className='w-full h-screen text-black px-8'>
   {/* Toggle Button for change tempature in F / C */}
      {/* <label className="inline-flex items-center me-5 cursor-pointer">
        <input type="checkbox" value="" className="sr-only peer"  />
        <div className="relative w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-red-300 dark:peer-focus:ring-red-800 dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-red-600"></div>
      </label> */}

            <main className='w-full flex flex-wrap gap-8 py-4 px-[10%] items-center justify-center'>
                <WeatherCard
                    // place={thisLocation}
                    windSpeed={toDay?.wind?.speed}
                    humidity={toDay?.main?.humidity}
                    minTemp={toDay?.main?.temp_min}
                    temp={toDay?.main?.temp}
                    name={toDay?.name}

                    maxTemp={toDay?.main?.temp_max}
                    sunrise={toDay?.sys?.sunrise}
                    sunset={toDay?.sys?.sunset}

                // description={toDay.weather[0].description}
                // icon={toDay?.weather[0]?.icon ?? ""}


                // heatIndex={weather.heatindex}
                // iconString={weather.conditions}
                // conditions={weather.conditions}
                />

                <div className='flex justify-center gap-8 flex-wrap w-[60%]'>
                    {
                        filteredForcast?.map(curr => {
                            return (
                                <MiniCards
                                    key={curr}
                                    description={curr.weather[0].description}
                                    time={curr.dt_txt}
                                    temp={curr?.main?.temp}
                                    icon={curr.weather[0].icon}
                                    iconTheme={curr.weather[0].main}
                                    windSpeed={curr.wind.speed}
                                    maxTemp={curr.main.temp_max}
                                    minTemp={curr.main.temp_min}
                                    humidity={curr.main.humidity}
                                    pressure={curr.main.pressure}
                                />
                            )
                        })
                    }
                </div>
            </main>
        </div>
    </>
}

export default Page;