import {CategorySection} from '@/screens/GameScreen/partials/CategorySection';
import {fireEvent, render} from '@testing-library/react-native';
import React from 'react';

import renderer from 'react-test-renderer';

describe('category section', () => {
  it('renders correctly', async () => {
    const fn = jest.fn();
    const component = (
      <CategorySection setActiveCategory={fn} activeCategory="People" />
    );
    const result = renderer.create(component).toJSON();
    const {getByText} = render(component);
    expect(result).toMatchSnapshot();
    getByText('People');
    getByText('Starships');
    getByText('Choose category');
  });

  it('changed category on press', async () => {
    const fn = jest.fn();
    const component = (
      <CategorySection setActiveCategory={fn} activeCategory="Starships" />
    );
    const {getByTestId} = render(component);
    fireEvent.press(getByTestId('option button 1'));
    expect(fn).toBeCalledWith('People');
  });
});
