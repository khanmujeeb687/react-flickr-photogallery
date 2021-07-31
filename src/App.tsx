import React from 'react';
import './App.css';
import HomeScreen from "./components/home/homeScreen";
import {AppBar, Toolbar, Typography} from '@material-ui/core';
import SearchBar from "./components/searchBar";

function App() {
  return (
    <div className="App">
            <AppBar style={{backgroundColor:'#000000'}}>
                <Toolbar style={{alignSelf:'center'}}>
                    <div style={{padding:20}}>
                    <Typography variant="h6">Search Photos</Typography>
                    <div style={{width:400}}><SearchBar/></div>
                    </div>
                </Toolbar>
            </AppBar>
        <Toolbar />
      <HomeScreen/>
    </div>
  );
}

export default App;
