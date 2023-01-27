import { zonedTimeToUtc, utcToZonedTime, format } from 'date-fns-tz';

export default class ForecastData {

  forecast: any

  constructor(forecast: any) {
    this.forecast = forecast;
  }

  get currentTemp() {
    return this.forecast.current_weather.temperature;
  }

  get currentTempMax() {
    return this.forecast.daily.temperature_2m_max[0];
  }

  get currentTempMin() {
    return this.forecast.daily.temperature_2m_min[0];
  }

  get currentTimezone() {
    return this.forecast.timezone;
  }

  get currentTime() {
    const date = zonedTimeToUtc(this.forecast.current_weather.time, this.currentTimezone);
    const zonedDate = utcToZonedTime(date, this.currentTimezone);
    return format(zonedDate, "PPpp", { timeZone: this.currentTimezone });
  }

}
