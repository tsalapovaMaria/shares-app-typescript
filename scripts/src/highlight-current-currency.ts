const toggler = <HTMLInputElement>document.querySelector('#dropdown');

const dropdownContainer = <HTMLDivElement>document.querySelector('.dropdown-container');
const dropdownList = <HTMLDivElement>document.querySelector('.dropdown');
const dropdownItems = <HTMLDivElement>document.querySelector('.items');

const dropdownLabels: HTMLLabelElement[] = Array.from(dropdownItems.querySelectorAll('LABEL'));

let wasChecked = false;

const toggleFunc = (isChecked: Boolean): void => {    
    const currentCurrency = (document.querySelector('.current-container__value') as HTMLDivElement).textContent;

    const label = <HTMLLabelElement>Array.from(dropdownLabels).find(label => label.textContent === currentCurrency);
    
    if(isChecked && label.className === ''){
        label.className += ' active-currency';
    }
    if(!isChecked && label.className !== ''){
        label.className = '';
    }
};

dropdownList.addEventListener('click', (): void => {
    const isChecked = toggler.checked;

    toggleFunc(isChecked);

    if (wasChecked && isChecked) {
        toggler.checked = false;
    }
    wasChecked = isChecked;
});