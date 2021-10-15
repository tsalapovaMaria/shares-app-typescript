const averagePrice = averagePriceCounter();
const profitPrice = profitPriceCounter();

const currentPriceProfitInput = <HTMLInputElement>document.querySelector('.tab01 .current-price__input');

const changeAmountPriceValue = (entryPointsForm: IForm, exitPointsForm: IForm): void => {
    const averagePriceValue = averagePrice.count(entryPointsForm, exitPointsForm);
    const outputElement = <HTMLSpanElement>document.querySelector('.average-output-price');

    outputElement.textContent = (Math.trunc(averagePriceValue * 100) / 100).toLocaleString();
};

const changeProfitValue = (entryPointsForm: IForm, exitPointsForm: IForm): void => {
    const profitEl = <HTMLSpanElement>document.querySelector('.profit-value');
    const value = readInputValue(currentPriceProfitInput);

    if (!value) {
        currentPriceProfitInput.textContent = '';
        return;
    }

    const profit = profitPrice.count(value, entryPointsForm, exitPointsForm);
    const profitClassName: string = 'profit-value';

    profitEl.textContent =
        (profit > 0) ? `+ ${profit.toLocaleString()}` :
        (profit === 0) ? `0` :
        `- ${Math.abs(profit).toLocaleString()}`;

    profitEl.className =
        (profit > 0) ? `${profitClassName} positive-profit` :
        (profit < 0) ? `${profitClassName} negative-profit` :
        profitClassName;
};


const addProfitInputEvent = (input: HTMLInputElement, entryPointsForm: IForm, exitPointsForm: IForm): void => {
    input.addEventListener('input', (): void => {
        const value = readInputValue(input);
        if (!value) {
            return;
        }

        changeProfitValue(entryPointsForm, exitPointsForm);
    });
};

const addProfitInputEventListener = (entryPointsForm: IForm, exitPointsForm: IForm): void => {
    addInputBlurFocusEvents(currentPriceProfitInput);
    addProfitInputEvent(currentPriceProfitInput, entryPointsForm, exitPointsForm);
};