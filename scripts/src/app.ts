let currency: string = '$';

const section = <HTMLDivElement>document.querySelector('.shares-section');

const formRender: IRenderForm = renderForm();

const entryPointsForm: IForm = formBuilder();
const exitPointsForm: IForm = formBuilder();

formRender.createForm(
    'Точки входа', {
    col_1: 'кол-во акций',
    col_2: 'цена покупки',
    col_3: 'сумма'
}, section, entryPointsForm);
formRender.createForm(
    'Точки выхода', {
    col_1: 'кол-во акций',
    col_2: 'цена продажи',
    col_3: 'сумма'
}, section, exitPointsForm);


//добавляем в subscribers функции изменения и подсчета средней цены и профита
//во вкладке "Среднее"
entryPointsForm.subscribe(() => changeAmountPriceValue(entryPointsForm, exitPointsForm));
entryPointsForm.subscribe(() => changeProfitValue(entryPointsForm, exitPointsForm));

//добавляем в subscribers функции расчета и изменения количества акций к покупке 
//во вкладке "Среднее"
entryPointsForm.subscribe(() => changeAmountToBuyValue(entryPointsForm, exitPointsForm));

exitPointsForm.subscribe(() => changeAmountToBuyValue(entryPointsForm, exitPointsForm));
exitPointsForm.subscribe(() => changeAmountPriceValue(entryPointsForm, exitPointsForm));
exitPointsForm.subscribe(() => changeProfitValue(entryPointsForm, exitPointsForm));


addProfitInputEventListener(entryPointsForm, exitPointsForm);
addPosAveragingEvent(entryPointsForm, exitPointsForm);
