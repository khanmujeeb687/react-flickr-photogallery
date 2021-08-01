import React from 'react';
import Lottie from "react-lottie";
import animationData from '../assets/loader.json';



const Loader = () =>{
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice'
        }
    };
    return (
            <Lottie options={defaultOptions}
                    style={{flex: 1}}
                    height={50}
                    width={50}/>
    );
}

export default Loader;