import { redirect } from "react-router-dom";
import { useUserStore } from "../../state/userStore";
import { H4 } from "@blueprintjs/core";

export const loader = ()=>{
    const {user} = useUserStore.getState();
    if (!user?.isAdmin) {
      throw redirect("/login");
    }
    return 1;
}
export const DashboardComponent = ()=>{
    const {user} = useUserStore();
    return(
        <div style={{margin:'50px 100px'}}>
            {user?.isAdmin && <div>
                <H4> Admin dashboard </H4>
                </div>}
        </div>
    );
}