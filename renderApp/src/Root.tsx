import React from 'react';
import { useLoaderData, LoaderFunction, Link } from 'react-router-dom';
import { LoaderData } from './routerTypes';
import axios from 'axios';

type Categories = {
    categories: string[];
};

export const loader = (async () =>
    axios.get('/api/categories').catch(()=>{
        throw new Error('Failed to load categories');
    }).then((resp)=>{
        return resp.data as Categories;
    })) satisfies LoaderFunction;

export const Root = () => {
    const {categories} = useLoaderData() as LoaderData<typeof loader>;
    if(!categories) return (<div>Loading...</div>);
    return (
        <div>
            <h1>Root</h1>
            <ul>
                {categories.map((category) => (
                    <li key={category}>
                        <Link to={category}>{category}</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};
