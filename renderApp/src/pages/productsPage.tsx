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
        <div style={{backgroundColor: '#f2f3ee', padding:'0px 20px 20px 20px'}}>
            <h1 className='titleText'>Products</h1>
            <div style={{display:'flex', flexWrap:'wrap'}}>
                {products.map((product) => (
                    <CardComponent key={product.name} {...product} />
                ))}
            </div>
        </div>
    );
};