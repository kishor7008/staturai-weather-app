"use client"
// import { useRouter } from "next/router";

import { useSearchParams } from 'next/navigation'
import { useState } from 'react'

interface weatherData {
    lon: number;
    lat: number;
}

const Page = () => {
    const searchParams = useSearchParams()
    // api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}
    const [days, setDays] = useState<string>("")
    const city = searchParams.get('city')
    let key = "07f6e8c0dff0d9d6260082aee791ec34";
    async function getWetherData() {
        try {
            let res = await fetch(
                `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&units=metric`
            );
            let data = await res.json();
            //   console.log(data.coord);
            var lon = data.coord.lon;
            var lat = data.coord.lat;
            console.log(data, "lonn:::::-", lon, lat);
            // showWtherData(data);
            weatherData(lon, lat)
        } catch (err) {
            console.log("err:", err);
        }
    }

    async function weatherData(lon: number, lat: number) {
        console.log("lon:-", lon, lat);
        try {
            let data = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${key}`);
            var res = await data.json();
            // var response = await res.data
            console.log("res", res)

        } catch (err) {
            console.log("err", err);
        }
    }
    getWetherData();
    return <>Search: {city}</>
}

export default Page;