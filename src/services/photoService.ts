import awaitTo from 'async-await-error-handling';
import axios from 'axios';
import {Constants} from "../values/constants";
import {IPhoto} from "../models/photo";


async function getRecentPhotos(page:number=1,perPage:number=10) {
    const url = Constants.BASE_URL+'flickr.photos.getRecent&api_key='+Constants.API_KEY+'&per_page='+perPage+'&format=json&nojsoncallback=1&page='+page;
    const [err, data ] = await awaitTo(axios.get(url));
    if(err) return [];
    return data.data.photos.photo;
}


async function searchPhotos(query:string,page:number=1,perPage:number=10) {
    const url =  Constants.BASE_URL+'flickr.photos.search&api_key='+Constants.API_KEY+'&per_page='+perPage+'&format=json&nojsoncallback=1&tags='+query+'&page='+page;
    const [err, data ] = await awaitTo(axios.get(url));
    if(err) return [];
    return data.data.photos.photo;
}

function getImageUrl(photo:IPhoto){
    return 'https://live.staticflickr.com/'+photo.server+'/'+photo.id+'_'+photo.secret+'.jpg';
}


export {
    getImageUrl,
    getRecentPhotos,
    searchPhotos
}