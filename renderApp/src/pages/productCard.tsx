import React from 'react';
import { Card } from "@blueprintjs/core";
import { ProductDialogComponent } from './productDialog';
import { ProductInfoComponent } from './productInfo';
export type ProductProps = {
    name: string;
    description: string;
    price: number;
    image: string;
    seller: string;
};
// border:'medium solid black', 
export const CardComponent = (props: ProductProps) => {
    const [isDialogOpen, setDialogOpen] = React.useState(false);
    return (
        <Card 
        interactive 
        onClick={()=>{
            setDialogOpen(true);
        }}
        style={{width:'25vw', height:'auto', margin:'5px'}}>
            <ProductInfoComponent product={props}/>
            <ProductDialogComponent isOpen={isDialogOpen} setOpen={setDialogOpen} product={props}/>
        </Card>
    );
};

