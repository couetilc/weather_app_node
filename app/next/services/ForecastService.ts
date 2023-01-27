import { get, set } from '@/utils/redis';

export default class ForecastService {

  zipCode: string 
  isCached: boolean | null

  constructor(zipCode: string | number) {
    this.zipCode = String(zipCode);
    this.isCached = null;
  }

  async call() {
    this.isCached = true;

    try {
      const cached = await get(this.cacheKey)

      if (cached) {
        return JSON.parse(cached);
      } 

      const geoApiResponse = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${this.zipCode}`
      ).then(res => res.json());

      const location = geoApiResponse.results[0];

      const weatherApiResponse = await fetch(
        `https://api.open-meteo.com/v1/forecast?${[
          `timezone=${location["timezone"]}`,
          `latitude=${location["latitude"]}`,
          `longitude=${location["longitude"]}`,
          "current_weather=true",
          "daily=temperature_2m_min",
          "daily=temperature_2m_max",
          "hourly=temperature_2m",
          "temperature_unit=fahrenheit",
        ].join('&')}`
      ).then(res => res.json());

      await set(
        this.cacheKey,
        JSON.stringify(weatherApiResponse),
        this.cacheOptions
      );

      this.isCached = false;

      return weatherApiResponse;
    }
    catch (e) {
      return {};
    }
  }

  get cacheKey() {
    return `zip:${this.zipCode}`;
  }

  get cacheOptions() {
    return { EX: 30 * 60 };
  }
}
