import React from 'react';
import ForecastCard from './forecast-card';
import renderer from 'react-test-renderer';

it('renders correctly', () => {
    const tree = renderer
        .create(
            <ForecastCard
                date="02/04/2020" 
                min={6.62} 
                max={13.06} 
                icon="01d" 
                humidity={37} 
                pressure={1011} 
                speed={1.54} 
                sunrise="07:00" 
                sunset="19:52"
            />
        )
        .toJSON();
    expect(tree).toMatchSnapshot();
});