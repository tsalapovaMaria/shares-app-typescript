"use strict";
const averagePrice = averagePriceCounter();
const profitPrice = profitPriceCounter();
const currentPriceProfitInput = document.querySelector('.tab01 .current-price__input');
const changeAmountPriceValue = (entryPointsForm, exitPointsForm) => {
    const averagePriceValue = averagePrice.count(entryPointsForm, exitPointsForm);
    const outputElement = document.querySelector('.average-output-price');
    outputElement.textContent = (Math.trunc(averagePriceValue * 100) / 100).toLocaleString();
};
const changeProfitValue = (entryPointsForm, exitPointsForm) => {
    const profitEl = document.querySelector('.profit-value');
    const value = readInputValue(currentPriceProfitInput);
    if (!value) {
        currentPriceProfitInput.textContent = '';
        return;
    }
    const profit = profitPrice.count(value, entryPointsForm, exitPointsForm);
    const profitClassName = 'profit-value';
    profitEl.textContent =
        (profit > 0) ? `+ ${profit.toLocaleString()}` :
            (profit === 0) ? `0` :
                `- ${Math.abs(profit).toLocaleString()}`;
    profitEl.className =
        (profit > 0) ? `${profitClassName} positive-profit` :
            (profit < 0) ? `${profitClassName} negative-profit` :
                profitClassName;
};
const addProfitInputEvent = (input, entryPointsForm, exitPointsForm) => {
    input.addEventListener('input', () => {
        const value = readInputValue(input);
        if (!value) {
            return;
        }
        changeProfitValue(entryPointsForm, exitPointsForm);
    });
};
const addProfitInputEventListener = (entryPointsForm, exitPointsForm) => {
    addInputBlurFocusEvents(currentPriceProfitInput);
    addProfitInputEvent(currentPriceProfitInput, entryPointsForm, exitPointsForm);
};
