import React from 'react';
import {Dialog, DialogContent, DialogContentText, DialogTitle} from "@material-ui/core";

export interface IImageModalProps {
    url:string,
    onClose:()=>void;
}

const ImageModal: React.FC<IImageModalProps> =  ({onClose,url}) =>{
    return(
        <Dialog
            fullScreen={false}
            open={!!url}
            onClose={onClose}
            aria-labelledby="responsive-dialog-title"
        >
            <DialogContent>
                <img src={url} />
            </DialogContent>
        </Dialog>
    );
}

export default ImageModal;