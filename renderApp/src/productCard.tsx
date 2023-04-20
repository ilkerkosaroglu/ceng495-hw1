import React from 'react';
type CardProps = {
    title: string;
    description: string;
    price: number;
    seller: string;
    image: string;
    otherProps?: {[key: string]: string};
};
export const CardComponent = (props: CardProps) => {
    return (
        <div className="card" style={{border:'medium solid black'}}>
            <img src={props.image} alt="Avatar" style={{width: "100%"}} />
            <div className="container">
                <h4><b>{props.title}</b></h4>
                <p>{props.description}</p>
                <p><i>{props.price}$</i></p>
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
        </div>
    );
};

