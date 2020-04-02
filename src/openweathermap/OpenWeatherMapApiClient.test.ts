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
                ]
            }]
        };

        const expected = [{
            date: '10/11/2019',
            min: -0.79,
            max: 0.22,
            icon: 'icon.png',
        }];
        const result = client.map5DaysForecast(json);
        expect(result).to.deep.equal(expected);
    });
});
