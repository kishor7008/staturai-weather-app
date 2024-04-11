"use client"
import { useEffect, useState } from "react"
import sun from "../../../public/assets/sun.png";
import fog from "../../../public/assets/fog.png";
import rain from "../../../public/assets/rain.png";
import snow from "../../../public/assets/snow.png";
import storm from "../../../public/assets/storm.png";
import wind from "../../../public/assets/wind.png";
// import Image from "next/image";

const WeatherCard = ({ windSpeed, name, humidity, description, icon, minTemp, temp, maxTemp, sunrise, sunset }) => {


  // const [icon, setIcon] = useState(sun)
  // const { time } = useDate()

  // useEffect(() => {
  //   if (iconString) {
  //     if (iconString.toLowerCase().includes('cloud')) {
  //       setIcon(cloud)
  //     } else if (iconString.toLowerCase().includes('rain')) {
  //       setIcon(rain)
  //     } else if (iconString.toLowerCase().includes('clear')) {
  //       setIcon(sun)
  //     } else if (iconString.toLowerCase().includes('thunder')) {
  //       setIcon(storm)
  //     } else if (iconString.toLowerCase().includes('fog')) {
  //       setIcon(fog)
  //     } else if (iconString.toLowerCase().includes('snow')) {
  //       setIcon(snow)
  //     } else if (iconString.toLowerCase().includes('wind')) {
  //       setIcon(wind)
  //     }
  //   }
  // // }, [iconString])
  // Property 'moment' does not exist on type 'Window & typeof globalThis'.ts(2339)
  // any
  // const sunsetNewValue =window.moment(sunset).format("HH:mm a")
  console.log("icon", sunset, minTemp, temp)
  return (
    <>

      <div className='w-[22rem] min-w-[22rem] h-[30rem] glassCard p-4 bg-gray-500 border border-gray-400 rounded-lg  '>
        <div className='flex w-full just-center, items-center gap-4 mt-12 mb-4'>
          <img src={`http://openweathermap.org/img/wn/03d@2x.png`} alt="weather_icon" width={100} />
          <p className='font-bold text-5xl flex justify-center items-center' >{temp} &deg;C</p>
        </div>
        <div className='font-bold text-center text-x1'>
          {name}
        </div>
        <div className='w-full flex justify-between items-center mt-4'>
          <p className='flex-1 text-center p-2'>{new Date().toDateString()}</p>
          <p className='flex-1 text-center p-2'>{"time"}</p>
          <p></p>
        </div>
        <div className='w-full flex justify-between items-center mt-4 gap-4'>
          <p className='flex-1 text-center p-2 font-bold bg-blue-600 shadow rounded-lg'>Wind Speed <p className='font-normal'>{windSpeed} km/h</p></p>
          <p className='flex-1 text-center p-2 font-bold rounded-lg bg-green-600'>Humidity <p className='font-normal'>{humidity} gm/m&#179;</p></p>
        </div>
        <div className='w-full p-3 mt-4 flex justify-between items-center'>
          <p className='font-semibold text-lg'>Max Temp</p>
          {/* <p className='font-semibold text-lg'> Temp</p> */}
          <p className='font-semibold text-lg'>Min Temp</p>
        </div>
        <div className='w-full p-3  flex justify-between items-center'>
          <p className=' text-lg'>{maxTemp}</p>
          <p className='text-lg'>{minTemp}</p>
        </div>
        <hr className='bg-slate-600' />
        <div className='w-full p-4 flex justify-center items-center text-3xl font-semibold'>
          <p>{"conditions"}</p>
        </div>
      </div>

    </>
  )
}



export default WeatherCard;