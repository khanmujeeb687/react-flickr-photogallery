import React, {useEffect, useState} from 'react';
import InfiniteScroll from "react-infinite-scroll-component";
import GridItem from "./gridItem";
import './home/homeScreen.scss';
import {getImageUrl, getRecentPhotos, searchPhotos} from "../services/photoService";
import {useDispatch, useSelector} from "react-redux";
import {Actions} from "../store/actions";
import {IState} from "../store";


const Collage = () => {
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
        <div className="hero is-fullheight is-bold is-info">
            <div className="hero-body">
                <div className="container">
                    <InfiniteScroll
                        dataLength={(query?searchResults:photos).length}
                        next={loadMore}
                        hasMore={hasMore}
                        loader={
                            <img
                                src="https://res.cloudinary.com/chuloo/image/upload/v1550093026/scotch-logo-gif_jq4tgr.gif"
                                alt="loading"
                            />
                        }
                    >
                        <div className="image-grid" style={{ marginTop: "30px" }}>
                            {loaded
                                ? (query?searchResults:photos).map((photo, index) =>{
                                    if(query && photo.query && photo.query!==query) return null;
                                    return(
                                    <GridItem
                                        url={getImageUrl(photo)}
                                        key={photo.id.toString()}
                                    />
                                );})
                                : ""}
                        </div>
                    </InfiniteScroll>
                </div>
            </div>
        </div>
    );
};


export default Collage;