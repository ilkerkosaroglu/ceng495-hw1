import { Dialog } from "@blueprintjs/core";
import React, { useState } from "react";
import { useNavigate, useOutlet } from "react-router-dom";

declare global {
    interface Window { setCurrentProduct: (name:string)=>void; currentProduct: string; }
}

export const ProductDialogComponent = () => {
    const productDetailed = useOutlet();
    let isOpen = !!productDetailed;
    const nav = useNavigate();
    const [name, setName] = useState(window.currentProduct);
    window.setCurrentProduct = setName;
    return (
        <Dialog style={{width:'80%', maxWidth:'800px'}} key="productDialogKey" isOpen={isOpen} onClose={()=>{nav("..", {relative:"path"})}}
            title={name}
        >
            {productDetailed}
        </Dialog>
    );
};