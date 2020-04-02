import { OpenWeatherMapApiClient } from '.';
import { expect } from 'chai';
import 'mocha';

describe('Testing mapping functions', () => {
    let client: OpenWeatherMapApiClient;
    beforeEach(() => {
        client = new OpenWeatherMapApiClient();
    });
    it('should map correct data in map5DaysForecast()', () => {
        const json = {
            list: [{
                dt: 1573408800,
                temp: {
                    min: -0.79,
                    max: 0.22
                },
                weather: [
                    {
                        icon: 'icon.png'
                    }
                ],
                humidity: 37,
                pressure: 1011,
                speed: 1.54,
                sunrise: 1585803658,
                sunset: 1585849927
            }]
        };

        const expected = [{
            date: '10/11/2019',
            min: -0.79,
            max: 0.22,
            icon: 'icon.png',
            humidity: 37,
            sunrise: '07:00',
            sunset: '19:52',
            speed:1.54,
            pressure:1011
        }];
        const result = client.map5DaysForecast(json);
        expect(result).to.deep.equal(expected);
    });
});
