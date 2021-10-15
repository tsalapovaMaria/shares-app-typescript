interface IState {
    id: number,
    amount: number,
    price: number,
    total: number
};

interface IForm {
    subscribe: (callback: Function) => void;
    notify: () => void;
    addRecord: (amount: number, price: number) => number;
    removeRecord:(id: number) => void;
    getState: () => IState[];
};

const formBuilder = function (): IForm {
    const state: IState[] = [];
    const subscribers: (Function)[] = [];

    const pushRecord = (id: number, amount: number, price: number): void => {
        const totalPrice: number = amount * price;
        const newEl: IState = {
            id: id,
            amount: amount,
            price: price,
            total: totalPrice
        };

        state.push(newEl);
    };
    const deleteRecord = (id: number) => {
        const splicesEl = <IState>state.find(item => item.id === id);
        const elIndex: number = state.indexOf(splicesEl);

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
            let stateCloneObj: IState[] = [];

            state.forEach((value, key) => {
                stateCloneObj[key] = Object.assign({}, value);
            });
            
            return stateCloneObj;
        }
    }
};
