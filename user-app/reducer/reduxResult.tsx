// アクションタイプ
const SETRESULT = 'SETRESULT';

// アクション関数
export const setResult = (modalName : number, flag : boolean) => ({ type: SETRESULT, modalName, flag });

export type result = {
    one: any,
    two: any,
    three: any,
    four: any,
    five: any,
    six: any,
    seven: any,
    eight: any,
    nine: any,
    ten: any,
    time: Date
  };
  
const initialState : result = {
    one: null,
    two: null,
    three: null,
    four: null,
    five: null,
    six: null,
    seven: null,
    eight: null,
    nine: null,
    ten: null,
    time: new Date(0)
};
 
export default function reducer(state = initialState, action : any) {
    switch(action.type) {
        case SETRESULT:
            if(action.modalName === 1){
                return {
                    ...state,
                        one: action.flag,
                        two: state.two,
                        three: state.three,
                        four: state.four,
                        five: state.five,
                        six: state.six,
                        seven: state.seven,
                        eight: state.eight,
                        nine: state.nine,
                        ten: state.ten,
                        time: new Date().toLocaleString()
                }
            }
            else if(action.modalName === 2){
                return {
                    ...state,
                        one: state.one,
                        two: action.flag,
                        three: state.three,
                        four: state.four,
                        five: state.five,
                        six: state.six,
                        seven: state.seven,
                        eight: state.eight,
                        nine: state.nine,
                        ten: state.ten,
                        time: new Date().toLocaleString()
                }
            }
            else if(action.modalName === 3){
                return {
                    ...state,
                        one: state.one,
                        two: state.two,
                        three: action.flag,
                        four: state.four,
                        five: state.five,
                        six: state.six,
                        seven: state.seven,
                        eight: state.eight,
                        nine: state.nine,
                        ten: state.ten,
                        time: new Date().toLocaleString()
                }
            }
            else if(action.modalName === 4){
                return {
                    ...state,
                        one: state.one,
                        two: state.two,
                        three: state.three,
                        four: action.flag,
                        five: state.five,
                        six: state.six,
                        seven: state.seven,
                        eight: state.eight,
                        nine: state.nine,
                        ten: state.ten,
                        time: new Date().toLocaleString()
                }
            }
            else if(action.modalName === 5){
                return {
                    ...state,
                        one: state.one,
                        two: state.two,
                        three: state.three,
                        four: state.four,
                        five: action.flag,
                        six: state.six,
                        seven: state.seven,
                        eight: state.eight,
                        nine: state.nine,
                        ten: state.ten,
                        time: new Date().toLocaleString()
                }
            }
            else if(action.modalName === 6){
                return {
                    ...state,
                        one: state.one,
                        two: state.two,
                        three: state.three,
                        four: state.four,
                        five: state.five,
                        six: action.flag,
                        seven: state.seven,
                        eight: state.eight,
                        nine: state.nine,
                        ten: state.ten,
                        time: new Date().toLocaleString()
                }
            }
            else if(action.modalName === 7){
                return {
                    ...state,
                        one: state.one,
                        two: state.two,
                        three: state.three,
                        four: state.four,
                        five: state.five,
                        six: state.six,
                        seven: action.flag,
                        eight: state.eight,
                        nine: state.nine,
                        ten: state.ten,
                        time: new Date().toLocaleString()
                }
            }
            else if(action.modalName === 8){
                return {
                    ...state,
                        one: state.one,
                        two: state.two,
                        three: state.three,
                        four: state.four,
                        five: state.five,
                        six: state.six,
                        seven: state.seven,
                        eight: action.flag,
                        nine: state.nine,
                        ten: state.ten,
                        time: new Date().toLocaleString()
                }
            }
            else if(action.modalName === 9){
                return {
                    ...state,
                        one: state.one,
                        two: state.two,
                        three: state.three,
                        four: state.four,
                        five: state.five,
                        six: state.six,
                        seven: state.seven,
                        eight: state.eight,
                        nine: action.flag,
                        ten: state.ten,
                        time: new Date().toLocaleString()
                }
            }
            else if(action.modalName === 10){
                return {
                    ...state,
                        one: state.one,
                        two: state.two,
                        three: state.three,
                        four: state.four,
                        five: state.five,
                        six: state.six,
                        seven: state.seven,
                        eight: state.eight,
                        nine: state.nine,
                        ten: action.flag,
                        time: new Date().toLocaleString()
                }
            }
        default: {
            return state;
        }
    }
};