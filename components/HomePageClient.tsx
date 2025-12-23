"use client"

import SearchBox from "@/components/SearchBox";
import Image from 'next/image';
import UserLocation from "@/components/UserLocation";
import { useRouter } from "next/navigation";
import { useCallback } from "react";

export default function HomePage({ data }: { data: any}) {
  const router = useRouter();
  const isError = data?.error;

  const handleLocation = useCallback((city: string) => {
    router.push(`/?city=${city}`);
  }, [router]);

  return (
    <main className="min-h-screen bg-gray-50">
      <UserLocation 
        onLocation={handleLocation}
      />
      <section className="bg-linear-to-r from-blue-400 to-yellow-200 w-full h-56 flex flex-col items-center justify-center">
        <h1 className="text-5xl font-bold text-white">SKYCAST</h1>
        <p className="text-lg text-white mt-2">Your Sky, Your Forecast</p>
        <SearchBox />
      </section>

      <section className="grid grid-cols-1 sm:grid-cols-4 gap-6 p-8">
        <div className="p-4 rounded-md shadow-md col-span-3">
          { data && !isError ? (
            <>
              <div className="flex items-center gap-4 mb-6">
                <Image 
                  src={`https:${data.current.condition.icon}`}
                  alt={data.current.condition.text}
                  width={100}
                  height={100}
                />
                <div>
                  <h2 className="text-xl font-semibold">
                    {data.current.temp_c}°C / {data.current.temp_f}°F
                  </h2>
                  <p>{data.current.condition.text}</p>
                  <p>Humidity: {data.current.humidity}%</p>
                  <p>Wind: {data.current.wind_kph} kph ({data.current.wind_dir})</p>
                  <p>Pressure: {data.current.pressure_mb} mb</p>
                  <p>UV Index: {data.current.uv}</p>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-bold mb-4">6-Day Forecast</h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-4">
                  {data.forecast.forecastday.slice(1).map((day: any) => (
                    <div
                      key={day.date}
                      className="bg-white rounded-md shadow p-3 flex flex-col items-start"
                    >
                      <p className="font-semibold">{day.date}</p>
                      <Image
                        src={`https:${day.day.condition.icon}`}
                        alt={day.day.condition.text}
                        width={48}
                        height={48}
                      />
                      <p>{day.day.condition.text}</p>
                      <p className="text-sm">
                        {day.day.avgtemp_c}°C / {day.day.avgtemp_f}°F
                      </p>
                      <p className="text-sm">Rain: {day.day.daily_chance_of_rain}%</p>
                    </div>
                  ))}
                </div>
              </div>
            </>
          ) : (
             <div className="text-gray-600">No weather data available</div>
          )}
        </div>

        <div className="p-4 rounded-md shadow-md flex gap-6 flex-col">
          {data && !isError ? (
          <>
          <div className="flex justify-between items-center">
            <b>Name</b>
            <p>{data.location.name}</p>
          </div>
          <div className="flex justify-between items-center">
            <b>Country</b>
            <p>{data.location.country}</p>
          </div>
          <div className="flex justify-between items-center">
            <b>Region</b>
            <p>{data.location.region}</p>
          </div>
          <div className="flex justify-between items-center">
            <b>Latitude</b>
            <p>{data.location.lat}</p>
          </div>
          <div className="flex justify-between items-center">
            <b>Longtitude</b>
            <p>{data.location.lon}</p>
          </div>
          <div className="flex justify-between items-center">
            <b>Local Time</b>
            <p>{data.location.localtime}</p>
          </div>
          <div className="flex justify-between items-center">
            <b>Time Zone</b>
            <p>{data.location.tz_id}</p>
          </div>
          </>
          ) : (
            <div className="text-gray-600">No data to show</div>
          )}
        </div>
      </section>
    </main>
  )
}