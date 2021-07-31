import React from 'react';
import './home/homeScreen.scss'

export interface IGridItem {
    url:string,
    key:string
}

const GridItem: React.FC<IGridItem> = ({ url, key }) => (
    <div className="image-item" key={key} >
        <img src={url} />
    </div>
);

export default GridItem;