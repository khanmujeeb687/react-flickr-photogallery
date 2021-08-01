import awaitTo from 'async-await-error-handling';
import axios from 'axios';
import {Constants} from "../values/constants";


async function getRecentPhotos(page:number=1) {
    const url = Constants.BASE_URL+'flickr.photos.getRecent&api_key=2bfe12cdffacbd9662ecbc62f53a35ce&per_page=10&format=json&nojsoncallback=1&page='+page;
    const [err, data ] = await awaitTo(axios.get(url));
    if(err) return [];
    return data.data;
}


export {
    getRecentPhotos
}