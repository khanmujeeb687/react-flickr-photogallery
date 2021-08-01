import React from 'react';
import {TextField} from "@material-ui/core";
import './home/homeScreen.scss';
import {useDispatch} from "react-redux";
import {Actions} from "../store/actions";

const SearchBar = () => {
    const dispatch = useDispatch();


    return (<TextField
        onFocus={()=>{
            dispatch(Actions.updateShowSuggestions(true));
        }}
        onBlur={()=>{
            dispatch(Actions.updateShowSuggestions(false));
        }}
        className='search-bar'
        onChange={({target: {value}}) => {
                dispatch(Actions.updateSearchQuery(value));
        }
        }
        placeholder='search...'
        variant='outlined'
    />);
}


export default SearchBar;