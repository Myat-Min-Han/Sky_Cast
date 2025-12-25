"use client";

import { useEffect } from "react";
import { toast } from "sonner"

export default function UserLocation({ onLocation }: { onLocation: (region: string) => void }) {
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
        (err) => toast.error(err.message)
      );
    } else {
      toast.error("Geolocation not supported")
    }
  }, []);

  return <></>
}