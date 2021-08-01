import React, {useRef, useState} from 'react';
import Autocomplete from '@material-ui/lab/Autocomplete';
import {Button, TextField, Typography} from "@material-ui/core";
import './home/homeScreen.scss';
import {clearLocalSearch, getLocalSearchHistory, setLocalSearchHistory} from "../services/photoService";
import {useDispatch, useSelector} from "react-redux";
import {IState} from "../store";
import {Actions} from "../store/actions";

const SearchBar = () => {
    const searchHistory = useSelector((state: IState)=>state.searchHistory);
    const [term, setTerm] = useState('');
    const dispatch = useDispatch();


    return (<Autocomplete
        value={term==='clear-textfield'?'':term}
        blurOnSelect
        id="combo-box-demo"
        className='search-bar'
        options={[...searchHistory,'clear-textfield']}
        getOptionLabel={(option) => option}
        renderOption={(option,state)=>{
            if(option === 'clear-textfield'){
                if(searchHistory.length===0) return <h3></h3>;
                return (
                  <div style={{display:'flex',flexDirection:'row',justifyContent: 'flex-end',flex:1}}>
                      <Button variant="contained" color="secondary" onClick={()=>{
                          dispatch(Actions.updateSearchHistory([]));
                          clearLocalSearch();
                          setTerm('');
                      }}>clear</Button>
                  </div>
                );
            }
            return <Typography>{option}</Typography>
        }
        }
        renderInput={(params) => (
            <TextField
                value={term==='clear-textfield'?'':term}
                onBlur={()=>{
                    if(term && !searchHistory.includes(term)){
                        setLocalSearchHistory(term);
                        dispatch(Actions.updateSearchHistory([...searchHistory,term]));
                    }
                }}
                onChange={({target: {value}}) => {
                   setTerm(value);
                }
                }
                {...params}
                placeholder='search...'
                variant='outlined'
            />)}
    />);
}


export default SearchBar;