"use strict";
;
;
const renderForm = () => {
    //изменение поведения кнопки "Добавить"
    const changeBtnBehavior = (input) => {
        const inputContainer = input.parentElement;
        const inputSiblingContainer = (inputContainer.nextElementSibling) ?
            inputContainer.nextElementSibling :
            inputContainer.previousElementSibling;
        const inputSibling = inputSiblingContainer.querySelector('INPUT');
        const formContainer = inputContainer.parentElement;
        const value = (input.className.includes('price')) ?
            leadPriceToValid(input.value) :
            leadAmountToValid(input.value);
        const siblingValue = (inputSibling.className.includes('price')) ?
            leadPriceToValid(inputSibling.value) :
            leadAmountToValid(inputSibling.value);
        if (!formContainer.nextElementSibling) {
            return;
        }
        const isUnderZero = (value < 0) && (siblingValue < 0);
        const isZero = (value === 0) || (siblingValue === 0);
        const isValueNaN = value !== value;
        const isSiblingValueNaN = siblingValue !== siblingValue;
        const addRowBtn = formContainer.nextElementSibling.querySelector('.btn-container__btn-add');
        addRowBtn.disabled = isUnderZero || isZero || isValueNaN || isSiblingValueNaN;
    };
    // функции для создания названия формы
    const createFormTitle = (title) => {
        const titleElement = document.createElement('H2');
        return defineElement(titleElement, {
            textContent: title,
            className: 'shares-article__title'
        });
    };
    //функции для создания колонок в шапке таблицы
    const colClassName = 'shares-header__col-title';
    const createAmountHead = (col_1) => {
        const amountColClassName = 'shares-header__amount';
        const amountThDiv = document.createElement('DIV');
        defineElement(amountThDiv, {
            textContent: col_1
        });
        const th = document.createElement('TH');
        defineElement(th, {
            className: `${colClassName} ${amountColClassName}`
        }, [amountThDiv]);
        return th;
    };
    const createPriceHead = (col_2) => {
        const priceColClassName = 'shares-header__price';
        const priceThDiv = document.createElement('DIV');
        defineElement(priceThDiv, {
            textContent: col_2
        });
        const th = document.createElement('TH');
        defineElement(th, {
            className: `${colClassName} ${priceColClassName}`
        }, [priceThDiv]);
        return th;
    };
    const createTotalPriceHead = (col_3) => {
        const totalPriceColClassName = 'shares-header__total-price';
        const totalPriceThDiv = document.createElement('DIV');
        defineElement(totalPriceThDiv, {
            textContent: col_3
        });
        const th = document.createElement('TH');
        defineElement(th, {
            className: `${colClassName} ${totalPriceColClassName}`
        }, [totalPriceThDiv]);
        return th;
    };
    const createBtnHead = () => {
        const th = document.createElement('TH');
        defineElement(th, {
            className: `${colClassName} shares-header__delete-btn`
        });
        return th;
    };
    //функции для создания шапки таблицы
    const createThRow = ({ amountTh, priceTh, totalPriceTh, btnTh }) => {
        const tr = document.createElement('TR');
        defineElement(tr, {
            className: 'shares-table__shares-header'
        }, [amountTh, priceTh, totalPriceTh, btnTh]);
        return tr;
    };
    const createThead = (thRow) => {
        const thead = document.createElement('THEAD');
        defineElement(thead, {}, [thRow]);
        return thead;
    };
    const setThRow = (col_1, col_2, col_3) => {
        const amountTh = createAmountHead(col_1);
        const priceTh = createPriceHead(col_2);
        const totalPriceTh = createTotalPriceHead(col_3);
        const btnTh = createBtnHead();
        return createThRow({
            amountTh: amountTh,
            priceTh: priceTh,
            totalPriceTh: totalPriceTh,
            btnTh: btnTh
        });
    };
    const setThead = (col_1, col_2, col_3) => {
        const row = setThRow(col_1, col_2, col_3);
        return createThead(row);
    };
    //функция для создания элемента, указывающего на отсутствие строк в таблице
    const createNoShoppingElement = (textContent) => {
        const noShoppingElement = document.createElement('DIV');
        defineElement(noShoppingElement, {
            className: 'table-is-empty',
            textContent: textContent
        });
        return noShoppingElement;
    };
    //функции для создания тела таблицы
    const createTableBody = (noShoppingEl) => {
        const tbody = document.createElement('TBODY');
        defineElement(tbody, {
            className: 'empty-table'
        }, [noShoppingEl]);
        return tbody;
    };
    //функции для создания таблицы
    const createTable = (tHead, tBody) => {
        const table = document.createElement('TABLE');
        defineElement(table, {
            className: 'table-container__shares-table'
        }, [tHead, tBody]);
        return table;
    };
    //функция для создания контейнера, содержащего таблицу
    const createTableContainer = (table) => {
        const tableContainer = document.createElement('DIV');
        defineElement(tableContainer, {
            className: 'shares-container__table-container'
        }, [table]);
        return tableContainer;
    };
    //функции для создания формы ввода пользователем количества покупок/продаж
    //функции для создания кнопки "+" (увеличение количества)
    const createMoreAmountBtn = () => {
        const moreAmountBtn = document.createElement('BUTTON');
        defineInputElement(moreAmountBtn, {
            className: 'btns__add-btn',
            type: 'button'
        });
        return moreAmountBtn;
    };
    //функция для создания события кнопке
    const moreAmountBtnsEventListener = (moreAmountBtn, formContainer) => {
        const symbolWidth = 9;
        const paddingLeft = 20;
        const spaceBetweenElements = 5;
        const amountClassName = 'amount-container__amounts';
        const amountInputClassName = 'amount-container__input';
        moreAmountBtn.addEventListener('click', () => {
            const input = formContainer.querySelector(`.${amountInputClassName}`);
            const value = leadAmountToValid(input.value);
            const inputValueLength = input.value.length;
            input.value = (value + 1).toLocaleString();
            changeBtnBehavior(input);
            removePseudoElement({
                input: input,
                className: amountClassName
            });
            createPseudoElement({
                input: input,
                textContent: 'шт',
                className: amountClassName,
                top: '8px',
                left: paddingLeft + inputValueLength * symbolWidth + spaceBetweenElements + 'px'
            });
        });
    };
    //функция для создания кнопки "-" (уменьшение количества)
    const createLessAmountBtn = () => {
        const lessBtnClassName = 'btns__remove-btn';
        const lessAmountBtn = document.createElement('BUTTON');
        defineInputElement(lessAmountBtn, {
            className: lessBtnClassName,
            type: 'button'
        });
        return lessAmountBtn;
    };
    //функция для создания события кнопке
    const lessAmountBtnsEventListener = (lessAmountBtn, formContainer) => {
        const symbolWidth = 9;
        const paddingLeft = 17;
        const spaceBetweenElements = 5;
        const amountClassName = 'amount-container__amounts';
        const amountInputClassName = 'amount-container__input';
        lessAmountBtn.addEventListener('click', () => {
            const input = formContainer.querySelector(`.${amountInputClassName}`);
            const value = leadAmountToValid(input.value);
            if (value === 1 || value === 0) {
                return;
            }
            const inputValueLength = input.value.length;
            input.value = (value - 1).toLocaleString();
            changeBtnBehavior(input);
            removePseudoElement({
                input: input,
                className: amountClassName
            });
            createPseudoElement({
                input: input,
                textContent: 'шт',
                className: amountClassName,
                top: '8px',
                left: paddingLeft + inputValueLength * symbolWidth + spaceBetweenElements + 'px'
            });
        });
    };
    const createBtnsContainer = (lessAmountBtn, moreAmountBtn) => {
        const btnsContainerClassName = 'amount-container__btns';
        const btnsContainer = document.createElement('DIV');
        defineElement(btnsContainer, {
            className: btnsContainerClassName
        }, [lessAmountBtn, moreAmountBtn]);
        return btnsContainer;
    };
    //функции для создания поля ввода количества    
    const createAmountInput = () => {
        const amountInputClassName = 'amount-container__input';
        const amountInput = document.createElement('INPUT');
        defineInputElement(amountInput, {
            type: 'text',
            className: amountInputClassName,
            placeholder: '0 шт'
        });
        amountInput.required = true;
        return amountInput;
    };
    //создание событий для input "количества"
    const priceInputClassName = 'price-container__input';
    const createAmountSpan = (input, { top, left, textContent, className, }) => {
        readInputValue(input);
        const span = createPseudoElement({
            input: input,
            textContent: textContent,
            className: className,
            top: top + 'px',
            left: left + 'px'
        });
        if (input.className === priceInputClassName) {
            span.dataset.currency = currency;
        }
        return span;
    };
    const focusInput = (input, className) => {
        removePseudoElement({
            input: input,
            className: className
        });
    };
    const transparentClick = (e, input, className) => {
        const target = e.target;
        if (!target.closest(`.${className}`)) {
            return;
        }
        input.focus();
    };
    const spanEventListener = (span, input, containerClassName) => {
        if (!span) {
            return;
        }
        span.addEventListener('click', (e) => transparentClick(e, input, containerClassName));
    };
    const amountInputEventListeners = (input) => {
        const amountClassName = 'amount-container__amounts';
        const symbolWidth = 9;
        const paddingLeft = 17;
        const spaceBetweenElements = 5;
        const top = 8;
        input.addEventListener('blur', () => {
            const value = readInputValue(input);
            if (value === 0) {
                input.value = '';
                return;
            }
            const inputValueLength = String(value).length;
            const left = paddingLeft + inputValueLength * symbolWidth + spaceBetweenElements;
            const span = createAmountSpan(input, {
                top: top,
                left: left,
                className: amountClassName,
                textContent: 'шт'
            });
            const containerClassName = 'shares-form-inputs__amount-container';
            spanEventListener(span, input, containerClassName);
        });
        input.addEventListener('focus', () => {
            focusInput(input, amountClassName);
        });
        input.addEventListener('input', () => {
            changeBtnBehavior(input);
        });
    };
    //функция для создания контейнера формы "количество"
    const createAmountContainer = (input, btnsContainer) => {
        const amountContainerClassName = 'shares-form-inputs__amount-container';
        const amountContainer = document.createElement('DIV');
        defineElement(amountContainer, {
            className: amountContainerClassName
        }, [input, btnsContainer]);
        return amountContainer;
    };
    //функция создания поля ввода стоимости
    const createPriceInput = () => {
        const priceInputClassName = 'price-container__input';
        const priceInput = document.createElement('INPUT');
        defineInputElement(priceInput, {
            type: 'text',
            className: priceInputClassName,
            placeholder: '0 $'
        });
        return priceInput;
    };
    const createPriceContainer = (input) => {
        const priceContainerClassName = 'shares-form-inputs__price-container';
        const priceContainer = document.createElement('DIV');
        defineElement(priceContainer, {
            className: priceContainerClassName
        }, [input]);
        return priceContainer;
    };
    //добавление обработчиков для поля ввода стоимости
    const priceInputEventListener = (input) => {
        const priceClassName = 'price-container__currency';
        const symbolWidth = 9;
        const top = 0;
        input.addEventListener('blur', () => {
            const inputLength = input.offsetWidth;
            const value = readInputValue(input);
            if (value === 0) {
                input.value = '';
                return;
            }
            const inputValueLength = input.value.length;
            const left = (inputValueLength * symbolWidth) / 2 - inputLength / 2;
            const span = createAmountSpan(input, {
                top: top,
                left: left,
                textContent: '',
                className: priceClassName
            });
            const containerClassName = 'shares-form-inputs__price-container';
            spanEventListener(span, input, containerClassName);
        });
        input.addEventListener('focus', () => {
            focusInput(input, priceClassName);
        });
        input.addEventListener('input', () => {
            changeBtnBehavior(input);
        });
    };
    //функция создания контейнера для полей ввода
    const createFormInputs = (amountContainer, priceContainer) => {
        const formInputsClassName = 'shares-form__shares-form-inputs';
        const formInputs = document.createElement('DIV');
        defineElement(formInputs, {
            className: formInputsClassName
        }, [amountContainer, priceContainer]);
        return formInputs;
    };
    //функция создания кнопки "Добавить"
    const createAddBtn = () => {
        const addRowBtnClassName = 'btn-container__btn-add';
        const addBtn = document.createElement('BUTTON');
        defineInputElement(addBtn, {
            className: addRowBtnClassName,
            type: 'submit',
            textContent: 'Добавить'
        });
        addBtn.disabled = true;
        return addBtn;
    };
    //функция создания контейнера для кнопки
    const createAddBtnContainer = (btn) => {
        const btnContainerClassName = 'shares-form__btn-container';
        const btnContainer = document.createElement('DIV');
        defineElement(btnContainer, {
            className: btnContainerClassName
        }, [btn]);
        return btnContainer;
    };
    const clickAddBtn = ({ article, form, container, tbody, amountInput, priceInput, noShoppingElText }) => {
        const rowClassName = 'shares-table__shares-item';
        const amount = leadAmountToValid(amountInput.value);
        const price = leadPriceToValid(priceInput.value);
        const trId = form.addRecord(amount, price);
        const totalPrice = amount * price;
        const tr = createTableRow(trId, form, tbody, amount, price, totalPrice, noShoppingElText);
        const noShoppingEl = article.querySelector('.table-is-empty');
        if (noShoppingEl) {
            noShoppingEl.remove();
        }
        tbody.append(tr);
        // использование setTimeout для анимации 
        // появления элемента
        setTimeout(() => {
            tr.className = rowClassName;
        }, 0);
        //очистка форм после добавления новой строки
        amountInput.value = '';
        priceInput.value = '';
        const currencyEl = container.querySelector('.price-container__currency');
        const amountEl = container.querySelector('.amount-container__amounts');
        amountEl.remove();
        currencyEl.remove();
    };
    ;
    const addBtnEventListener = ({ article, form, deleteRowBtn, container, tbody, amountInput, priceInput, noShoppingElText }) => {
        deleteRowBtn.addEventListener('click', () => {
            clickAddBtn({
                article: article,
                form: form,
                container: container,
                tbody: tbody,
                amountInput: amountInput,
                priceInput: priceInput,
                noShoppingElText: noShoppingElText
            });
            deleteRowBtn.disabled = true;
        });
    };
    //функция создания контейнера формы
    const createFormContainer = (formInputs, btnContainer) => {
        const formSharesClassName = 'shares-form-container__shares-form';
        const formShare = document.createElement('DIV');
        defineElement(formShare, {
            className: formSharesClassName
        }, [formInputs, btnContainer]);
        return formShare;
    };
    // функция создания контейнера формы
    const createFormShareContainer = (formContainer) => {
        const shareFormClassName = 'shares-container__shares-form-container';
        const formShareContainer = document.createElement('DIV');
        defineElement(formShareContainer, {
            className: shareFormClassName
        }, [formContainer]);
        return formShareContainer;
    };
    //функция создания контейнера для таблицы и контейнера формы
    const createSharesContainer = (tableContainer, shareFormContainer) => {
        const containerClassName = 'shares-article__shares-container';
        const sharesContainer = document.createElement('DIV');
        defineElement(sharesContainer, {
            className: containerClassName
        }, [tableContainer, shareFormContainer]);
        return sharesContainer;
    };
    //функция создания обёртки для всей формы
    const createArticle = (formTitle, sharesContainer) => {
        const articeClassName = 'shares-section__shares-article';
        const article = document.createElement('DIV');
        defineElement(article, {
            className: articeClassName
        }, [formTitle, sharesContainer]);
        return article;
    };
    //ФУНКЦИИ ДЛЯ СОЗДАНИЯ НОВОЙ СТРОКИ В ТАБЛИЦЕ
    const createCellSpan = (value) => {
        const valueString = value.toLocaleString();
        const cellSpan = document.createElement('SPAN');
        defineElement(cellSpan, {
            textContent: valueString
        });
        return cellSpan;
    };
    const createDeleteRowBtn = (span) => {
        const btnClassName = 'btn-container__delete-btn';
        const deleteRowBtn = document.createElement('BUTTON');
        defineElement(deleteRowBtn, {
            className: btnClassName
        }, [span]);
        return deleteRowBtn;
    };
    ;
    const deleteRowBtnClick = ({ trId, form, tr, tbody, textContent }) => {
        const removedRowClassName = 'shares-table__shares-item-remove';
        form.removeRecord(trId);
        const tbodyWidth = tbody.offsetWidth;
        tr.className += ` ${removedRowClassName}`;
        setTimeout(() => {
            tr.remove();
            // ЕСЛИ в таблице нет данных (пусто)
            // ТОГДА добавить новый элемент, указывающий, что таблица пуста
            if (tbody.children.length !== 0) {
                return;
            }
            const noShoppingEl = createNoShoppingElement(textContent);
            noShoppingEl.style.left = tbodyWidth / 2 - noShoppingEl.offsetWidth / 2 + 'px';
            tbody.append(noShoppingEl);
        }, 250);
    };
    ;
    const deleteRowBtnEventListener = ({ trId, form, tr, tbody, textContent, deleteRowBtn }) => {
        deleteRowBtn.addEventListener('click', () => deleteRowBtnClick({ trId, form, tr, tbody, textContent }));
    };
    const createTableDiv = (tdClassName, currentTdClassName, span) => {
        const td = document.createElement('TD');
        defineElement(td, {
            className: `${tdClassName} ${currentTdClassName}`
        }, [span]);
        return td;
    };
    const createTableRow = (trId, form, tbody, amount, price, totalPrice, textContent) => {
        const trClassName = 'shares-table__shares-item-add';
        const tdClassName = 'shares-item__value';
        const amountTdClassName = 'shares-item__amount';
        const priceTdClassName = 'shares-item__price';
        const totalPriceTdClassName = 'shares-item__total-price';
        const deleteRowBtnTdClassName = 'shares-item__btn-container';
        const amountSpan = createCellSpan(amount);
        const priceSpan = createCellSpan(price);
        priceSpan.dataset.currency = currency;
        const totalPriceSpan = createCellSpan(totalPrice);
        totalPriceSpan.dataset.currency = currency;
        const deleteRowBtnSpan = document.createElement('SPAN');
        deleteRowBtnSpan.innerHTML = '&#x2715';
        const deleteRowBtn = createDeleteRowBtn(deleteRowBtnSpan);
        const amountTd = createTableDiv(tdClassName, amountTdClassName, amountSpan);
        const priceTd = createTableDiv(tdClassName, priceTdClassName, priceSpan);
        const totalPriceTd = createTableDiv(tdClassName, totalPriceTdClassName, totalPriceSpan);
        const deleteRowBtnTd = createTableDiv(tdClassName, deleteRowBtnTdClassName, deleteRowBtn);
        const tr = document.createElement('TR');
        defineElement(tr, {
            className: trClassName
        }, [amountTd, priceTd, totalPriceTd, deleteRowBtnTd]);
        deleteRowBtnEventListener({ trId, form, tr, tbody, deleteRowBtn, textContent });
        return tr;
    };
    return {
        createForm: (title, { col_1, col_2, col_3 }, mountEl, form) => {
            const tHead = setThead(col_1, col_2, col_3);
            const noShoppingElText = title === 'Точки входа' ? 'нет покупок' : 'нет продаж';
            const noShoppingEl = createNoShoppingElement(noShoppingElText);
            const tBody = createTableBody(noShoppingEl);
            const table = createTable(tHead, tBody);
            const tableContainer = createTableContainer(table);
            const moreAmountBtn = createMoreAmountBtn();
            const lessAmountBtn = createLessAmountBtn();
            const amountBtnsContainer = createBtnsContainer(lessAmountBtn, moreAmountBtn);
            const amountInput = createAmountInput();
            const amountContainer = createAmountContainer(amountInput, amountBtnsContainer);
            const priceInput = createPriceInput();
            const priceContainer = createPriceContainer(priceInput);
            const formInputs = createFormInputs(amountContainer, priceContainer);
            const addBtn = createAddBtn();
            const btnContainer = createAddBtnContainer(addBtn);
            const formContainer = createFormContainer(formInputs, btnContainer);
            moreAmountBtnsEventListener(moreAmountBtn, formContainer);
            lessAmountBtnsEventListener(lessAmountBtn, formContainer);
            amountInputEventListeners(amountInput);
            priceInputEventListener(priceInput);
            const shareFormContainer = createFormShareContainer(formContainer);
            const sharesContainer = createSharesContainer(tableContainer, shareFormContainer);
            const formTitle = createFormTitle(title);
            const article = createArticle(formTitle, sharesContainer);
            addBtnEventListener({
                article: article,
                form: form,
                deleteRowBtn: addBtn,
                container: formContainer,
                tbody: tBody,
                amountInput: amountInput,
                priceInput: priceInput,
                noShoppingElText: noShoppingElText
            });
            mountEl.append(article);
            noShoppingEl.style.left = tBody.offsetWidth / 2 - noShoppingEl.offsetWidth / 2 + 'px';
            return article;
        }
    };
};
