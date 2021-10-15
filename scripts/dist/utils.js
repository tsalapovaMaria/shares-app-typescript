"use strict";
;
;
const countBoughtTotalPrice = (boughtRecords) => {
    return boughtRecords
        .map((record) => {
        return record.amount * record.price;
    })
        .reduce((prev, curr) => prev + curr, 0);
};
const countBoughtAmount = (boughtRecords) => {
    return boughtRecords
        .map((record) => record.amount)
        .reduce((prev, curr) => prev + curr, 0);
};
const countAverage = (boughtRecords) => {
    if (!boughtRecords) {
        return 0;
    }
    const totalPrice = countBoughtTotalPrice(boughtRecords);
    const amount = countBoughtAmount(boughtRecords);
    const result = totalPrice / amount;
    return Number.isNaN(result) ? 0 : result;
};
const leadAmountToValid = (enteredValue) => {
    const validValue = enteredValue.replace(/\s/g, "");
    return Number(validValue);
};
const leadPriceToValid = (enteredValue) => {
    const validValue = enteredValue.replace(/\s/g, "").replace(',', '.');
    return Number(validValue);
};
const readInputValue = (input) => {
    let value = (input.className.includes('price')) ? leadPriceToValid(input.value) : leadAmountToValid(input.value);
    if (value !== value || value === 0) {
        value = 0;
        input.value = '';
        return value;
    }
    input.value = value.toLocaleString();
    return value;
};
;
;
//1. функция, работающая с inputs
//2. функция, работающая со всеми остальными элементами
const defineElement = (element, elementProps, children) => {
    const { className, dataset, textContent } = elementProps;
    if (className) {
        element.className = className;
    }
    if (dataset) {
        element.dataset.currency = dataset;
    }
    if (textContent) {
        element.textContent = textContent;
    }
    if (children) {
        children.forEach(child => element.append(child));
    }
    return element;
};
const defineInputElement = (input, inputProps) => {
    const { className, placeholder, type, dataset, textContent } = inputProps;
    if (!(input instanceof HTMLButtonElement ||
        input instanceof HTMLInputElement)) {
        return;
    }
    if (type) {
        input.type = type;
    }
    if (className) {
        input.className = className;
    }
    if (textContent) {
        input.textContent = textContent;
    }
    if (dataset) {
        input.dataset.currency = dataset;
    }
    if (!(input instanceof HTMLInputElement)) {
        return;
    }
    if (placeholder) {
        input.placeholder = placeholder;
    }
    return input;
};
const createPseudoElement = (pseudoElement) => {
    const { input, className, textContent, top, left } = pseudoElement;
    const wrapperElement = input.parentElement;
    const element = document.createElement('span');
    if (className) {
        element.className = className;
    }
    if (textContent) {
        element.textContent = `${textContent}`;
    }
    if (top) {
        element.style.top = top;
    }
    if (left) {
        element.style.left = left;
    }
    wrapperElement === null || wrapperElement === void 0 ? void 0 : wrapperElement.append(element);
    element.addEventListener('click', (e) => {
        var _a;
        const target = e.target;
        if (!target.closest(`.${(_a = input.parentElement) === null || _a === void 0 ? void 0 : _a.className}`)) {
            return;
        }
        input.focus();
    });
    return element;
};
const removePseudoElement = (pseudoElement) => {
    const { input, className } = pseudoElement;
    if (!input.parentElement) {
        return;
    }
    const element = input.parentElement.querySelector(`.${className}`);
    if (element) {
        element.remove();
    }
};
//фильтр записей таблицы "Точки входа"
const getFilteredBoughtRecords = (boughtRecords, soldRecord) => {
    //берем элементы, чьи id меньше id точки выхода (покупки, приобретенные раньше продажи)
    const recordsBoughtEarlier = boughtRecords.filter(boughtRecord => boughtRecord.id < soldRecord.id);
    if (recordsBoughtEarlier.length === 0) {
        return [];
    }
    const recordsBoughtLater = boughtRecords.filter(boughtRecord => boughtRecord.id > soldRecord.id);
    let lastBoughtRecord = recordsBoughtEarlier[recordsBoughtEarlier.length - 1];
    const calculateAmountDifference = () => {
        let amountDifference = soldRecord.amount - lastBoughtRecord.amount;
        //количество продаж превышает количество покупок
        let isSalesExceedPurchases = amountDifference >= 0;
        return [amountDifference, isSalesExceedPurchases];
    };
    //разница в количестве продаж и покупок
    let [amountDifference, isSalesExceedPurchases] = calculateAmountDifference();
    //фильтр массива покупок до тех пор, пока
    //количество продаж soldRecord превышает количество покупок,
    //(которые были куплены до продажи soldRecord)
    while (isSalesExceedPurchases) {
        soldRecord.amount = amountDifference;
        recordsBoughtEarlier.pop();
        lastBoughtRecord = recordsBoughtEarlier[recordsBoughtEarlier.length - 1];
        if (!lastBoughtRecord) {
            break;
        }
        [amountDifference, isSalesExceedPurchases] = calculateAmountDifference();
    }
    //выйти из функции, если в boughtRecords не осталось значений
    if (!lastBoughtRecord) {
        return [];
    }
    if (amountDifference < 0) {
        soldRecord.amount = 0;
    }
    recordsBoughtEarlier[recordsBoughtEarlier.length - 1].amount = Math.abs(amountDifference);
    if (recordsBoughtLater.length !== 0) {
        return recordsBoughtEarlier.concat(recordsBoughtLater);
    }
    return recordsBoughtEarlier;
};
const addInputBlurFocusEvents = (input) => {
    const currencyClassName = 'current-price__currency';
    const symbolWidth = 9;
    const paddingLeft = 12;
    const spaceBetweenElements = 5;
    const top = 0;
    const addPseudoElement = () => {
        const inputLength = input.offsetWidth;
        const value = readInputValue(input);
        const inputValueLength = value.toLocaleString().length;
        const left = paddingLeft + inputValueLength * symbolWidth + spaceBetweenElements - inputLength;
        if (value === 0) {
            input.value = '';
            return;
        }
        const span = createPseudoElement({
            input: input,
            textContent: '',
            className: currencyClassName,
            top: top + 'px',
            left: left + 'px'
        });
        span.dataset.currency = currency;
    };
    input.addEventListener('blur', () => {
        addPseudoElement();
    });
    input.addEventListener('focus', () => {
        removePseudoElement({
            input: input,
            className: currencyClassName
        });
    });
};
