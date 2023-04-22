import React from 'react';
import { useLoaderData, LoaderFunction, Link, Outlet, useNavigate } from 'react-router-dom';
import { LoaderData } from './routerTypes';
import axios from 'axios';
import { Alignment, Button, Classes } from '@blueprintjs/core';
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

export const CategoriesComponent = () => {
    let navigate = useNavigate();
    const categories = useLoaderData() as LoaderData<typeof loader>;
    if(!categories) return (<div>Loading...</div>);
    return (
        <div style={{display:'flex', height:'100%'}}>
            <div style={{backgroundColor:'#2e2e3c', padding:'0px 22px',borderRight:'gray solid 1px', textAlign:'initial', whiteSpace: 'nowrap'}}>
                <h1 className='white'>Categories</h1>
                <div className={Classes.DARK}>

                    {categories.map((category) => (
                        <Button
                        alignText={Alignment.LEFT}
                        fill
                        minimal
                        onClick={() => {
                            navigate(category.name);
                        }}
                        key={category.name}>
                            {category.name} ({category.count})
                            <Link  to={category.name}></Link>
                        </Button>
                    ))}
                </div>
            </div>
            <Outlet />
        </div>
    );
};
