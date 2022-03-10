import {GameProvider} from '@/containers/useGame';
import {MainNavigator} from '@/navigation/MainNavigator';
import {WelcomeScreen} from '@/screens';
import {fireEvent, render} from '@testing-library/react-native';
import {mockedNavigate} from '../../../jest/setup';
import React from 'react';

import renderer from 'react-test-renderer';

describe('welcome screen ', () => {
  it('renders correctly', async () => {
    const component = (
      <GameProvider>
        <WelcomeScreen />
      </GameProvider>
    );
    const result = renderer.create(component).toJSON();
    const {getByText} = render(component);

    expect(result).toMatchSnapshot();
    getByText('Play');
  });

  it('navigate to game screen', async () => {
    const component = <MainNavigator />;
    const {getByText, getByHintText} = render(component);
    getByText('Play');
    fireEvent.press(getByHintText('bottom button'));
    expect(mockedNavigate).toHaveBeenCalledTimes(1);
    expect(mockedNavigate).toHaveBeenLastCalledWith('Game');
  });
});
