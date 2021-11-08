// アクションタイプ
const ADDMODAL = 'ADDMODAL';
const RESETMODAL = 'RESETMODAL';

// アクション関数
export const addModal = () => ({ type: ADDMODAL });
export const resetModal = () => ({ type: RESETMODAL });

export type modal = {
    modalNum: number
  };
  
const initialState : modal = {
    modalNum: 1
};
 
export default function reducer(state = initialState, action : any) {
    switch(action.type) {
        case ADDMODAL:
            return {
                ...state,
                modalNum:state.modalNum + 1
            }
        case RESETMODAL:
            return {
                ...state,
                modalNum:1
            }
        default: {
            return state;
        }
    }
};