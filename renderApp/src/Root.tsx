import React from 'react';
import { useLoaderData, LoaderFunction, Link } from 'react-router-dom';
import { LoaderData } from './routerTypes';
import axios from 'axios';

type Category = {
    id: string;
    name: string;
};

type Categories = {
    categories: Category[];
};

export const loader = (async () =>
    axios.get('/api/categories').catch(()=>{
        throw new Error('Failed to load categories');
    }).then((resp)=>{
        return resp.data as Categories;
    })) satisfies LoaderFunction;
// export const loader = (async () => {
//     const resp = await axios.get('/api/categories');
//     if(resp.status !== 200) throw new Error('Failed to load categories');
//     return resp.data as Categories;
// }) satisfies LoaderFunction;

export const Root = () => {
    const {categories} = useLoaderData() as LoaderData<typeof loader>;
    if(!categories) return (<div>Loading...</div>);
    return (
        <div>
            <h1>Root</h1>
            <ul>
                {categories.map((category: any) => (
                    <li key={category.id}>
                        <Link to={category.id}>{category.name}</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};
