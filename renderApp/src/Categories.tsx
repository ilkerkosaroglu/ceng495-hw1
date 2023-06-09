import React from 'react';
import { useLoaderData, LoaderFunction, Link, Outlet, useNavigate, NavigateFunction, useMatch } from 'react-router-dom';
import { LoaderData } from './routerTypes';
import axios from 'axios';
import { Alignment, Button, Classes } from '@blueprintjs/core';
import { useExtraProps } from './pages/login/productExtraStore';
type Category = {
    name: string;
    count: number;
};
type Categories = Category[];

export const loader = (async () =>
    axios.get('/api/categories').catch(()=>{
        throw new Error('Failed to load categories');
    }).then((resp)=>{
        const categoriesRes = resp.data as Categories;
        const {categories} = useExtraProps.getState();
        categoriesRes.forEach((category)=>{
            if(!categories.includes(category.name)){
                useExtraProps.setState({categories:[...categories, category.name]});
            }
        });
        return categoriesRes;
    })) satisfies LoaderFunction;

const CategoryButton = (props: {category: Category, navigate:NavigateFunction}) => {
    const { category } = props;
    const active = useMatch(encodeURI(category.name));
    return (<Button
        alignText={Alignment.LEFT}
        fill
        minimal
        active={!!active}
        onClick={() => {
            props.navigate(category.name);
        }}
        key={category.name}>
            {category.name} ({category.count})
            <Link  to={category.name}></Link>
    </Button>);
};

export const CategoriesComponent = () => {
    let navigate = useNavigate();
    const categories = useLoaderData() as LoaderData<typeof loader>;
    if(!categories) return (<div>Loading...</div>);
    return (
        <div style={{display:'flex', minHeight:'calc(100vh - 50px)'}}>
            <div style={{backgroundColor:'#2e2e3c', padding:'0px 22px',borderRight:'gray solid 1px', textAlign:'initial', whiteSpace: 'nowrap'}}>
                <h1 className='white'>Categories</h1>
                <div className={Classes.DARK}>

                    {categories.map((category) => (<CategoryButton key={category.name} category={category} navigate={navigate} />))}
                </div>
            </div>
            <Outlet />
        </div>
    );
};
