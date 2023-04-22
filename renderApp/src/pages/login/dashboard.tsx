import { redirect, useNavigate } from "react-router-dom";
import { useUserStore } from "../../state/userStore";
import { Button, H4 } from "@blueprintjs/core";
import { showNotification } from "../../util";

export const loader = ()=>{
    const {user} = useUserStore.getState();
    if (!user) {
      throw redirect("/login");
    }
    return 1;
}
export const DashboardComponent = ()=>{
    const {user, setUser} = useUserStore();
    const nav = useNavigate();
    return(
        <div style={{margin:'50px 100px'}}>
            <H4>Dashboard</H4>
            <Button intent="danger" onClick={()=>{
                setUser(null);
                nav("/");
                showNotification({
                    message: "Logged out",
                    intent: 'warning'
                });
            }}>Logout</Button>
            {user?.isAdmin && <div>
                <h4> Admin dashboard </h4>
                </div>}
        </div>
    );
}