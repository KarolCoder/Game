import {GameProvider} from '@/containers/useGame';
import {ChooseCardScreen} from '@/screens';
import {act, fireEvent, render} from '@testing-library/react-native';
import {mockedNavigate} from '../../../jest/setup';
import React from 'react';

import renderer from 'react-test-renderer';

describe('choose card screen', () => {
  it('renders correctly', async () => {
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

  it('bottom buttons disabled on init', async () => {
    const component = (
      <GameProvider
        initialState={{
          category: 'People',
          resource: {message: 'Length', uriParam: 'length'},
        }}>
        <ChooseCardScreen />
      </GameProvider>
    );
    const {queryByTestId} = render(component);
    expect(queryByTestId('bottom second button')).toBeNull();
    expect(queryByTestId('bottom first button')).toBeNull();
  });

  it('bottom enabled after fetching data', async () => {
    const component = (
      <GameProvider
        initialState={{
          category: 'People',
          resource: {message: 'Length', uriParam: 'length'},
        }}>
        <ChooseCardScreen />
      </GameProvider>
    );
    const {getByTestId} = render(component);
    const cardButton1 = getByTestId('first card');
    await act(async () => {
      await fireEvent.press(cardButton1);
    });
    const goToStartButton = getByTestId('bottom second button');
    fireEvent.press(goToStartButton);
    expect(mockedNavigate).toHaveBeenCalledTimes(1);
    expect(mockedNavigate).toBeCalledWith('Welcome');
  });

  it('reset cards and disable bottom buttons', async () => {
    const component = (
      <GameProvider
        initialState={{
          category: 'People',
          resource: {message: 'Length', uriParam: 'length'},
        }}>
        <ChooseCardScreen />
      </GameProvider>
    );
    const {getByTestId, queryByTestId} = render(component);
    const cardButton1 = getByTestId('first card');
    await act(async () => {
      await fireEvent.press(cardButton1);
    });
    const resetCardsButton = getByTestId('bottom first button');
    fireEvent.press(resetCardsButton);
    expect(queryByTestId('bottom second button')).toBeNull();
    expect(queryByTestId('bottom first button')).toBeNull();
  });
});
