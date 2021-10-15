const amountToBuy = amountToBuyCounter();

const desiredPriceInput = <HTMLInputElement>document.querySelector('.desired-average-price-container__desired-price > .desired-price__input');
const currentPriceInput = <HTMLInputElement>document.querySelector('.desired-average-price-container__current-price > .current-price__input');

const checkInputsValidate = (): [number, number] => {
    const desiredPrice: number = readInputValue(desiredPriceInput);
    const currentPrice: number = readInputValue(currentPriceInput);

    if (desiredPrice === 0) {
        desiredPriceInput.value = '';
    }
    
    if (currentPrice === 0) {
        currentPriceInput.value = '';
    }

    if (!desiredPrice || !currentPrice) {
        return [0, 0];
    }
    return [desiredPrice, currentPrice];
};

const changeAmountToBuyValue = function (entryPointsForm: IForm, exitPointsForm: IForm): void {
    const userValuesEntered: [number, number] = checkInputsValidate();

    const isUserValuesZero = userValuesEntered.some((value: number) => value === 0);

    if (isUserValuesZero) {
        return;
    }

    const amountToBuyEl = <HTMLSpanElement>document.querySelector('.shares-amount__amount-output');
    const amountToBuyValue: number = amountToBuy.count(userValuesEntered, entryPointsForm, exitPointsForm);

    amountToBuyEl.textContent =
        (amountToBuyValue > 0 && Number.isFinite(amountToBuyValue)) ?
            `${Math.floor(amountToBuyValue).toLocaleString()} шт` :
            '0 шт';
};

const addPositionAveragingInputEvent = (input: HTMLInputElement, entryPointsForm: IForm, exitPointsForm: IForm): void => {
    input.addEventListener('input', () => {
        const value: number = readInputValue(input);
        if (!value) {
            return 0;
        }

        changeAmountToBuyValue(entryPointsForm, exitPointsForm);
    });
};

const addPosAveragingEvent = (entryPointsForm: IForm, exitPointsForm: IForm): void => {
    addInputBlurFocusEvents(desiredPriceInput);
    addPositionAveragingInputEvent(desiredPriceInput, entryPointsForm, exitPointsForm);

    addInputBlurFocusEvents(currentPriceInput);
    addPositionAveragingInputEvent(currentPriceInput, entryPointsForm, exitPointsForm);
};
