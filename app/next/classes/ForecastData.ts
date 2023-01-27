export default class ForecastData {

  forecast: any

  constructor(forecast: any) {
    this.forecast = forecast;
  }

  get currentTemp() {
    return '';
  }

  get currentTempMax() {
    return '';
  }

  get currentTempMin() {
    return '';
  }

  get zipCode() {
    return '';
  }

  get currentTimezone() {
    return '';
  }

  get currentTime() {
    return '';
  }

  get cacheStatus() {
    // this one might be outside this helper, it doesn't come from forecast
    // data, it comes from the api endpoint handler
    return '';
  }

}
