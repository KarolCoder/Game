import {BottomButtons} from '@/screens/ChooseCardScreen/partials/BottomButtons';
import {fireEvent, render} from '@testing-library/react-native';
import React from 'react';

import renderer from 'react-test-renderer';

describe('bottom buttons', () => {
  it('renders correctly', async () => {
    const fn = jest.fn();
    const component = <BottomButtons onLeftPress={fn} onRightPress={fn} />;
    const result = renderer.create(component).toJSON();
    const {getByTestId} = render(component);

    expect(result).toMatchSnapshot();
    getByTestId('bottom first button');
    getByTestId('bottom second button');
  });

  it('disabled', async () => {
    const fn = jest.fn();
    const component = (
      <BottomButtons onLeftPress={fn} onRightPress={fn} isDisabled />
    );
    const result = renderer.create(component).toJSON();
    const {getByTestId} = render(component);

    expect(result).toMatchSnapshot();
    const firstButton = getByTestId('bottom first button');
    const secondButton = getByTestId('bottom second button');
    fireEvent.press(firstButton);
    expect(fn).toBeCalledTimes(0);
    fireEvent.press(secondButton);
    expect(fn).toBeCalledTimes(0);
  });

  it('pressed', async () => {
    const fn = jest.fn();
    const component = <BottomButtons onLeftPress={fn} onRightPress={fn} />;
    const result = renderer.create(component).toJSON();
    const {getByTestId} = render(component);
    expect(result).toMatchSnapshot();
    const firstButton = getByTestId('bottom first button');
    const secondButton = getByTestId('bottom second button');
    fireEvent.press(firstButton);
    expect(fn).toBeCalledTimes(1);
    fireEvent.press(secondButton);
    expect(fn).toBeCalledTimes(2);
  });
});
