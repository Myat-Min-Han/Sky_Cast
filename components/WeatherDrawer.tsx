import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "./ui/button";
import Image from "next/image";

export default function WeatherDrawer({ day }: { day: any }) {
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <div className="bg-white rounded-md shadow p-3 flex flex-col items-start cursor-pointer">
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
      </DrawerTrigger>

      <DrawerContent className="p-6 bg-gray-100">
        <DrawerHeader>
            <div className="flex items-center justify-center gap-10">
                <Image
                    src={`https:${day.day.condition.icon}`}
                    alt={day.day.condition.text}
                    width={200}
                    height={200}
                    className="shrink-0"
                />

                <div className="flex flex-col gap-2">
                    <DrawerTitle className="text-xl font-bold">{day.date}</DrawerTitle>
                    <DrawerDescription className="text-base">
                        {day.day.condition.text}
                    </DrawerDescription>

                    <p>Max Temp: {day.day.maxtemp_c}°C / {day.day.maxtemp_f}°F</p>
                    <p>Min Temp: {day.day.mintemp_c}°C / {day.day.mintemp_f}°F</p>
                    <p>Avg Temp: {day.day.avgtemp_c}°C / {day.day.avgtemp_f}°F</p>
                    <p>Avg Humidity: {day.day.avghumidity}%</p>
                    <p>Rain Chance: {day.day.daily_chance_of_rain}%</p>
                    <p>Total Precipitation: {day.day.totalprecip_mm} mm</p>
                    <p>Avg Visibility: {day.day.avgvis_km} km</p>
                    <p>UV Index: {day.day.uv}</p>
                </div>
            </div>
        </DrawerHeader>

        <DrawerFooter className="mt-4 flex flex-row justify-center">
            <DrawerClose asChild>
                <Button variant="outline" className="w-24 px-4 cursor-pointer">Cancel</Button>
            </DrawerClose>
        </DrawerFooter>
    </DrawerContent>
    </Drawer>
  );
}