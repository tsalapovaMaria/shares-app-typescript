"use strict";
const amountToBuyCounter = () => {
    const calculateAmount = (userValuesEntered, boughtRecords) => {
        const [desiredPrice, currentPrice] = userValuesEntered;
        const amountEntrySum = Array.from(boughtRecords).map(item => item.amount).reduce((prev, curr) => prev + curr, 0);
        const totalEntrySum = Array.from(boughtRecords).map(item => item.price * item.amount).reduce((prev, curr) => prev + curr, 0);
        return (totalEntrySum - desiredPrice * amountEntrySum) / (desiredPrice - currentPrice);
    };
    const calculateAmountWhileSoldExist = (userValuesEntered, boughtRecords, soldRecords) => {
        let soldLastIndex = soldRecords.length - 1;
        let soldRecord = soldRecords[soldLastIndex];
        if (!soldRecord || !soldRecord.amount) {
            return countAverage(boughtRecords);
        }
        const recordsBoughtEarlier = boughtRecords.filter(boughtRecord => boughtRecord.id < soldRecord.id);
        //ЕСЛИ пользователь сначала внес в таблицу проданные акции,
        //раньше, чем купленные, ТО считать только купленные акции
        if (recordsBoughtEarlier.length === 0) {
            return countAverage(boughtRecords);
        }
        let indexModificator = 1;
        let filteredBoughtRecords = [];
        //фильтровать массив с купленными акциями
        //ПОКА проходим по массиву с проданными акциями
        while (soldRecord && soldRecord.amount) {
            filteredBoughtRecords = getFilteredBoughtRecords(boughtRecords, soldRecord);
            if (!filteredBoughtRecords || filteredBoughtRecords.length === 0) {
                return 0;
            }
            soldLastIndex = soldRecords.length - ++indexModificator;
            soldRecord = soldRecords[soldLastIndex];
        }
        return calculateAmount(userValuesEntered, boughtRecords);
    };
    return {
        count: (userValuesEntered, entryPointsForm, exitPointsForm) => {
            const entryState = entryPointsForm.getState();
            const boughtRecords = Object
                .keys(entryState)
                .map((value, key) => entryState[key]);
            const exitState = exitPointsForm.getState();
            const soldRecords = Object
                .keys(exitState)
                .map((value, key) => exitState[key]);
            return calculateAmountWhileSoldExist(userValuesEntered, boughtRecords, soldRecords);
        }
    };
};
