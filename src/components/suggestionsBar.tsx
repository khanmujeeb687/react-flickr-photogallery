import React, {useEffect, useState} from 'react';
import {Avatar, Chip, Collapse, createStyles, makeStyles, Paper, Theme} from "@material-ui/core";
import {useDispatch, useSelector} from "react-redux";
import {IState} from "../store";
import {getLocalSearchHistory, removeFromLocalHistory} from "../services/photoService";
import {Actions} from "../store/actions";
import './home/homeScreen.scss';


const SuggestionsBar = () => {
    const checked = useSelector((state:IState)=>state.showSuggestions);
    const dispatch = useDispatch();

    const [suggestions,setSuggestions] =  useState(getLocalSearchHistory());

    useEffect(()=>{
        if(checked){
            setSuggestions(getLocalSearchHistory());
        }
    },[checked]);


    return ( <Collapse className='collapse-bar' in={checked}  timeout={500}>

        <Paper component="ul" className='suggestion-root'>
            {suggestions.map((data) => {
                return (
                    <li className='suggestion-chip' key={data}>
                        <Chip
                            onClick={()=>{
                                dispatch(Actions.updateSearchQuery(data));
                            }}
                            label={data}
                             onDelete={()=>{
                                 removeFromLocalHistory(data)
                                 setSuggestions(getLocalSearchHistory());
                             }}
                            className='suggestion-chip'
                        />
                    </li>
                );
            })}
        </Paper>
    </Collapse>);
}

export default SuggestionsBar;