import HomePageClient from "@/components/HomePageClient";

export default async function HomePage({ searchParams }: { searchParams: Promise<{ city?: string }> }) {
  const { city } = await searchParams;

  let data = null;
  if (city) {
    try {
      const res = await fetch(
        `https://api.weatherapi.com/v1/forecast.json?key=${process.env.WEATHER_API_KEY}&q=${city}&days=7`,
        { cache: "no-store" }
      );
      data = await res.json();
    } catch (err) {
      console.error("Fetch error:", err);
    }
  }

  return <HomePageClient data={data} />;
}