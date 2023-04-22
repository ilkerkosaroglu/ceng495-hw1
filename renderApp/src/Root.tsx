import { Alignment, Button, Navbar } from '@blueprintjs/core';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { useUserStore } from './state/userStore';
export const loader = () =>{
    return 1;
};
export const Root = () => {
    const user = useUserStore((state)=>state.user);
    const nav = useNavigate();
    return (
        <div style={{height: '100%'}}>
            <Navbar>
                <Navbar.Group style={{width:'100%', justifyContent:'space-between'}} align={Alignment.LEFT}>
                <Navbar.Heading  style={{fontSize: "30px"}}>
                    <Link to='/' style={{textDecoration:'none', color:'inherit'}}>ProductSepeti</Link>
                </Navbar.Heading>
                {user && <Navbar.Heading style={{fontSize: "30px"}}>Welcome {user.username}</Navbar.Heading>}
                {user ? 
                <Button intent='primary' onClick={()=>{
                    nav('/dashboard');
                }}>Dashboard</Button>
                :
                <Button intent='primary' onClick={()=>{
                    nav('/login');
                }}>Login</Button>
                }
                </Navbar.Group>
            </Navbar>
            <Outlet/>
        </div>
    );
};
