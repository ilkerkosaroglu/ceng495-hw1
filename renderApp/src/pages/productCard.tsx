import React, { useCallback } from 'react';
import { Card } from "@blueprintjs/core";
import { ProductDialogComponent } from './productDialog';
import { ProductInfoComponent } from './productInfo';
import { useNavigate } from 'react-router-dom';
export interface ProductProps {
    _id: string;
    name: string;
    description: string;
    price: number;
    image: string;
    seller: string;
};
// border:'medium solid black', 
export const CardComponent = (props: ProductProps) => {
    const [isDialogOpen, setDialogOpen] = React.useState(false);
    const nav = useNavigate();
    const open = useCallback(() => {
        setDialogOpen(true);
        nav(props._id);
    }, [props._id, setDialogOpen, nav]);
    return (
        <Card 
        interactive 
        onClick={open}
        style={{width:'25vw', height:'auto', margin:'5px'}}>
            <ProductInfoComponent product={props}/>
            <ProductDialogComponent isOpen={isDialogOpen} onClose={()=>setDialogOpen(false)} product={props}/>
        </Card>
    );
};

