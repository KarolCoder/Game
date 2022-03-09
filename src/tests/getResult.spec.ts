import {getResult} from '@/screens/ChooseCardScreen/functions';

describe('get result function tests', () => {
  it('string in values as integers', () => {
    const result = getResult({
      firstValue: '1',
      secondValue: '2',
      selectedCard: 0,
      resource: '',
    });
    const result1 = getResult({
      firstValue: '1',
      secondValue: '2',
      selectedCard: 1,
      resource: '',
    });
    const result6 = getResult({
      firstValue: 'unknown',
      secondValue: '2',
      selectedCard: 1,
      resource: '',
    });
    const result2 = getResult({
      firstValue: '2',
      secondValue: '1',
      selectedCard: 0,
      resource: '',
    });
    const result3 = getResult({
      firstValue: '2',
      secondValue: '1',
      selectedCard: 1,
      resource: '',
    });
    expect(result).toEqual('Loser');
    expect(result1).toEqual('Winner');
    expect(result2).toEqual('Winner');
    expect(result3).toEqual('Loser');
    expect(result6).toEqual('Winner');
  });

  it('arrays in values', () => {
    const result = getResult({
      firstValue: ['1'],
      secondValue: [],
      selectedCard: 0,
      resource: '',
    });
    const result1 = getResult({
      firstValue: ['1'],
      secondValue: [],
      selectedCard: 1,
      resource: '',
    });
    const result2 = getResult({
      firstValue: ['1'],
      secondValue: ['2', '3'],
      selectedCard: 0,
      resource: '',
    });
    const result3 = getResult({
      firstValue: ['1'],
      secondValue: ['2', '3'],
      selectedCard: 1,
      resource: '',
    });
    const result4 = getResult({
      firstValue: ['1'],
      secondValue: ['1'],
      selectedCard: 0,
      resource: '',
    });
    const result5 = getResult({
      firstValue: ['1'],
      secondValue: ['1'],
      selectedCard: 1,
      resource: '',
    });
    expect(result).toEqual('Winner');
    expect(result1).toEqual('Loser');
    expect(result2).toEqual('Loser');
    expect(result3).toEqual('Winner');
    expect(result4).toEqual('Tie');
    expect(result5).toEqual('Tie');
  });

  it('string in values as floats', () => {
    const result = getResult({
      firstValue: '1.2',
      secondValue: '2.4',
      selectedCard: 0,
      resource: '',
    });
    const result1 = getResult({
      firstValue: '1.2',
      secondValue: '2.4',
      selectedCard: 1,
      resource: '',
    });
    const result2 = getResult({
      firstValue: '2.4',
      secondValue: '1.2',
      selectedCard: 0,
      resource: '',
    });
    const result3 = getResult({
      firstValue: '2.4',
      secondValue: '1.2',
      selectedCard: 1,
      resource: '',
    });
    expect(result).toEqual('Loser');
    expect(result1).toEqual('Winner');
    expect(result2).toEqual('Winner');
    expect(result3).toEqual('Loser');
  });

  it('empty values', () => {
    const result = getResult({
      firstValue: '1.2',
      secondValue: undefined,
      selectedCard: 0,
      resource: '',
    });
    const result1 = getResult({
      firstValue: '1.2',
      secondValue: undefined,
      selectedCard: 1,
      resource: '',
    });
    const result2 = getResult({
      firstValue: undefined,
      secondValue: ['1'],
      selectedCard: 0,
      resource: '',
    });
    const result3 = getResult({
      firstValue: undefined,
      secondValue: 'dwaawd',
      selectedCard: 1,
      resource: '',
    });
    const result4 = getResult({
      firstValue: undefined,
      secondValue: undefined,
      selectedCard: 1,
      resource: '',
    });
    expect(result).toEqual('Winner');
    expect(result1).toEqual('Loser');
    expect(result2).toEqual('Loser');
    expect(result3).toEqual('Winner');
    expect(result4).toEqual('Tie');
  });

  it('crew resource values', () => {
    const result = getResult({
      firstValue: '10-350',
      secondValue: '500',
      selectedCard: 0,
      resource: 'crew',
    });
    const result1 = getResult({
      firstValue: '10-350',
      secondValue: '500',
      selectedCard: 1,
      resource: 'crew',
    });
    const result2 = getResult({
      firstValue: '500,124',
      secondValue: '1-20',
      selectedCard: 0,
      resource: 'crew',
    });
    const result3 = getResult({
      firstValue: '500,124',
      secondValue: '1-20',
      selectedCard: 1,
      resource: 'crew',
    });
    const result4 = getResult({
      firstValue: '500,124',
      secondValue: '500,124',
      selectedCard: 1,
      resource: '',
    });
    expect(result).toEqual('Loser');
    expect(result1).toEqual('Winner');
    expect(result2).toEqual('Winner');
    expect(result3).toEqual('Loser');
    expect(result4).toEqual('Tie');
  });

  it('consumable resource values', () => {
    const result = getResult({
      firstValue: '1 month',
      secondValue: '1 year',
      selectedCard: 0,
      resource: 'consumables',
    });
    const result1 = getResult({
      firstValue: '1 month',
      secondValue: '2 weeks',
      selectedCard: 0,
      resource: 'consumables',
    });
    const result2 = getResult({
      firstValue: '1 day',
      secondValue: '1 day',
      selectedCard: 0,
      resource: 'consumables',
    });
    const result3 = getResult({
      firstValue: '3 days',
      secondValue: '1 year',
      selectedCard: 0,
      resource: 'consumables',
    });

    expect(result).toEqual('Loser');
    expect(result1).toEqual('Winner');
    expect(result2).toEqual('Tie');
    expect(result3).toEqual('Loser');
  });
});
