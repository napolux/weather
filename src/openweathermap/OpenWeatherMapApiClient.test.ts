import { OpenWeatherMapApiClient } from '.';
import { expect } from 'chai';
import 'mocha';

describe('Testing mapping functions', () => {
    let client: OpenWeatherMapApiClient;
    beforeEach(() => {
        client = new OpenWeatherMapApiClient();
    });
    it('should map correct data in map7DaysForecast()', () => {
        const json = {
            list: [{
                dt: 1573408800,
                main: {
                    temp: -0.79,
                    temp_min: -0.79,
                    temp_max: 0.22,
                    pressure: 1013,
                    sea_level: 1013,
                    grnd_level: 1010,
                    humidity: 86,
                },
            }],
        };

        const expected = [{
            date: '2019-11-10T19:00:00.000+01:00',
            tempCelsius: -0.79,
            pressureMillibar: 1013,
            humidityPercent: 86,
        }];
        const result = client.map7DaysForecast(json);
        expect(result).to.deep.equal(expected);
    });
});
