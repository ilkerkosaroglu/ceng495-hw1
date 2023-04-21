import React from 'react';
import { Card, Classes } from "@blueprintjs/core";
import { capitalizeFirstLetter } from '../util';
const knownProps = ['_id', 'category', 'name', 'description', 'price', 'image', 'seller'];
export type ProductProps = {
    name: string;
    description: string;
    price: number;
    image: string;
    seller: string;
};
// border:'medium solid black', 
const PropsComponent = (obj: Object) => {
    return (
        <div>
            {Object.entries(obj).map(([key, v]) => {
                if(knownProps.includes(key)) return null;
                if(typeof v === 'object' && v !== null) return <PropsComponent key={key} {...v} />;
                return <p key={key}>{capitalizeFirstLetter(key)}: {v}</p>;
            })}
        </div>
    );
};
export const CardComponent = (props: ProductProps) => {
    const [isLoaded, setIsLoaded] = React.useState(false);
    return (
        <Card interactive style={{width:'25vw', height:'auto', margin:'5px'}}>
            <div className={!isLoaded?Classes.SKELETON:''}>
                <img src={props.image} alt="Avatar" 
                onLoad={() => setIsLoaded(true)}
                style={{width: "90%"}} />
            </div>
            <div className={(!isLoaded?Classes.SKELETON:'') + " container"}>
                <h4><b>{props.name}</b></h4>
                <p>{props.description}</p>
                <p className="light"><b><i>{props.price}TL</i></b></p>
                <hr/>
                    <PropsComponent {...props}/>
                <hr/>
                <p className="light">Seller: {props.seller}</p>
            </div>
        </Card>
    );
};

