import { createStore } from 'redux'
import {Actions} from "./actions";
import {IPhoto} from "../models/photo";
import {getLocalSearchHistory} from "../services/photoService";

export interface IState {
    recentPhotos:IPhoto[],
    searchHistory:string[]
}

const INITIAL_STATE : IState = {
    recentPhotos:[],
    searchHistory: getLocalSearchHistory()
}


function counterReducer(state:IState = INITIAL_STATE, action:any) {
    switch (action.type) {
        case Actions.UPDATE_RECENT_PHOTOS:
            return {
                ...state,
                recentPhotos: action.payload
            };
        case Actions.UPDATE_SEARCH_HISTORY:
            return {
                ...state,
                searchHistory: action.payload
            };
        default:
            return state
    }
}

export default createStore(counterReducer)
