import React, {useEffect, useState} from 'react';
import {TextField} from "@material-ui/core";
import './home/homeScreen.css';
import {useDispatch, useSelector} from "react-redux";
import {Actions} from "../store/actions";
import {IState} from "../store";
import {getLocalSearchHistory, setLocalSearchHistory} from "../services/photoService";

const SearchBar = () => {
    const dispatch = useDispatch();
    const [term,setTerm] = useState('');

    const showSuggestions = useSelector((state:IState)=>state.showSuggestions);
    const query = useSelector((state:IState)=>state.searchQuery);

    useEffect(()=>{
        if(!showSuggestions){
            setLocalSearchHistory(term);
        }
    },[showSuggestions]);


    return (<TextField
        value={query || term}
        onFocus={()=>{
            dispatch(Actions.updateShowSuggestions(true));
        }}
        onBlur={()=>{
            dispatch(Actions.updateShowSuggestions(false));
        }}
        className='search-bar'
        onChange={({target: {value}}) => {
                setTerm(value);
                dispatch(Actions.updateSearchQuery(value));
        }
        }
        placeholder='search...'
        variant='outlined'
    />);
}


export default SearchBar;