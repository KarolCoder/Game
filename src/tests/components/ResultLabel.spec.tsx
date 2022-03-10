import {ResultLabel} from '@/screens/ChooseCardScreen/partials/ResultLabel';
import {GameResult} from '@/utils/types';
import {render} from '@testing-library/react-native';
import React from 'react';

import renderer from 'react-test-renderer';

it('result label renders correctly', async () => {
  const resultLabelData: Array<{result: GameResult; text: string}> = [
    {result: 'Winner', text: 'Congratualtions, you won!!!'},
    {result: 'Loser', text: 'You lose, loser :D'},
    {result: 'Tie', text: 'Tie, try again'},
    {result: undefined, text: "Couldn't resolve winner please go to start"},
  ];
  resultLabelData.forEach(({result, text}) => {
    const component = <ResultLabel result={result} />;
    const resultRenderer = renderer.create(component).toJSON();
    const {getByText} = render(component);
    expect(resultRenderer).toMatchSnapshot();
    getByText(text);
  });
});
