import React from 'react';
import { Card } from "@blueprintjs/core";

import { ProductInfoComponent } from './productInfo';
import { useNavigate } from 'react-router-dom';
import { ProductProps } from './productTypes';

export const CardComponent = (props: ProductProps) => {
    const nav = useNavigate();
    return (
        <Card 
        interactive 
        onClick={()=>{
            nav(props._id);
            window.setCurrentProduct(props.name);
        }}
        style={{width:'25vw', height:'auto', margin:'5px'}}>
            <ProductInfoComponent product={props}/>
        </Card>
    );
};

