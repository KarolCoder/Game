import {ConsumablesUnit} from '@/api/types';
import {consumablesUnitsComparision} from './consts';

export const getRandomInt = (min: number, max: number) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
};

export const getResult = ({
  firstValue,
  secondValue,
  selectedCard,
  resource,
}: {
  firstValue?: string | string[];
  secondValue?: string | string[];
  selectedCard?: number;
  resource: string;
}) => {
  const validatedValues = validateValues({
    firstValue: firstValue,
    secondValue: secondValue,
    selectedCard,
  });
  if (validatedValues) {
    return validatedValues;
  }

  if (Array.isArray(firstValue) && Array.isArray(secondValue)) {
    return getWinnerForArrays({
      firstValue: firstValue,
      secondValue: secondValue,
      selectedCard,
    });
  }
  if (
    (typeof firstValue === 'string' || firstValue instanceof String) &&
    (typeof secondValue === 'string' || secondValue instanceof String)
  ) {
    if (resource === 'consumables') {
      return getWinnerForConsumables({
        firstValue: firstValue as string,
        secondValue: secondValue as string,
        selectedCard,
      });
    }
    return getWinnerForStrings({
      firstValue: firstValue as string,
      secondValue: secondValue as string,
      selectedCard,
    });
  }
};

const validateValues = ({
  firstValue,
  secondValue,
  selectedCard,
}: {
  firstValue?: string | string[];
  secondValue?: string | string[];
  selectedCard?: number;
}) => {
  if (!firstValue && !secondValue) {
    return 'Tie';
  }
  if (firstValue && !secondValue) {
    return getWinnerBySelectedCard({firstCardShouldWin: true, selectedCard});
  }
  if (!firstValue && secondValue) {
    return getWinnerBySelectedCard({selectedCard});
  }
};

const getWinnerBySelectedCard = ({
  firstCardShouldWin,
  selectedCard,
}: {
  firstCardShouldWin?: boolean;
  selectedCard?: number;
}) => {
  if (
    (selectedCard === 0 && firstCardShouldWin) ||
    (selectedCard === 1 && !firstCardShouldWin)
  ) {
    return 'Winner';
  } else {
    return 'Loser';
  }
};

const getWinnerForArrays = ({
  firstValue,
  secondValue,
  selectedCard,
}: {
  firstValue: string[];
  secondValue: string[];
  selectedCard?: number;
}) => {
  return getWinnerByBiggerNumbers({
    parsedFirstValue: firstValue.length,
    parsedSecondValue: secondValue.length,
    selectedCard,
  });
};

const getWinnerForConsumables = ({
  firstValue,
  secondValue,
  selectedCard,
}: {
  firstValue: string;
  secondValue: string;
  selectedCard?: number;
}) => {
  const firstValueSplit = firstValue.split(' ');
  const secondValueSplit = secondValue.split(' ');
  if (firstValueSplit.length > 1 && secondValueSplit.length > 1) {
    const firstValueQuantity = firstValueSplit[0];
    const secondValueQuantity = secondValueSplit[0];
    const firstValueTimeUnit = firstValueSplit[1];
    const secondValueTimeUnit = secondValueSplit[1];
    if (secondValueTimeUnit === firstValueTimeUnit) {
      return getWinnerForStrings({
        firstValue: firstValueQuantity,
        secondValue: secondValueQuantity,
        selectedCard,
      });
    } else {
      return getWinnerForConsumablesDifferentsUnits({
        firstValueTimeUnit: firstValueTimeUnit as ConsumablesUnit,
        secondValueTimeUnit: secondValueTimeUnit as ConsumablesUnit,
        selectedCard,
      });
    }
  }
  return;
};

const getWinnerForConsumablesDifferentsUnits = ({
  firstValueTimeUnit,
  secondValueTimeUnit,
  selectedCard,
}: {
  firstValueTimeUnit: ConsumablesUnit;
  secondValueTimeUnit: ConsumablesUnit;
  selectedCard?: number;
}) => {
  const tableWithWinnerUnits = consumablesUnitsComparision[secondValueTimeUnit];
  if (
    tableWithWinnerUnits &&
    tableWithWinnerUnits.includes(firstValueTimeUnit)
  ) {
    return getWinnerBySelectedCard({
      firstCardShouldWin: true,
      selectedCard,
    });
  } else {
    return getWinnerBySelectedCard({selectedCard});
  }
};

const getWinnerForStrings = ({
  firstValue,
  secondValue,
  selectedCard,
}: {
  firstValue: string;
  secondValue: string;
  selectedCard?: number;
}) => {
  const {parsedFirstValue, parsedSecondValue} = parseStringToFloat({
    firstValue,
    secondValue,
  });
  return getWinnerByBiggerNumbers({
    parsedFirstValue,
    parsedSecondValue,
    selectedCard,
  });
};

const getWinnerByBiggerNumbers = ({
  parsedFirstValue,
  parsedSecondValue,
  selectedCard,
}: {
  parsedFirstValue: number;
  parsedSecondValue: number;
  selectedCard?: number;
}) => {
  if (parsedFirstValue > parsedSecondValue) {
    return getWinnerBySelectedCard({firstCardShouldWin: true, selectedCard});
  } else if (parsedFirstValue < parsedSecondValue) {
    return getWinnerBySelectedCard({selectedCard});
  } else {
    return 'Tie';
  }
};

const parseStringToFloat = ({
  firstValue,
  secondValue,
}: {
  firstValue: string;
  secondValue: string;
}) => {
  const firstValueSplit = firstValue.split('-');
  const secondValueSplit = secondValue.split('-');
  const firstValueLastIndex =
    firstValueSplit.length > 0 ? firstValueSplit.length - 1 : 0;
  const secondValueLastIndex =
    secondValueSplit.length > 0 ? secondValueSplit.length - 1 : 0;
  const firstValueFLoat = parseFloat(
    firstValueSplit[firstValueLastIndex].replace(',', ''),
  );
  const secondValueFLoat = parseFloat(
    secondValueSplit[secondValueLastIndex].replace(',', ''),
  );
  const parsedFirstValue = isNaN(firstValueFLoat) ? -1 : firstValueFLoat;
  const parsedSecondValue = isNaN(secondValueFLoat) ? -1 : secondValueFLoat;
  return {
    parsedFirstValue: parsedFirstValue,
    parsedSecondValue: parsedSecondValue,
  };
};
