import axios from 'axios';
import React from 'react';
import { LoaderFunction, useLoaderData } from 'react-router-dom';
import { CardComponent } from './productCard';
import { LoaderData } from '../routerTypes';
import { ProductDialogComponent } from './productDialog';
import { ProductProps } from './productTypes';

export const loader = (async ({ params }) =>
    axios.get(`/api/products/${params.category}`).catch(()=>{
        throw new Error('Failed to load products of ' +params.category+ ' category');
    }).then((resp)=>{
        return resp.data as ProductProps[];
    })) satisfies LoaderFunction;

export const ProductsComponent = () => {
    const products = useLoaderData() as LoaderData<typeof loader>;
    return (
        <div style={{backgroundColor: '#f2f3ee', padding:'0px 20px 20px 20px', width:'100%'}}>
            <h1 className='titleText'>Products</h1>
            <div style={{display:'flex', flexWrap:'wrap'}}>
                {products.map((product) => (
                    <>
                    <CardComponent key={product.name} {...product} />
                    <CardComponent key={product.name+"1"} {...product} />
                    <CardComponent key={product.name+"2"} {...product} />
                    </>
                ))}
                <ProductDialogComponent/>
            </div>
        </div>
    );
};