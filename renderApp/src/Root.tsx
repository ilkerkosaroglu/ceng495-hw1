import React from 'react';
import { useLoaderData, LoaderFunction, Link, Outlet } from 'react-router-dom';
import { LoaderData } from './routerTypes';
import axios from 'axios';

type Category = {
    name: string;
    count: number;
};
type Categories = Category[];

export const loader = (async () =>
    axios.get('/api/categories').catch(()=>{
        throw new Error('Failed to load categories');
    }).then((resp)=>{
        return resp.data as Categories;
    })) satisfies LoaderFunction;

export const Root = () => {
    const categories = useLoaderData() as LoaderData<typeof loader>;
    if(!categories) return (<div>Loading...</div>);
    return (
        <div>
            <h1>Root</h1>
            <ul>
                {categories.map((category) => (
                    <li key={category.name}>
                        <Link to={category.name}>{category.name} ({category.count})</Link>
                    </li>
                ))}
            </ul>
            <Outlet />
        </div>
    );
};
