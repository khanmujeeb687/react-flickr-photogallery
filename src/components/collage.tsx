import React, {useEffect, useState} from 'react';
import InfiniteScroll from "react-infinite-scroll-component";
import GridItem from "./gridItem";
import './home/homeScreen.css';
import {getImageUrl, getRecentPhotos, searchPhotos} from "../services/photoService";
import {useDispatch, useSelector} from "react-redux";
import {Actions} from "../store/actions";
import {IState} from "../store";
import Loader from "./loader";
import ImageModal from "./imageModal";
import {Typography} from "@material-ui/core";


const Collage = () => {
    const showSuggestions = useSelector((state:IState)=>state.showSuggestions);
    const photos = useSelector((state:IState)=>state.recentPhotos);
    const query = useSelector((state:IState)=>state.searchQuery);
    const searchData = useSelector((state:IState)=>state.searchData[query]);
    const searchResults = searchData?.photos || [];
    const searchPage = searchData?.page || 1;
    const [noMoreForQuery,setNoMoreForQuery]= useState<{[key:string]:boolean}>({});
    const [loaded, setIsLoaded] = React.useState(false);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const dispatch = useDispatch();
    const [selectedImage,setSelectedImage] = useState('');



    useEffect(() => {
        fetchImages();
    }, []);



    const fetchImages = async() => {
        if(!hasMore) return;
        const data = await  getRecentPhotos(page);
        if(data.length){
           dispatch(Actions.updatePhotos([...photos,...data]));
           setPage(page+1);
        }else{
           setHasMore(false);
        }
        setIsLoaded(true);

    };



    const searchImages = async() => {
        if(noMoreForQuery[query]) return;
        const data = await  searchPhotos(query,searchPage);
        if(data.length){
           dispatch(Actions.updateSearchData(data,query));
        }else{
            let map:{[key:string]:boolean} = {};
            map[query] = true;
            setNoMoreForQuery({...noMoreForQuery,...map})
        }
        setIsLoaded(true);
    };

    useEffect(()=>{
        window.scrollTo(0,0);
        if(query && !searchData){
            searchImages();
        }
    },[query]);


    const loadMore= ()=>{
        if(query){
            searchImages();
        }else{
            fetchImages();
        }
    }


    console.log({searchResults});

    return (
                <div className="container">
                    <ImageModal url={selectedImage} onClose={()=>setSelectedImage('')}/>
                    <InfiniteScroll
                        dataLength={(query?searchResults:photos).length}
                        next={loadMore}
                        hasMore={hasMore}
                        loader={<Loader/>}
                    >
                        <Typography style={{alignSelf:'flex-start'}} variant='h5'>{query && `${searchResults.length} results found for \'${query}\'`}</Typography>
                        <div key={query} className="image-grid" style={{ marginTop: showSuggestions?'50px':"30px" }}>
                            {loaded
                                ? (query?searchResults:photos).map((photo, index) =>{
                                    if(query && photo.query && photo.query!==query) return null;
                                    return(
                                        <div onClick={()=>{
                                            setSelectedImage(getImageUrl(photo))
                                        }}>
                                    <GridItem
                                        url={getImageUrl(photo)}
                                        key={photo.id.toString()}
                                    />
                                        </div>
                                );})
                                : ""}
                        </div>
                    </InfiniteScroll>
                </div>
    );
};


export default Collage;