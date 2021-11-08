// アクションタイプ
const SETRESULT = 'SETRESULT';

// アクション関数
export const setResult = (modalName : string, flag : boolean) => ({ type: SETRESULT, modalName, flag });

export type result = {
    one: boolean,
    two: boolean,
    three: boolean,
    four: boolean,
    five: boolean,
    time: Date
  };
  
const initialState : result = {
    one: false,
    two: false,
    three: false,
    four: false,
    five: false,
    time: new Date(0)
};
 
export default function reducer(state = initialState, action : any) {
    switch(action.type) {
        case SETRESULT:
            if(action.modalName === "Modal1"){
                return {
                    ...state,
                        one: action.flag,
                        two: state.two,
                        three: state.three,
                        four: state.four,
                        five: state.five,
                        time: state.time
                }
            }
            else if(action.modalName === "Modal2"){
                return {
                    ...state,
                        one: state.one,
                        two: action.flag,
                        three: state.three,
                        four: state.four,
                        five: state.five,
                        time: state.time
                }
            }
            else if(action.modalName === "Modal3"){
                return {
                    ...state,
                        one: state.one,
                        two: state.two,
                        three: action.flag,
                        four: state.four,
                        five: state.five,
                        time: state.time
                }
            }
            else if(action.modalName === "Modal4"){
                return {
                    ...state,
                        one: state.one,
                        two: state.two,
                        three: state.three,
                        four: action.flag,
                        five: state.five,
                        time: state.time
                }
            }
            else if(action.modalName === "Modal5"){
                return {
                    ...state,
                        one: state.one,
                        two: state.two,
                        three: state.three,
                        four: state.four,
                        five: action.flag,
                        time: new Date().toLocaleString()
                }
            }
        default: {
            return state;
        }
    }
};