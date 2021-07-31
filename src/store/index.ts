import { createStore } from 'redux'
import {Actions} from "./actions";

interface IState {
    name:string,
    age:number
}

const INITIAL_STATE : IState = {
    name:'Mujeeb khan',
    age:20,
}


function counterReducer(state:IState = INITIAL_STATE, action:any) {
    switch (action.type) {
        case Actions.CHANGE_NAME:
            return {
                ...state,
                name: action.payload
            };
        default:
            return state
    }
}

export default createStore(counterReducer)
