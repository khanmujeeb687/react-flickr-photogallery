import React from 'react';
// @ts-ignore
import {ReactSearchAutocomplete} from 'react-search-autocomplete';

const SearchBar = () => {
    const items = [
        {
            id: 0,
            name: 'Cobol'
        },
        {
            id: 1,
            name: 'JavaScript'
        },
        {
            id: 2,
            name: 'Basic'
        },
        {
            id: 3,
            name: 'PHP'
        },
        {
            id: 4,
            name: 'Java'
        }
    ]

    const handleOnSearch = (item:string, results:any) => {
        // onSearch will have as the first callback parameter
        // the string searched and for the second the results.
        console.log(item, results)
    }

    const handleOnHover = (result:any) => {
        // the item hovered
        console.log(result)
    }

    const handleOnSelect = (item:any) => {
        // the item selected
        console.log(item)
    }

    const handleOnFocus = () => {
        console.log('Focused')
    }

    const formatResult = (item:any) => {
        return item;
        // return (<p dangerouslySetInnerHTML={{__html: '<strong>'+item+'</strong>'}}></p>); //To format result as html
    }

    return (<ReactSearchAutocomplete
        items={items}
        onSearch={handleOnSearch}
        onHover={handleOnHover}
        onSelect={handleOnSelect}
        onFocus={handleOnFocus}
        autoFocus
        formatResult={formatResult}
    />);
}


export default SearchBar;