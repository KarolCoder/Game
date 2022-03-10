import {CardsSection} from '@/screens/ChooseCardScreen/partials/CardsSection';
import {fireEvent, render} from '@testing-library/react-native';
import React from 'react';

import renderer from 'react-test-renderer';

describe('card section', () => {
  it('renders correctly', async () => {
    const fn = jest.fn();
    const component = (
      <CardsSection
        getNextPage={fn}
        refreshData={fn}
        updateGameSelectedCard={fn}
        firstValueDisplayed="firstValue"
        nextPage="nextPage"
        resourcesFromData={{firstResource: 'first', secondResource: 'second'}}
        secondValueDisplayed="secondValue"
        status="waiting"
      />
    );
    const result = renderer.create(component).toJSON();
    const {getByText} = render(component);
    expect(result).toMatchSnapshot();
    getByText('secondValue');
    getByText('firstValue');
  });

  test('disable button when component has resources', async () => {
    const fn = jest.fn();
    const updateFn = jest.fn();
    const component = (
      <CardsSection
        getNextPage={fn}
        refreshData={fn}
        updateGameSelectedCard={updateFn}
        firstValueDisplayed="firstValue"
        nextPage="nextPage"
        resourcesFromData={{firstResource: 'first', secondResource: 'second'}}
        secondValueDisplayed="secondValue"
        status="waiting"
      />
    );
    const {getByTestId} = render(component);
    const firstCard = getByTestId('first card');
    const secondCard = getByTestId('second card');
    fireEvent.press(firstCard);
    expect(updateFn).toBeCalledTimes(0);
    fireEvent.press(secondCard);
    expect(updateFn).toBeCalledTimes(0);
  });

  it('change selected card', async () => {
    const fn = jest.fn();
    const updateFn = jest.fn();
    const component = (
      <CardsSection
        getNextPage={fn}
        refreshData={fn}
        updateGameSelectedCard={updateFn}
        firstValueDisplayed="firstValue"
        nextPage="nextPage"
        resourcesFromData={undefined}
        secondValueDisplayed="secondValue"
        status="waiting"
      />
    );
    const {getByTestId} = render(component);
    const firstCard = getByTestId('first card');
    const secondCard = getByTestId('second card');
    fireEvent.press(firstCard);
    expect(updateFn).toBeCalledTimes(1);
    expect(updateFn).toBeCalledWith(0);
    fireEvent.press(secondCard);
    expect(updateFn).toBeCalledTimes(2);
    expect(updateFn).toBeCalledWith(1);
  });

  it('refresh data', async () => {
    const fn = jest.fn();
    const refreshData = jest.fn();
    const component = (
      <CardsSection
        getNextPage={fn}
        refreshData={refreshData}
        updateGameSelectedCard={fn}
        firstValueDisplayed="firstValue"
        nextPage={undefined}
        resourcesFromData={undefined}
        secondValueDisplayed="secondValue"
        status="waiting"
      />
    );
    const {getByTestId} = render(component);
    const firstCard = getByTestId('first card');
    fireEvent.press(firstCard);
    expect(refreshData).toBeCalledTimes(1);
  });

  it('get next page', async () => {
    const fn = jest.fn();
    const getNextPage = jest.fn();
    const component = (
      <CardsSection
        getNextPage={getNextPage}
        refreshData={fn}
        updateGameSelectedCard={fn}
        firstValueDisplayed="firstValue"
        nextPage={'nextPage'}
        resourcesFromData={undefined}
        secondValueDisplayed="secondValue"
        status="waiting"
      />
    );
    const {getByTestId} = render(component);
    const firstCard = getByTestId('first card');
    fireEvent.press(firstCard);
    expect(getNextPage).toBeCalledTimes(1);
  });
});
