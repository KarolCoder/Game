import {GameProvider} from '@/containers/useGame';
import {GameScreen} from '@/screens';
import {cleanup, fireEvent, render} from '@testing-library/react-native';
import {mockedNavigate} from '../../../jest/setup';
import React from 'react';
import renderer from 'react-test-renderer';

afterEach(cleanup);

describe('game screen ', () => {
  it('renders correctly', async () => {
    const component = (
      <GameProvider>
        <GameScreen />
      </GameProvider>
    );
    const result = renderer.create(component).toJSON();
    const {getByText} = render(component);
    expect(result).toMatchSnapshot();
    getByText('Continue');
  });

  it('navigate to choose card screen disabled', async () => {
    const component = (
      <GameProvider>
        <GameScreen />
      </GameProvider>
    );
    const {getByTestId} = render(component);
    const continueButton = getByTestId('continue button');
    fireEvent.press(continueButton);
    expect(mockedNavigate).toHaveBeenCalledTimes(0);
  });

  it('navigate to choose card screen enabled', async () => {
    const component = (
      <GameProvider>
        <GameScreen />
      </GameProvider>
    );
    const {getByTestId, getByText} = render(component);
    const continueButton = getByTestId('continue button');
    const optionButton1 = getByTestId('option button 1');
    fireEvent.press(optionButton1);
    getByText('Choose resource');
    const resourceButton = getByTestId('resource button0');
    fireEvent.press(resourceButton);
    fireEvent.press(continueButton);
    expect(mockedNavigate).toHaveBeenCalledTimes(1);
    expect(mockedNavigate).toHaveBeenCalledWith('ChooseCard');
  });

  it('get resources from different categories', async () => {
    const component = (
      <GameProvider>
        <GameScreen />
      </GameProvider>
    );
    const {getByTestId, getByText} = render(component);
    const optionButton1 = getByTestId('option button 1');
    const optionButton2 = getByTestId('option button 2');
    fireEvent.press(optionButton1);
    getByText('Choose resource');
    getByText('Films');
    fireEvent.press(optionButton2);
    getByText('Hyperdrive rating');
  });
});
