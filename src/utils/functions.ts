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
  if (!firstValue && !secondValue) {
    return 'Tie';
  }
  if (firstValue && !secondValue) {
    if (selectedCard === 0) {
      return 'Winner';
    } else {
      return 'Loser';
    }
  }
  if (!firstValue && secondValue) {
    if (selectedCard === 0) {
      return 'Loser';
    } else {
      return 'Winner';
    }
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
    if (resource === 'crew') {
      return getWinnerForCrew({
        firstValue: firstValue as string,
        secondValue: secondValue as string,
        selectedCard,
      });
    } else if (resource === 'consumables') {
      return getWinnerForConsumables({
        firstValue: firstValue as string,
        secondValue: secondValue as string,
        selectedCard,
      });
    }
    return getWinnerForDefaultStringResource({
      firstValue: firstValue as string,
      secondValue: secondValue as string,
      selectedCard,
    });
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
  if (firstValue.length > secondValue.length) {
    if (selectedCard === 0) {
      return 'Winner';
    } else {
      return 'Loser';
    }
  } else if (firstValue.length < secondValue.length) {
    if (selectedCard === 0) {
      return 'Loser';
    } else {
      return 'Winner';
    }
  } else {
    return 'Tie';
  }
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
      if (firstValueQuantity > secondValueQuantity) {
        if (selectedCard === 0) {
          return 'Winner';
        } else {
          return 'Loser';
        }
      } else if (secondValueQuantity < firstValueQuantity) {
        if (selectedCard === 0) {
          return 'Loser';
        } else {
          return 'Winner';
        }
      } else {
        return 'Tie';
      }
    } else if (secondValueTimeUnit === 'years') {
      if (selectedCard === 0) {
        return 'Loser';
      } else {
        return 'Winner';
      }
    } else if (secondValueTimeUnit === 'year') {
      if (firstValueTimeUnit === 'years') {
        if (selectedCard === 0) {
          return 'Winner';
        } else {
          return 'Loser';
        }
      } else {
        if (selectedCard === 1) {
          return 'Winner';
        } else {
          return 'Loser';
        }
      }
    } else if (secondValueTimeUnit === 'months') {
      if (firstValueTimeUnit === 'years' || firstValueTimeUnit === 'year') {
        if (selectedCard === 0) {
          return 'Winner';
        } else {
          return 'Loser';
        }
      } else {
        if (selectedCard === 0) {
          return 'Loser';
        } else {
          return 'Winner';
        }
      }
    } else if (secondValueTimeUnit === 'month') {
      if (
        firstValueTimeUnit === 'years' ||
        firstValueTimeUnit === 'year' ||
        firstValueTimeUnit === 'months'
      ) {
        if (selectedCard === 0) {
          return 'Winner';
        } else {
          return 'Loser';
        }
      } else {
        if (selectedCard === 0) {
          return 'Loser';
        } else {
          return 'Winner';
        }
      }
    } else if (secondValueTimeUnit === 'weeks') {
      if (
        firstValueTimeUnit === 'years' ||
        firstValueTimeUnit === 'year' ||
        firstValueTimeUnit === 'months' ||
        firstValueTimeUnit === 'month'
      ) {
        if (selectedCard === 0) {
          return 'Winner';
        } else {
          return 'Loser';
        }
      } else {
        if (selectedCard === 0) {
          return 'Loser';
        } else {
          return 'Winner';
        }
      }
    } else if (secondValueTimeUnit === 'week') {
      if (firstValueTimeUnit === 'days' || firstValueTimeUnit === 'day') {
        if (selectedCard === 0) {
          return 'Loser';
        } else {
          return 'Winner';
        }
      } else {
        if (selectedCard === 0) {
          return 'Winner';
        } else {
          return 'Loser';
        }
      }
    } else if (secondValueTimeUnit === 'days') {
      if (firstValueTimeUnit === 'day') {
        if (selectedCard === 0) {
          return 'Loser';
        } else {
          return 'Winner';
        }
      } else {
        if (selectedCard === 0) {
          return 'Winner';
        } else {
          return 'Loser';
        }
      }
    } else if (secondValueTimeUnit === 'day') {
      if (selectedCard === 0) {
        return 'Winner';
      } else {
        return 'Loser';
      }
    }
  }
  return;
};

const getWinnerForCrew = ({
  firstValue,
  secondValue,
  selectedCard,
}: {
  firstValue: string;
  secondValue: string;
  selectedCard?: number;
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
  if (parsedFirstValue > parsedSecondValue) {
    if (selectedCard === 0) {
      return 'Winner';
    } else {
      return 'Loser';
    }
  } else if (firstValueFLoat < secondValueFLoat) {
    if (selectedCard === 0) {
      return 'Loser';
    } else {
      return 'Winner';
    }
  } else {
    return 'Tie';
  }
};

const getWinnerForDefaultStringResource = ({
  firstValue,
  secondValue,
  selectedCard,
}: {
  firstValue: string;
  secondValue: string;
  selectedCard?: number;
}) => {
  const firstValueFLoat = parseFloat(firstValue.replace(',', ''));
  const secondValueFLoat = parseFloat(secondValue.replace(',', ''));
  const parsedFirstValue = isNaN(firstValueFLoat) ? -1 : firstValueFLoat;
  const parsedSecondValue = isNaN(secondValueFLoat) ? -1 : secondValueFLoat;
  if (parsedFirstValue > parsedSecondValue) {
    if (selectedCard === 0) {
      return 'Winner';
    } else {
      return 'Loser';
    }
  } else if (parsedFirstValue < parsedSecondValue) {
    if (selectedCard === 0) {
      return 'Loser';
    } else {
      return 'Winner';
    }
  } else {
    return 'Tie';
  }
};
