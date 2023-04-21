import { Outlet } from 'react-router-dom';
export const loader = () =>{
    return 1;
};
export const Root = () => {
    return (
        <div>
            <h1>Root</h1>
            <Outlet/>
        </div>
    );
};
