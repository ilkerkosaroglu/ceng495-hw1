import { Button, FormGroup, InputGroup } from "@blueprintjs/core";

export const loader = () =>{
    return 1;
};

export const LoginPage = () => {
    return (
        <div style={{width: '100vw'}}>
            <h1>Login Page</h1>
            <div style={{display:'flex', justifyContent:'center', width:'100%'}}>
                <form method="post" action="/loginAttempt" 
                style={{display:'flex', justifyContent:'center'}}
                // onSubmit={(e)=>{e.preventDefault(); console.log(e.target);} }
                >
                <FormGroup>
                    <InputGroup className="m" round id="text-input" 
                    placeholder="Username"/>
                    <InputGroup className="m" round leftIcon="lock" type="password" id="p-input"
                    placeholder="Password"/>
                    <Button className="m p" style={{borderRadius:'8px'}} type="submit" intent="primary">Submit</Button>
                </FormGroup>
                </form>
            </div>
        </div>
    );
};