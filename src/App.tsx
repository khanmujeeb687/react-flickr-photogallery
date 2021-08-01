import React from 'react';
import './App.css';
import HomeScreen from "./components/home/homeScreen";
import {AppBar, Toolbar, Typography} from '@material-ui/core';
import SearchBar from "./components/searchBar";
import './components/home/homeScreen.scss';
import SuggestionsBar from "./components/suggestionsBar";
import {Actions} from "./store/actions";
import {useDispatch} from "react-redux";

const App = () => {

    const dispatch = useDispatch();

    return (
        <div className="App">
            <AppBar
                onMouseEnter={() => {
                    dispatch(Actions.updateShowSuggestions(true));
                }}
                onMouseLeave={() => {
                    dispatch(Actions.updateShowSuggestions(false));
                }}
                style={{backgroundColor: '#000000'}}>
                <Toolbar style={{alignSelf: 'center'}}>
                    <div style={{padding: 20}}>
                        <Typography variant="h6">Search Photos</Typography>
                        <div className='search-bar-container'><SearchBar/></div>
                        <SuggestionsBar/>
                    </div>
                </Toolbar>
            </AppBar>
            <Toolbar/>
            <HomeScreen/>
        </div>
    );
}

export default App;
