import React from 'react';
import WeatherHeader from './header';
import renderer from 'react-test-renderer';

it('renders correctly', () => {
    const tree = renderer
        .create(
            <WeatherHeader />
        )
        .toJSON();
    expect(tree).toMatchSnapshot();
});