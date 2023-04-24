import { Button, Card, H4, H5 } from "@blueprintjs/core";
import axios from "axios";
import { User } from "../../state";
import { ActionFunction, redirect, useNavigate, useSubmit } from "react-router-dom";

// export const loader = async()=>{
//     const user = useUserStore.getState().user;
//     if(!user?.isAdmin){
//         throw redirect("/");
//     }
//     return 1;
// };

export const action = (async ({ request })=>{
    const data = await request.formData();
    const userId = data.get("userId");
    await axios.delete(`/api/user/${userId}`).catch(e=>{
        console.error("error on user deletion:", e);
    });
    return redirect("/dashboard");
}) satisfies ActionFunction;

export const AdminDashboard = (props:{allUsers: User[]})=>{
    const nav = useNavigate();
    const submit = useSubmit();
    const {allUsers} = props;
    return (
            <div style={{margin:'50px 100px'}}>
                <H4> Admin Dashboard </H4>
                <H5>User list:</H5>
                {allUsers.map(u=>
                    <Card style={{width:"100%", display:'flex', justifyContent:'space-between'}}>
                        <p>{u.username}</p>
                        <Button icon="trash" intent="danger" onClick={async ()=>{
                            submit({userId: u._id},{method:'delete', action:"/user"});
                        }
                        }></Button>
                         </Card>
                    )}
                    <H5>Create new users here: <Button icon="mugshot" onClick={()=>{
                        nav("/login");
                    }}></Button></H5>
                    <H5>Create new products here: <Button icon="barcode" onClick={()=>{
                        nav("/newProduct");
                    }}></Button></H5>
            </div>
    );
}