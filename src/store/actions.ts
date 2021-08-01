import {IPhoto} from "../models/photo";

export class Actions{
    static UPDATE_RECENT_PHOTOS = 'UPDATE_RECENT_PHOTOS';



    static updatePhotos(value:IPhoto[]){
        return {
            type: Actions.UPDATE_RECENT_PHOTOS,
            payload: value
        }
    }
}


