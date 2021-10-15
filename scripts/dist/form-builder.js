"use strict";
;
;
const formBuilder = function () {
    const state = [];
    const subscribers = [];
    const pushRecord = (id, amount, price) => {
        const totalPrice = amount * price;
        const newEl = {
            id: id,
            amount: amount,
            price: price,
            total: totalPrice
        };
        state.push(newEl);
    };
    const deleteRecord = (id) => {
        const splicesEl = state.find(item => item.id === id);
        const elIndex = state.indexOf(splicesEl);
        state.splice(elIndex, 1);
    };
    return {
        subscribe: function (callback) {
            subscribers.push(callback);
        },
        notify: function () {
            subscribers.forEach(callback => callback());
        },
        addRecord: function (amount, price) {
            const id = Date.now();
            pushRecord(id, amount, price);
            this.notify();
            return id;
        },
        removeRecord: function (id) {
            deleteRecord(id);
            this.notify();
        },
        getState: function () {
            let stateCloneObj = [];
            state.forEach((value, key) => {
                stateCloneObj[key] = Object.assign({}, value);
            });
            return stateCloneObj;
        }
    };
};
