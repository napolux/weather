import React, { Props } from 'react';
import { Container, Card } from 'semantic-ui-react'
import { OpenWeatherMapApiClient, IForecast } from '../openweathermap';
import ForecastCard from './forecast-card';

interface IForecastState {
    forecasts: IForecast[];
}

export default class Forecasts extends React.Component<Props<any>, IForecastState> {

    api: OpenWeatherMapApiClient;

    constructor(props: Props<any>) {
        super(props);
        this.api = new OpenWeatherMapApiClient();
    }

    componentWillMount() {
        this.setState({
            forecasts: []
        });
    }

    async componentDidMount() {
        let forecasts: Array<IForecast> = await this.api.getForecast('milan');
        this.setState({
            forecasts: forecasts
        });
    }

    render() {
        let f: any = [];
        this.state.forecasts.forEach((forecast: IForecast) => {
            f.push(
                <ForecastCard
                    date={forecast.date}
                    min={forecast.min}
                    max={forecast.max}
                    icon={forecast.icon}
                    humidity={forecast.humidity}
                    pressure={forecast.pressure}
                    speed={forecast.speed}
                    sunrise={forecast.sunrise}
                    sunset={forecast.sunset}
                />
            )
        });

        return (
            <Container>
                <Card.Group>
                    {f}
                </Card.Group>
            </Container>
        );
    }
}