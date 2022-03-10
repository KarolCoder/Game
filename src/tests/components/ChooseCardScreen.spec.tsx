import {GameProvider} from '@/containers/useGame';
import {ChooseCardScreen} from '@/screens';
import {fireEvent, render} from '@testing-library/react-native';
import {mockedNavigate} from '../../../jest/setup';
import React from 'react';

import renderer from 'react-test-renderer';

it('choose card screen renders correctly', async () => {
  const component = (
    <GameProvider>
      <ChooseCardScreen />
    </GameProvider>
  );
  const result = renderer.create(component).toJSON();
  const {getByText} = render(component);
  expect(result).toMatchSnapshot();
  getByText('Category');
});

it('navigate to choose card screen disabled', async () => {
  const component = (
    <GameProvider>
      <ChooseCardScreen />
    </GameProvider>
  );
  const {getByTestId} = render(component);
  const cardButton1 = getByTestId('first card');
  fireEvent.press(cardButton1);
  const goToStartButton = getByTestId('bottom second button');
  fireEvent.press(goToStartButton);
  expect(mockedNavigate).toHaveBeenCalledTimes(1);
});
