import { Outlet } from 'react-router-dom';
export const loader = () =>{
    return 1;
};
export const Root = () => {
    return (
        <div style={{height: '100%'}}>
            <h1>Root</h1>
            <Outlet/>
        </div>
    );
};
