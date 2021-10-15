"use strict";
const toggler = document.querySelector('#dropdown');
const dropdownContainer = document.querySelector('.dropdown-container');
const dropdownList = document.querySelector('.dropdown');
const dropdownItems = document.querySelector('.items');
const dropdownLabels = Array.from(dropdownItems.querySelectorAll('LABEL'));
let wasChecked = false;
const toggleFunc = (isChecked) => {
    const currentCurrency = document.querySelector('.current-container__value').textContent;
    const label = Array.from(dropdownLabels).find(label => label.textContent === currentCurrency);
    if (isChecked && label.className === '') {
        label.className += ' active-currency';
    }
    if (!isChecked && label.className !== '') {
        label.className = '';
    }
};
dropdownList.addEventListener('click', () => {
    const isChecked = toggler.checked;
    toggleFunc(isChecked);
    if (wasChecked && isChecked) {
        toggler.checked = false;
    }
    wasChecked = isChecked;
});
