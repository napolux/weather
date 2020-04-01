import React from 'react';
import { Container, Menu } from 'semantic-ui-react'

export default class WeatherHeader extends React.Component {
    render() {
        return (
            <Container>
                <Menu>
                    <Menu.Item header>Weather</Menu.Item>
                    <Menu.Item>
                        <p>
                            A project by <a href="https://napolux.com">Francesco Napoletano</a>
                        </p>
                    </Menu.Item>
                </Menu>
            </Container>
        );
    }
}