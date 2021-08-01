import React, {useEffect, useState} from 'react';
import InfiniteScroll from "react-infinite-scroll-component";
import GridItem from "./gridItem";
import './home/homeScreen.scss';
import {getImageUrl, getRecentPhotos} from "../services/photoService";
import {useDispatch, useSelector} from "react-redux";
import {Actions} from "../store/actions";
import {IState} from "../store";


const Collage = () => {
    const photos = useSelector((state:IState)=>state.recentPhotos);
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




    return (
        <div className="hero is-fullheight is-bold is-info">
            <div className="hero-body">
                <div className="container">
                    <InfiniteScroll
                        dataLength={photos.length}
                        next={() => fetchImages()}
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
                                ? photos.map((photo, index) => (
                                    <GridItem
                                        url={getImageUrl(photo)}
                                        key={photo.id.toString()}
                                    />
                                ))
                                : ""}
                        </div>
                    </InfiniteScroll>
                </div>
            </div>
        </div>
    );
};


export default Collage;