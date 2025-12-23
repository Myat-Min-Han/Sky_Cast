"use client";

import { useEffect, useState } from "react";

export default function UserLocation({ onLocation }: { onLocation: (region: string) => void }) {
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          const res = await fetch(
            `https://api.weatherapi.com/v1/search.json?key=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}&q=${latitude},${longitude}`
          );
          const places = await res.json();
          if (places.length > 0) {
            onLocation(places[0].region); 
          }
        },
        (err) => setError(err.message)
      );
    } else {
      setError("Geolocation not supported");
    }
  }, []);

  return error ? <p className="text-red-500">{error}</p> : null;
}