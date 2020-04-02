import fetch from 'node-fetch';
import { DateTime } from 'luxon';

/**
 * Client interface
 * @interface OWMclient
 */
interface IOWMclient {
}

/**
 * Used for the forecast objects
 * @interface IForecast
 */
export interface IForecast {
    date: string;
    min: number;
    max: number;
    icon: string;
    humidity: number;
    pressure: number;
    speed: number;
    sunrise: string;
    sunset: string;
}

/**
 * The class taking care of calling the openweathermap.org API
 * @class OpenWeatherMapApiClient
 */
export class OpenWeatherMapApiClient implements IOWMclient {
    public readonly API_BASE_URL: string = 'https://api.openweathermap.org/data/2.5';
    public readonly APP_ID: string = 'a1050f672b77357547f5b367e8905a4f';
    public readonly CURRENT_WEATHER_ENDPOINT: string = '/weather';
    public readonly FORECAST_ENDPOINT: string = '/forecast/daily';
    public readonly GROUP_ENDPOINT: string = '/group';

    /**
     * It should return the Current Weather Forecast given a city
     * @param city the name of the city
     */
    public async getForecast(city: string): Promise<IForecast[]> {
        const url: string = `${this.API_BASE_URL}${this.FORECAST_ENDPOINT}?q=${city}&cnt=5&units=metric&appid=${this.APP_ID}`;
        const response = await fetch(url);
        const json = await response.json();
        console.log(json);
        return this.map5DaysForecast(json);
    }

    /**
     * Mapping forecast to the defined IForecast object
     * @param json the data coming from the api...
     */
    public map5DaysForecast(json: any): IForecast[] {
        const result: IForecast[] = json.list.map((city: any) => {
            const date: string = DateTime.fromMillis(city.dt * 1000).setZone('Europe/Rome').toFormat('dd/LL/yyyy');
            return {
                date,
                min: city.temp.min,
                max: city.temp.max,
                icon: city.weather[0].icon,
                humidity:city.humidity,
                pressure:city.pressure,
                speed:city.speed,
                sunrise:DateTime.fromMillis(city.sunrise * 1000).setZone('Europe/Rome').toFormat('HH:mm'),
                sunset:DateTime.fromMillis(city.sunset * 1000).setZone('Europe/Rome').toFormat('HH:mm')
            };
        });

        return result;
    }
}
