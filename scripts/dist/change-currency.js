"use strict";
const inputElements = Array.from(document.querySelectorAll('.items__wrapper > input[type=radio]'));
const currentCurrencyElement = document.querySelector('.current-container__value');
const tableSpanElements = Array.from(document.querySelectorAll('.price-container__currency'));
const changeCurrency = (inputValue) => {
    switch (inputValue) {
        case 'usd':
            currency = '$';
            break;
        case 'eur':
            currency = '€';
            break;
        case 'rub':
            currency = '₽';
            break;
    }
};
const changePlaceholderCurrency = () => {
    const changePlaceholder = (value, input) => {
        input.placeholder = `${value} ${currency}`;
    };
    const priceInputs = Array.from(document.querySelectorAll('.price-container__input'));
    priceInputs.forEach(input => {
        changePlaceholder(0, input);
    });
    const priceInputAverage = Array.from(document.querySelectorAll('.current-price__input'));
    priceInputAverage.forEach(input => {
        changePlaceholder(200, input);
    });
    const desiredPriceInput = document.querySelector('.desired-price__input');
    changePlaceholder(205, desiredPriceInput);
};
const changeCurrencyElements = () => {
    const currencyElements = Array.from(document.querySelectorAll('[data-currency]'));
    currencyElements.forEach(element => {
        element.dataset.currency = currency;
    });
};
const changePriceInputs = () => {
    tableSpanElements.forEach(span => {
        span.dataset.currency = currency;
    });
};
Array.from(inputElements).forEach((input) => {
    input.addEventListener('change', () => {
        if (!input.checked) {
            return;
        }
        changeCurrency(input.value);
        currentCurrencyElement.textContent = input.value.toUpperCase();
        changePlaceholderCurrency();
        changeCurrencyElements();
        changePriceInputs();
    });
});
