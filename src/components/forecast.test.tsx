import React from 'react';
import Forecasts from './forecast';
import renderer from 'react-test-renderer';

it('renders correctly', () => {
    const tree = renderer
        .create(
            <Forecasts />
        )
        .toJSON();
    expect(tree).toMatchSnapshot();
});