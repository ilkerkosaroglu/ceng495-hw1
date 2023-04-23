import { Button, FormGroup, InputGroup } from "@blueprintjs/core";
import axios from "axios";
import { ActionFunction, Form, redirect } from "react-router-dom";
import { showNotification } from "../../util";
import { User } from "../../state";
import { useUserStore } from "../../state/userStore";

export const loader = ()=>{
    const {user} = useUserStore.getState()
    if(user && !user.isAdmin){
        throw redirect("/dashboard");
    }
    return 1;
}

export const action = (async ({ request })=>{
        const data = await request.formData();
        const username = data.get("username");
        const password = data.get("password");
        const log = data.get("log");
        let user:User;
        try{
            if(log!=null){
                //login
                const {data:userData} = await axios.post("/api/login", {username, password}) as {data:User};
                user = userData;
            }else{
                //signup
                const {data:userData} = await axios.post("/api/login/signup", {username, password}) as {data:User};
                user = userData;
                showNotification({
                    message: "Sign up successful: "+user.username,
                    intent:'success'
                });
                return redirect("/login");
            }
        }catch(e:any){
            showNotification({
                message: e.response.data.message,
                intent:'danger'
            });
            return redirect("/login");
        }
        useUserStore.setState({user});
        showNotification({
            message: "Login as: "+user.username,
            intent:'success'
        });
        return redirect("/");
      }) satisfies ActionFunction;

export const LoginPage = () => {
    const user = useUserStore(s=>s.user);
    return (
        <div style={{width: '100vw'}}>
            <h1>Login Page</h1>
            <div style={{display:'flex', justifyContent:'center', width:'100%'}}>
                <Form action="/login" method="post"
                    style={{display:'flex', justifyContent:'center'}}
                >
                <FormGroup>
                    <InputGroup className="m" round name="username" id="text-input"
                    placeholder="Username"/>
                    <InputGroup className="m" round leftIcon="lock" type="password" id="p-input" name="password"
                    placeholder="Password"/>
                    <Button className="m p" style={{borderRadius:'8px'}} type="submit" name="log" intent="primary">Log in</Button>
                    {user?.isAdmin &&
                        <Button className="m p" style={{borderRadius:'8px'}} type="submit" name="sign" intent="primary">Create user</Button>
                    }
                </FormGroup>
                </Form>
            </div>
        </div>
    );
};