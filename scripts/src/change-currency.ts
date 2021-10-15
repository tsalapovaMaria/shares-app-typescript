const inputElements: HTMLInputElement[] = Array.from(document.querySelectorAll('.items__wrapper > input[type=radio]'));
const currentCurrencyElement = <HTMLDivElement>document.querySelector('.current-container__value');
const tableSpanElements: HTMLSpanElement[] = Array.from(document.querySelectorAll('.price-container__currency'));

const changeCurrency = (inputValue: string): void => {
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

const changePlaceholderCurrency = (): void => {
    const changePlaceholder = (value: number, input: HTMLInputElement) => {
        input.placeholder = `${value} ${currency}`;
    }
    const priceInputs: HTMLInputElement[] = Array.from(document.querySelectorAll('.price-container__input'));

    priceInputs.forEach(
        input => {
            changePlaceholder(0, input);
        }
    );

    const priceInputAverage: HTMLInputElement[] = Array.from(document.querySelectorAll('.current-price__input'));
    priceInputAverage.forEach(
        input => {
            changePlaceholder(200, input);
        }
    );

    const desiredPriceInput = <HTMLInputElement>document.querySelector('.desired-price__input');
    changePlaceholder(205, desiredPriceInput);
};

const changeCurrencyElements = (): void => {
    const currencyElements: HTMLElement[] = Array.from(document.querySelectorAll('[data-currency]'));

    currencyElements.forEach(
        element => {
            element.dataset.currency = currency;
        }
    );
};

const changePriceInputs = (): void => {
    tableSpanElements.forEach(
        span => {
            span.dataset.currency = currency;
        }
    );
};

Array.from(inputElements).forEach((input): void => {
    input.addEventListener('change', (): void => {
        if (!input.checked) {
            return;
        }
        changeCurrency(input.value);

        currentCurrencyElement.textContent = input.value.toUpperCase();

        changePlaceholderCurrency();
        changeCurrencyElements();
        changePriceInputs();
    })
});