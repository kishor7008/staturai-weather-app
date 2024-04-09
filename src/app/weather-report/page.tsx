"use client"
// import { useRouter } from "next/router";

import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import CardToday from '../weatherCards/weatherCard';
import WeatherCard from '../weatherCards/weatherCard';
import MiniCards from '../weatherCards/miniCards';

interface weatherData {
    lon: number;
    lat: number;
}

const Page = () => {
    const searchParams = useSearchParams();
    const [fiveDaydata, setFiveDayaData] = useState([])
    // api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}
    const [days, setDays] = useState<string>("")
    const city = searchParams.get('city')
    let key = "07f6e8c0dff0d9d6260082aee791ec34";
    const getWetherData = () => {
        fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&units=metric`
        ).then((res) => res.json())
            .then((data) => {
                // setFiveDayaData(data);
                // console.log("data", data);
                var lon = data.coord.lon;
                var lat = data.coord.lat;
                // console.log(data, "lonn:::::-", lon, lat);
                // showWtherData(data);
                weatherData(lon, lat)
            })
            .catch((error) => console.log("error", error));
    }


    const weatherData = (lon: number, lat: number) => {
        fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${key}`)
            .then((res) => res.json())
            .then((data) => {
                // setFiveDayaData(data);
                console.log("data...............", data);
            })
            .catch((error) => console.log("error", error));
    }
    useEffect(() => {
        // weatherData
        getWetherData();
    }, [])
    console.log("fiveDaydata", fiveDaydata)
    return <>
        <div className='w-full h-screen text-black px-8'>

            <main className='w-full flex flex-wrap gap-8 py-4 px-[10%] items-center justify-center'>
                <WeatherCard
                // place={thisLocation}
                // windspeed={weather.wspd}
                // humidity={weather.humidity}
                // temperature={weather.temp}
                // heatIndex={weather.heatindex}
                // iconString={weather.conditions}
                // conditions={weather.conditions}
                />



                <div className='flex justify-center gap-8 flex-wrap w-[60%]'>
                    {
                        // fiveDaydata?.map(curr => {
                        //     return (
                        //         <MiniCards
                        //             key={curr}
                        //         // description={curr.weather.description}
                        //         // time={curr.dt_txt}
                        //         // temp={curr.list.main.temp}
                        //         // icon={curr.weather.icon}
                        //         // iconTheme ={curr.weather.main}
                        //         // windSpeed={curr.wind.speed}
                        //         // maxTemp ={curr.main.temp_max}
                        //         // minTemp ={curr.main.temp_min}
                        //         // humidity ={curr.main.humidity}
                        //         // pressure ={curr.main.pressure}
                        //         />
                        //     )
                        // })
                    }
                </div>
            </main>
        </div>
    </>
}

export default Page;