import React from 'react';
import {Avatar, Chip, Collapse, createStyles, makeStyles, Paper, Theme} from "@material-ui/core";
import {useSelector} from "react-redux";
import {IState} from "../store";


const SuggestionsBar = () => {
    const checked = useSelector((state:IState)=>state.showSuggestions);



    return ( <Collapse style={{marginTop:10,background:'#000000'}} in={checked} timeout={500}>

        <Paper style={{background:'#000000'}} component="ul" className='suggestion-root'>
            {['1','2','3','5'].map((data) => {
                return (
                    <li key={data}>
                        <Chip
                            label={data}
                             onDelete={()=>{

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