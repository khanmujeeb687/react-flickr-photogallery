import { createStore } from 'redux'
import {Actions} from "./actions";
import {IPhoto} from "../models/photo";

interface IState {
    recentPhotos:IPhoto[],
}

const INITIAL_STATE : IState = {
    recentPhotos:[]
}


function counterReducer(state:IState = INITIAL_STATE, action:any) {
    switch (action.type) {
        case Actions.UPDATE_RECENT_PHOTOS:
            return {
                ...state,
                recentPhotos: action.payload
            };
        default:
            return state
    }
}

export default createStore(counterReducer)
