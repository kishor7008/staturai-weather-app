"use client";
interface cardsdata {
    time: number;
    description: string;
    temp: number;
    icon: string;
    iconTheme: string;
    windSpeed: number;
    maxTemp: number;
    minTemp: number;
    humidity: number;
    pressure: number;
}
const MiniCards = ({ time, description, temp, icon, iconTheme, windSpeed, maxTemp, minTemp, humidity, pressure }) => {
    // console.log("mini cards", time, temp, icon, iconTheme, windSpeed, maxTemp, minTemp, humidity, pressure)
    return (
        <>
            <div className='glassCard w-[10rem] h-[10rem] p-4 flex flex-col *:
            shadow-lg sm:shadow-md md:shadow-sm lg:shadow-xl xl:shadow-2xl rounded-lg text-center bg-cover bg-center bg-no-repeat bg-gray-500'
            //   style={{ backgroundImage: url('https://i.pinimg.com/736x/2c/7d/4f/2c7d4f58092ad9a01e648e8a7c450031.jpg') }}
            >
                <p className='text-center'>
                    {new Date(time).toLocaleTimeString('en', { weekday: 'long' }).split(" ")[0]}
                </p >
                <hr />
                <div className='w-full flex justify-center items-center flex-1'>
                    <img src={`http://openweathermap.org/img/wn/${icon}@2x.png`} alt="forecast not available" className='w-[4rem] h-[4rem]' />
                </div>
                <p className='text-center font-bold'>{temp}&deg;C</p>
                <p className='text-center font-300'>{description}</p>
                <p className='text-center font-400'>{windSpeed}</p>
                <p className='text-center font-300'>{maxTemp}</p>


            </div >
        </>
    )
}


export default MiniCards;