import { useState } from "react";
import { Card, Classes } from "@blueprintjs/core";
import { capitalizeFirstLetter } from '../util';
import { ProductProps } from "./productTypes";

const knownProps = ['_id', 'category', 'name', 'description', 'price', 'image', 'seller', 'reviews', 'avgRating'];

const shouldRenderExtraProps = (obj: Object) => {
    return Object.keys(obj).some(key => !knownProps.includes(key));
};

const PropsComponent = (obj: Object) => {
    return (
        <div>
            {Object.entries(obj).map(([key, v]) => {
                if(knownProps.includes(key)) return null;
                if(typeof v === 'object' && v !== null) return <Card key={key}>
                    <p key={key}>{capitalizeFirstLetter(key)}:</p>
                    <PropsComponent key={key} {...v} />
                </Card>;
                return <p key={key}>{capitalizeFirstLetter(key)}: {v}</p>;
            })}
        </div>
    );
};

export const ProductInfoComponent = (props: {product:ProductProps, noText?:boolean}) => {
    const [isLoaded, setIsLoaded] = useState(false);
    const {product} = props;
    const shouldRenderExtra = shouldRenderExtraProps(product);
    return (
        <div>
            <div className={!isLoaded?Classes.SKELETON:''}>
                <img src={product.image} alt="Avatar" 
                onLoad={() => setIsLoaded(true)}
                style={{width: "90%"}} />
            </div>

            <div className={(!isLoaded?Classes.SKELETON:'') + " container"}>
                 {!props.noText&&(<h4><b>{product.name}</b></h4>)}
                <p>{product.description}</p>
                <p className="light"><b><i>{product.price}TL</i></b></p>
                {shouldRenderExtra && <div><hr/>
                    <PropsComponent {...product}/>
                <hr/></div>}
                <p className="light">Seller: {product.seller}</p>
            </div>
        </div>
    );
};