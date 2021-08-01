import { createStore } from 'redux'
import {Actions} from "./actions";
import {IPhoto} from "../models/photo";
import {getLocalSearchHistory} from "../services/photoService";

export interface IState {
    recentPhotos:IPhoto[],
    searchHistory:string[],
    searchData:{
        [key:string]:{photos:IPhoto[],page:number}
    },
    searchQuery:string,
    showSuggestions:boolean
}

const INITIAL_STATE : IState = {
    recentPhotos:[],
    searchHistory: getLocalSearchHistory(),
    searchData:{},
    searchQuery:'',
    showSuggestions:false
}


function counterReducer(state:IState = INITIAL_STATE, action:any) {
    switch (action.type) {
        case Actions.UPDATE_RECENT_PHOTOS:
            return {
                ...state,
                recentPhotos: action.payload
            };
        case Actions.UPDATE_SHOW_SUGGESTION:
            return {
                ...state,
                showSuggestions: action.payload
            };
        case Actions.UPDATE_SEARCH_HISTORY:
            return {
                ...state,
                searchHistory: action.payload
            };
        case Actions.UPDATE_SEARCH_QUERY:
            return {
                ...state,
                searchQuery: action.payload
            };
        case Actions.UPDATE_SEARCH_DATA:
            let page=2;
            const data = state.searchData[action.payload.key];
            if(data){
                page=data.page+1;
            }
            const map:{[key:string]:{photos:IPhoto[],page:number}}={};
            map[action.payload.key]={photos:[...(data?.photos || []),...action.payload.value],page};
            return {
                ...state,
                searchData:{...state.searchData,...map}
            };
        default:
            return state
    }
}

export default createStore(counterReducer)
