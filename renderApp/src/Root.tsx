import { Alignment, Button, Navbar } from '@blueprintjs/core';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { useUserStore } from './state/userStore';
import { showNotification } from './util';
export const loader = () =>{
    return 1;
};
export const Root = () => {
    const {user, setUser} = useUserStore();
    const nav = useNavigate();
    return (
        <div style={{height: '100%'}}>
            <Navbar>
                <Navbar.Group style={{width:'100%', justifyContent:'space-between'}} align={Alignment.LEFT}>
                <Navbar.Heading  style={{fontSize: "30px"}}>
                    <Link to='/' style={{textDecoration:'none', color:'inherit'}}>ProductSepeti</Link>
                </Navbar.Heading>
                {user && <Navbar.Heading style={{fontSize: "30px"}}>Welcome {user.username}</Navbar.Heading>}
                <Navbar.Group>

                {user?.isAdmin && 
                <Button style={{marginRight:'5px'}} intent='primary' onClick={()=>{
                    nav('/dashboard');
                }}>Dashboard</Button>}
                { user ?
                    <Button intent="danger" onClick={()=>{
                        setUser(null);
                        nav("/");
                        showNotification({
                            message: "Logged out",
                            intent: 'warning'
                        });
                    }}>Logout</Button> 
                    :
                    <Button intent='primary' onClick={()=>{
                        nav('/login');
                    }}>Login</Button>
                }
                </Navbar.Group>
                </Navbar.Group>
            </Navbar>
            <Outlet/>
        </div>
    );
};
