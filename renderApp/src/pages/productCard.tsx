import React from 'react';
import { Card, Classes } from "@blueprintjs/core";
export type ProductProps = {
    name: string;
    description: string;
    price: number;
    seller: string;
    image: string;
    otherProps?: {[key: string]: string};
};
// border:'medium solid black', 
export const CardComponent = (props: ProductProps) => {
    const [isLoaded, setIsLoaded] = React.useState(false);
    return (
        <Card style={{width:'25vw', height:'auto'}}>
            <div className={!isLoaded?Classes.SKELETON:''}>
                <img src={props.image} alt="Avatar" 
                onLoad={() => setIsLoaded(true)}
                style={{width: "90%"}} />
            </div>
            <div className={(!isLoaded?Classes.SKELETON:'') + " container"}>
                <h4><b>{props.name}</b></h4>
                <p>{props.description}</p>
                <p><i>{props.price}TL</i></p>
                <p>Seller: {props.seller}</p>
                {props.otherProps &&<span>
                    <hr />
                    <p>Other props:</p>
                    <ul>
                        {Object.keys(props.otherProps).map((key) => {
                            return <li key={key}>{key}: {props.otherProps![key]}</li>;
                        })}
                    </ul>
                </span>
                }
            </div>
        </Card>
    );
};

