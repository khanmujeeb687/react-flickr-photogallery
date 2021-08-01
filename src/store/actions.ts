import {IPhoto} from "../models/photo";

export class Actions{
    static UPDATE_RECENT_PHOTOS = 'UPDATE_RECENT_PHOTOS';
    static UPDATE_SEARCH_HISTORY = 'UPDATE_SEARCH_HISTORY';
    static UPDATE_SEARCH_DATA = 'UPDATE_SEARCH_DATA';
    static UPDATE_SEARCH_QUERY = 'UPDATE_SEARCH_QUERY';



    static updatePhotos(value:IPhoto[]){
        return {
            type: Actions.UPDATE_RECENT_PHOTOS,
            payload: value
        }
    }

    static updateSearchHistory(value:string[]){
        return {
            type: Actions.UPDATE_SEARCH_HISTORY,
            payload: value
        }
    }

    static updateSearchData(value:IPhoto[],key:string){
        return {
            type: Actions.UPDATE_SEARCH_DATA,
            payload: {key,value}
        }
    }

    static updateSearchQuery(value:string){
        return {
            type: Actions.UPDATE_SEARCH_QUERY,
            payload: value
        }
    }
}


