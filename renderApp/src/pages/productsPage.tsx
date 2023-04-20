import axios from 'axios';
import React from 'react';
import { LoaderFunction, useLoaderData } from 'react-router-dom';
import { CardComponent, ProductProps } from './productCard';
import { LoaderData } from '../routerTypes';

export const loader = (async ({ params }) =>
    axios.get(`/api/products/${params.category}`).catch(()=>{
        throw new Error('Failed to load products of ' +params.category+ ' category');
    }).then((resp)=>{
        return resp.data as ProductProps[];
    })) satisfies LoaderFunction;

export const ProductsComponent = () => {
    const products = useLoaderData() as LoaderData<typeof loader>;
    return (
        <div>
            <h1>Products</h1>
            <div style={{display:'flex'}}>
                {products.map((product) => (
                    <CardComponent key={product.title} {...product} />
                ))}
            </div>
        </div>
    );
};