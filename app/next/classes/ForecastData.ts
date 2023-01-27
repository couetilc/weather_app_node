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
    return format(this.zonedDate, "PPpp", { timeZone: this.currentTimezone });
  }

  get hourlyTime() {
    return this.forecast.hourly.time;
  }

  get hourlyTemperature() {
    return this.forecast.hourly.temperature_2m;
  }

  get utcDate() {
    return zonedTimeToUtc(this.forecast.current_weather.time, this.currentTimezone); 
  }

  get zonedDate() {
    return utcToZonedTime(this.utcDate, this.currentTimezone);
  }

}
