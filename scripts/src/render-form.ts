interface ICreateForm {
    col_1: string,
    col_2: string,
    col_3: string
};
interface IRenderForm {
    createForm: (title: string, colsTitle: ICreateForm, mountEl: HTMLDivElement, form: IForm) => HTMLDivElement;
};

const renderForm = (): IRenderForm => {
    //изменение поведения кнопки "Добавить"
    const changeBtnBehavior = (input: HTMLInputElement): void => {
        const inputContainer = <HTMLDivElement>input.parentElement;

        const inputSiblingContainer = (inputContainer.nextElementSibling) ?
            <HTMLDivElement>inputContainer.nextElementSibling :
            <HTMLDivElement>inputContainer.previousElementSibling;

        const inputSibling = <HTMLInputElement>inputSiblingContainer.querySelector('INPUT');
        const formContainer = <HTMLDivElement>inputContainer.parentElement;

        const value: number = (input.className.includes('price')) ?
            leadPriceToValid(input.value) :
            leadAmountToValid(input.value);
        const siblingValue: number = (inputSibling.className.includes('price')) ?
            leadPriceToValid(inputSibling.value) :
            leadAmountToValid(inputSibling.value);

        if (!formContainer.nextElementSibling) {
            return;
        }

        const isUnderZero = (value < 0) && (siblingValue < 0);
        const isZero = (value === 0) || (siblingValue === 0);
        const isValueNaN = value !== value;
        const isSiblingValueNaN = siblingValue !== siblingValue;

        const addRowBtn = <HTMLButtonElement>formContainer.nextElementSibling.querySelector('.btn-container__btn-add');
        addRowBtn.disabled = isUnderZero || isZero || isValueNaN || isSiblingValueNaN;
    };

    // функции для создания названия формы
    const createFormTitle = (title: string): HTMLTitleElement => {
        const titleElement = <HTMLTitleElement>document.createElement('H2');
        return <HTMLTitleElement>defineElement(titleElement, {
            textContent: title,
            className: 'shares-article__title'
        });
    };

    //функции для создания колонок в шапке таблицы
    const colClassName: string = 'shares-header__col-title';

    const createAmountHead = (col_1: string): HTMLTableHeaderCellElement => {
        const amountColClassName: string = 'shares-header__amount';

        const amountThDiv = <HTMLDivElement>document.createElement('DIV');
        defineElement(amountThDiv, {
            textContent: col_1
        });

        const th = <HTMLTableHeaderCellElement>document.createElement('TH');
        defineElement(th, {
            className: `${colClassName} ${amountColClassName}`
        }, [amountThDiv]);
        return th;
    };

    const createPriceHead = (col_2: string): HTMLTableHeaderCellElement => {
        const priceColClassName: string = 'shares-header__price';

        const priceThDiv = <HTMLDivElement>document.createElement('DIV')
        defineElement(priceThDiv, {
            textContent: col_2
        });

        const th = <HTMLTableHeaderCellElement>document.createElement('TH');
        defineElement(th, {
            className: `${colClassName} ${priceColClassName}`
        }, [priceThDiv]);

        return th;
    };

    const createTotalPriceHead = (col_3: string): HTMLTableHeaderCellElement => {
        const totalPriceColClassName: string = 'shares-header__total-price';

        const totalPriceThDiv = <HTMLDivElement>document.createElement('DIV')
        defineElement(totalPriceThDiv, {
            textContent: col_3
        });

        const th = <HTMLTableHeaderCellElement>document.createElement('TH');
        defineElement(th, {
            className: `${colClassName} ${totalPriceColClassName}`
        }, [totalPriceThDiv]);

        return th;
    };

    const createBtnHead = (): HTMLTableHeaderCellElement => {
        const th = <HTMLTableHeaderCellElement>document.createElement('TH');
        defineElement(th, {
            className: `${colClassName} shares-header__delete-btn`
        });

        return th;
    };

    interface IThCells {
        amountTh: HTMLTableHeaderCellElement;
        priceTh: HTMLTableHeaderCellElement;
        totalPriceTh: HTMLTableHeaderCellElement;
        btnTh: HTMLTableHeaderCellElement;
    } 

    //функции для создания шапки таблицы
    const createThRow = ({
        amountTh,
        priceTh,
        totalPriceTh,
        btnTh
    }: IThCells): HTMLTableRowElement => {
        const tr = <HTMLTableRowElement>document.createElement('TR');
        defineElement(tr, {
            className: 'shares-table__shares-header'
        }, [amountTh, priceTh, totalPriceTh, btnTh]);

        return tr;
    };

    const createThead = (thRow: HTMLTableRowElement): HTMLElement => {
        const thead = document.createElement('THEAD');
        defineElement(thead, {}, [thRow]);

        return thead;
    };

    const setThRow = (col_1: string, col_2: string, col_3: string): HTMLTableRowElement => {
        const amountTh: HTMLTableHeaderCellElement = createAmountHead(col_1);
        const priceTh: HTMLTableHeaderCellElement = createPriceHead(col_2);
        const totalPriceTh: HTMLTableHeaderCellElement = createTotalPriceHead(col_3);
        const btnTh: HTMLTableHeaderCellElement = createBtnHead();

        return createThRow({
            amountTh: amountTh,
            priceTh: priceTh,
            totalPriceTh: totalPriceTh,
            btnTh: btnTh
        });
    };

    const setThead = (col_1: string, col_2: string, col_3: string): HTMLElement => {
        const row  = setThRow(col_1, col_2, col_3);
        return createThead(row);
    };

    //функция для создания элемента, указывающего на отсутствие строк в таблице
    const createNoShoppingElement = (textContent: string): HTMLDivElement => {
        const noShoppingElement = <HTMLDivElement>document.createElement('DIV');
        defineElement(noShoppingElement, {
            className: 'table-is-empty',
            textContent: textContent
        });
        return noShoppingElement;
    };

    //функции для создания тела таблицы
    const createTableBody = (noShoppingEl: HTMLDivElement): HTMLElement => {
        const tbody = <HTMLElement>document.createElement('TBODY');

        defineElement(tbody, {
            className: 'empty-table'
        }, [noShoppingEl]);

        return tbody;
    };

    //функции для создания таблицы
    const createTable = (tHead: HTMLElement, tBody: HTMLElement): HTMLTableElement => {
        const table = <HTMLTableElement>document.createElement('TABLE');
        defineElement(table, {
            className: 'table-container__shares-table'
        }, [tHead, tBody]);

        return table;
    };

    //функция для создания контейнера, содержащего таблицу
    const createTableContainer = (table: HTMLTableElement): HTMLDivElement => {
        const tableContainer = <HTMLDivElement>document.createElement('DIV');
        defineElement(tableContainer, {
            className: 'shares-container__table-container'
        }, [table]);

        return tableContainer;
    };

    //функции для создания формы ввода пользователем количества покупок/продаж

    //функции для создания кнопки "+" (увеличение количества)
    const createMoreAmountBtn = (): HTMLButtonElement => {
        const moreAmountBtn = <HTMLButtonElement>document.createElement('BUTTON');
        defineInputElement(moreAmountBtn, {
            className: 'btns__add-btn',
            type: 'button'
        });

        return moreAmountBtn;
    };

    //функция для создания события кнопке
    const moreAmountBtnsEventListener = (
        moreAmountBtn: HTMLButtonElement,
        formContainer: HTMLDivElement
    ): void => {
        const symbolWidth: number = 9;
        const paddingLeft: number = 20;
        const spaceBetweenElements: number = 5;
        const amountClassName: string = 'amount-container__amounts';
        const amountInputClassName: string = 'amount-container__input';

        moreAmountBtn.addEventListener('click', () => {
            const input = <HTMLInputElement>formContainer.querySelector(`.${amountInputClassName}`);

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
    const createLessAmountBtn = (): HTMLButtonElement => {
        const lessBtnClassName: string = 'btns__remove-btn';

        const lessAmountBtn = <HTMLButtonElement>document.createElement('BUTTON');

        defineInputElement(lessAmountBtn, {
            className: lessBtnClassName,
            type: 'button'
        });

        return lessAmountBtn;
    };

    //функция для создания события кнопке
    const lessAmountBtnsEventListener = (
        lessAmountBtn: HTMLButtonElement,
        formContainer: HTMLDivElement
    ): void => {
        const symbolWidth: number = 9;
        const paddingLeft: number = 17;
        const spaceBetweenElements: number = 5;

        const amountClassName: string = 'amount-container__amounts';
        const amountInputClassName: string = 'amount-container__input';
        lessAmountBtn.addEventListener('click', (): void => {
            const input = <HTMLInputElement>formContainer.querySelector(`.${amountInputClassName}`);

            const value: number = leadAmountToValid(input.value);
            if (value === 1 || value === 0) {
                return;
            }
            const inputValueLength: number = input.value.length;

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

    const createBtnsContainer = (
        lessAmountBtn: HTMLButtonElement,
        moreAmountBtn: HTMLButtonElement
    ): HTMLDivElement => {
        const btnsContainerClassName: string = 'amount-container__btns';
        const btnsContainer = <HTMLDivElement>document.createElement('DIV');

        defineElement(btnsContainer, {
            className: btnsContainerClassName
        }, [lessAmountBtn, moreAmountBtn]);

        return btnsContainer;
    };

    //функции для создания поля ввода количества    
    const createAmountInput = (): HTMLInputElement => {
        const amountInputClassName: string = 'amount-container__input';

        const amountInput = <HTMLInputElement>document.createElement('INPUT');
        defineInputElement(amountInput, {
            type: 'text',
            className: amountInputClassName,
            placeholder: '0 шт'
        });

        amountInput.required = true;
        return amountInput;
    };

    //создание событий для input "количества"
    const priceInputClassName: string = 'price-container__input';

    interface IInputAttributes {
        top: number;
        left: number;
        textContent: string;
        className: string;
    }

    const createAmountSpan = (input: HTMLInputElement, {
        top,
        left,
        textContent,
        className,
    }: IInputAttributes): HTMLSpanElement => {
        readInputValue(input);
        const span: HTMLSpanElement = createPseudoElement({
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
    const focusInput = (input: HTMLInputElement, className: string): void => {
        removePseudoElement({
            input: input,
            className: className
        });
    };

    const transparentClick = (
        e: Event,
        input: HTMLInputElement,
        className: string
    ): void => {
        const target = <HTMLElement>e.target;

        if (!target.closest(`.${className}`)) {
            return;
        }
        input.focus();
    };

    const spanEventListener = (
        span: HTMLSpanElement,
        input: HTMLInputElement,
        containerClassName: string
    ): void => {
        if (!span) {
            return;
        }
        span.addEventListener('click', (e) => transparentClick(e, input, containerClassName));
    };

    const amountInputEventListeners = (input: HTMLInputElement): void => {
        const amountClassName: string = 'amount-container__amounts';

        const symbolWidth: number = 9;
        const paddingLeft: number = 17;
        const spaceBetweenElements: number = 5;

        const top: number = 8;

        input.addEventListener('blur', (): void => {
            const value: number = readInputValue(input);

            if (value === 0) {
                input.value = '';
                return;
            }

            const inputValueLength = String(value).length;
            const left = paddingLeft + inputValueLength * symbolWidth + spaceBetweenElements;

            const span: HTMLSpanElement = createAmountSpan(input, {
                top: top,
                left: left,
                className: amountClassName,
                textContent: 'шт'
            });

            const containerClassName: string = 'shares-form-inputs__amount-container';
            spanEventListener(span, input, containerClassName);
        });

        input.addEventListener('focus', (): void => {
            focusInput(input, amountClassName);
        });

        input.addEventListener('input', (): void => {
            changeBtnBehavior(input);
        });
    };

    //функция для создания контейнера формы "количество"
    const createAmountContainer = (
        input: HTMLInputElement,
        btnsContainer: HTMLDivElement
    ): HTMLDivElement => {
        const amountContainerClassName: string = 'shares-form-inputs__amount-container';

        const amountContainer = <HTMLDivElement>document.createElement('DIV');

        defineElement(amountContainer, {
            className: amountContainerClassName
        }, [input, btnsContainer]);

        return amountContainer;
    };

    //функция создания поля ввода стоимости
    const createPriceInput = (): HTMLInputElement => {
        const priceInputClassName: string = 'price-container__input';

        const priceInput = <HTMLInputElement>document.createElement('INPUT');

        defineInputElement(priceInput, {
            type: 'text',
            className: priceInputClassName,
            placeholder: '0 $'
        });

        return priceInput;
    };

    const createPriceContainer = (input: HTMLInputElement): HTMLDivElement => {
        const priceContainerClassName: string = 'shares-form-inputs__price-container';

        const priceContainer = <HTMLInputElement>document.createElement('DIV');

        defineElement(priceContainer, {
            className: priceContainerClassName
        }, [input]);

        return priceContainer;
    };

    //добавление обработчиков для поля ввода стоимости
    const priceInputEventListener = (input: HTMLInputElement): void => {
        const priceClassName: string = 'price-container__currency';
        const symbolWidth: number = 9;

        const top: number = 0;

        input.addEventListener('blur', (): void => {
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
            const containerClassName: string = 'shares-form-inputs__price-container';
            spanEventListener(span, input, containerClassName);
        });

        input.addEventListener('focus', (): void => {
            focusInput(input, priceClassName);
        });

        input.addEventListener('input', (): void => {
            changeBtnBehavior(input);
        });
    };

    //функция создания контейнера для полей ввода
    const createFormInputs = (
        amountContainer: HTMLDivElement,
        priceContainer: HTMLDivElement
    ): HTMLDivElement => {
        const formInputsClassName: string = 'shares-form__shares-form-inputs';

        const formInputs = <HTMLDivElement>document.createElement('DIV');

        defineElement(formInputs, {
            className: formInputsClassName
        }, [amountContainer, priceContainer]);

        return formInputs;
    };

    //функция создания кнопки "Добавить"
    const createAddBtn = (): HTMLButtonElement => {
        const addRowBtnClassName: string = 'btn-container__btn-add';

        const addBtn = <HTMLButtonElement>document.createElement('BUTTON');

        defineInputElement(addBtn, {
            className: addRowBtnClassName,
            type: 'submit',
            textContent: 'Добавить'
        });
        addBtn.disabled = true;

        return addBtn;
    };

    //функция создания контейнера для кнопки
    const createAddBtnContainer = (btn: HTMLButtonElement): HTMLDivElement => {
        const btnContainerClassName: string = 'shares-form__btn-container';

        const btnContainer = <HTMLDivElement>document.createElement('DIV');

        defineElement(btnContainer, {
            className: btnContainerClassName
        }, [btn]);

        return btnContainer;
    };

    interface IClickAddBtn {
        article: HTMLDivElement,
        form: IForm,
        container: HTMLDivElement,
        tbody: HTMLElement,
        amountInput: HTMLInputElement,
        priceInput: HTMLInputElement,
        noShoppingElText: string
    }

    const clickAddBtn = ({
        article,
        form,
        container,
        tbody,
        amountInput,
        priceInput,
        noShoppingElText
    }: IClickAddBtn): void => {
        const rowClassName: string = 'shares-table__shares-item';

        const amount = leadAmountToValid(amountInput.value);
        const price = leadPriceToValid(priceInput.value);

        const trId = form.addRecord(amount, price);

        const totalPrice = amount * price;

        const tr = createTableRow(trId, form, tbody, amount, price, totalPrice, noShoppingElText);

        const noShoppingEl = <HTMLDivElement>article.querySelector('.table-is-empty');
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

        const currencyEl = <HTMLSpanElement>container.querySelector('.price-container__currency');
        const amountEl = <HTMLSpanElement>container.querySelector('.amount-container__amounts');

        amountEl.remove();
        currencyEl.remove();
    };

    interface IAddBtnEventListener extends IClickAddBtn {
        deleteRowBtn: HTMLButtonElement;
    };

    const addBtnEventListener = ({
        article,
        form,
        deleteRowBtn,
        container,
        tbody,
        amountInput,
        priceInput,
        noShoppingElText
    }: IAddBtnEventListener): void => {
        deleteRowBtn.addEventListener('click', (): void => {
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
    const createFormContainer = (formInputs: HTMLDivElement, btnContainer: HTMLDivElement): HTMLDivElement => {
        const formSharesClassName: string = 'shares-form-container__shares-form';

        const formShare = <HTMLDivElement>document.createElement('DIV');

        defineElement(formShare, {
            className: formSharesClassName
        }, [formInputs, btnContainer]);

        return formShare;
    };

    // функция создания контейнера формы
    const createFormShareContainer = (formContainer: HTMLDivElement): HTMLDivElement => {
        const shareFormClassName: string = 'shares-container__shares-form-container';

        const formShareContainer = <HTMLDivElement>document.createElement('DIV');

        defineElement(formShareContainer, {
            className: shareFormClassName
        }, [formContainer]);

        return formShareContainer;
    };

    //функция создания контейнера для таблицы и контейнера формы
    const createSharesContainer = (tableContainer: HTMLDivElement, shareFormContainer: HTMLDivElement): HTMLDivElement => {
        const containerClassName: string = 'shares-article__shares-container';

        const sharesContainer = <HTMLDivElement>document.createElement('DIV');

        defineElement(sharesContainer, {
            className: containerClassName
        }, [tableContainer, shareFormContainer]);

        return sharesContainer;
    };

    //функция создания обёртки для всей формы
    const createArticle = (formTitle: HTMLTitleElement, sharesContainer: HTMLDivElement): HTMLDivElement => {
        const articeClassName: string = 'shares-section__shares-article';

        const article = <HTMLDivElement>document.createElement('DIV');

        defineElement(article, {
            className: articeClassName
        }, [formTitle, sharesContainer]);

        return article;
    };


    //ФУНКЦИИ ДЛЯ СОЗДАНИЯ НОВОЙ СТРОКИ В ТАБЛИЦЕ
    const createCellSpan = (value: number): HTMLSpanElement => {
        const valueString: string = value.toLocaleString();
        const cellSpan = <HTMLSpanElement>document.createElement('SPAN');

        defineElement(cellSpan, {
            textContent: valueString
        });

        return cellSpan;
    };

    const createDeleteRowBtn = (span: HTMLSpanElement): HTMLButtonElement => {
        const btnClassName: string = 'btn-container__delete-btn';

        const deleteRowBtn = <HTMLButtonElement>document.createElement('BUTTON');

        defineElement(deleteRowBtn, {
            className: btnClassName
        }, [span]);

        return deleteRowBtn;
    };

    interface IDeleteRowBtnClickArguments {
        trId: number,
        form: IForm,
        tr: HTMLTableRowElement,
        tbody: HTMLElement,
        textContent: string
    };

    const deleteRowBtnClick = ({
        trId,
        form,
        tr,
        tbody,
        textContent
    }: IDeleteRowBtnClickArguments): void => {
        const removedRowClassName: string = 'shares-table__shares-item-remove';
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

            const noShoppingEl = <HTMLDivElement>createNoShoppingElement(textContent);
            noShoppingEl.style.left = tbodyWidth / 2 - noShoppingEl.offsetWidth / 2 + 'px';
            tbody.append(noShoppingEl);
        }, 250);

    };

    interface IDeleteRowBtnELArguments extends IDeleteRowBtnClickArguments {
        deleteRowBtn: HTMLButtonElement;
    };

    const deleteRowBtnEventListener = ({
        trId,
        form,
        tr,
        tbody,
        textContent,
        deleteRowBtn
    }: IDeleteRowBtnELArguments): void => {
        deleteRowBtn.addEventListener('click', (): void => deleteRowBtnClick({ trId, form, tr, tbody, textContent }));
    };

    const createTableDiv = (tdClassName: string, currentTdClassName: string, span: HTMLSpanElement): HTMLTableDataCellElement => {
        const td = <HTMLTableDataCellElement>document.createElement('TD');
        defineElement(td, {
            className: `${tdClassName} ${currentTdClassName}`
        }, [span]);

        return td;
    };

    const createTableRow = (
        trId: number,
        form: IForm,
        tbody: HTMLElement,
        amount: number,
        price: number,
        totalPrice: number,
        textContent: string
    ): HTMLTableRowElement => {
        const trClassName: string = 'shares-table__shares-item-add';
        const tdClassName: string = 'shares-item__value';

        const amountTdClassName: string = 'shares-item__amount';
        const priceTdClassName: string = 'shares-item__price';
        const totalPriceTdClassName: string = 'shares-item__total-price';
        const deleteRowBtnTdClassName: string = 'shares-item__btn-container';

        const amountSpan: HTMLSpanElement = createCellSpan(amount);
        const priceSpan: HTMLSpanElement = createCellSpan(price);
        priceSpan.dataset.currency = currency;
        const totalPriceSpan: HTMLSpanElement = createCellSpan(totalPrice);
        totalPriceSpan.dataset.currency = currency;

        const deleteRowBtnSpan = <HTMLSpanElement>document.createElement('SPAN');
        deleteRowBtnSpan.innerHTML = '&#x2715';

        const deleteRowBtn = createDeleteRowBtn(deleteRowBtnSpan);

        const amountTd = createTableDiv(tdClassName, amountTdClassName, amountSpan);
        const priceTd = createTableDiv(tdClassName, priceTdClassName, priceSpan);
        const totalPriceTd = createTableDiv(tdClassName, totalPriceTdClassName, totalPriceSpan);
        const deleteRowBtnTd = createTableDiv(tdClassName, deleteRowBtnTdClassName, deleteRowBtn);

        const tr = <HTMLTableRowElement>document.createElement('TR');

        defineElement(tr, {
            className: trClassName
        }, [amountTd, priceTd, totalPriceTd, deleteRowBtnTd]);

        deleteRowBtnEventListener({ trId, form, tr, tbody, deleteRowBtn, textContent });

        return tr;
    };

    return {
        createForm: (
            title, {
                col_1,
                col_2,
                col_3
            },
            mountEl, form) => {

            const tHead = setThead(col_1, col_2, col_3);

            const noShoppingElText: string = title === 'Точки входа' ? 'нет покупок' : 'нет продаж';
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
    }
};
