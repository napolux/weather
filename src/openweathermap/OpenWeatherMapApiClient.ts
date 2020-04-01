import fetch from 'node-fetch';
import { DateTime } from 'luxon';

/**
 * Client interface
 * @interface OWMclient
 */
interface IOWMclient {
}

/**
 * Used for the forecast objects in the third endpoint
 * @interface IForecast
 */
export interface IForecast {
    date: string;
    tempCelsius: number;
    pressureMillibar: number;
    humidityPercent: number;
}

/**
 * Used for the second endpoint return object
 * @interface IStats
 */
export interface IStats {
    avgTempCelsius?: number;
    highestHumidity?: any;
    highestTemp?: any;
}

/**
 * The class taking care of calling the openweathermap.org API
 * @class OpenWeatherMapApiClient
 */
export class OpenWeatherMapApiClient implements IOWMclient {
    public readonly API_BASE_URL: string = 'https://api.openweathermap.org/data/2.5';
    public readonly APP_ID: any = process.env.OWM_APP_ID;
    public readonly CURRENT_WEATHER_ENDPOINT: string = '/weather';
    public readonly FORECAST_ENDPOINT: string = '/forecast/daily';
    public readonly GROUP_ENDPOINT: string = '/group';


    /**
     * It should return the Current Weather Forecast given a city
     * @param city the name of the city
     */
    public async getForecast(city: string): Promise<IForecast[]> {
        const url: string = `${this.API_BASE_URL}${this.FORECAST_ENDPOINT}?q=${city}&cnt=7&units=metric&appid=${this.APP_ID}`;
        const response = await fetch(url);
        const json = await response.json();
        return this.map7DaysForecast(json);
    }

    /**
     * Mapping forecast to the defined IForecast object
     * @param json the data coming from the api...
     */
    public map7DaysForecast(json: any): IForecast[] {
        const result: IForecast[] = json.list.map((city: any) => {
            const date: string = DateTime.fromMillis(city.dt * 1000).toISO();
            return {
                date,
                tempCelsius: city.main.temp,
                pressureMillibar: city.main.pressure,
                humidityPercent: city.main.humidity,
            };
        });

        return result;
    }
}
