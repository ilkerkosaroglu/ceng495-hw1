import { redirect, useLoaderData, useNavigate } from "react-router-dom";
import { useUserStore } from "../../state/userStore";
import { H3 } from "@blueprintjs/core";
import { ReviewCardComponent } from "../reviewComponent";
import { LoaderData } from "../../routerTypes";
import axios from "axios";
import { ReviewProps } from "../productTypes";
import { round10 } from "../../util";
import { AdminDashboard } from "./adminDashboard";
import { User } from "../../state";

type UserReviews = {
    avgRating:number,
    reviews: ReviewProps[],
}

export const loader = async ()=>{
    const {user} = useUserStore.getState();
    if (!user) {
      throw redirect("/login");
    }
    const {data:userReviews}:{data:UserReviews} = await axios.post(`/api/userReviews`, {userId: user._id}).catch(()=>{
        throw new Error('Failed to load user reviews of ' +user.username);
    });

    if(!user.isAdmin){
        return {userReviews};
    }

    // user is admin

    const {data: allUsers}:{data:User[]} = await axios.get("/api/allUsers").catch(()=>{
        throw new Error('Failed to load all users.');
    });

    return {userReviews, allUsers};
}

export const DashboardComponent = ()=>{
    const user = useUserStore(s=>s.user);
    const nav = useNavigate();
    // const act = useAction
    const {userReviews:{avgRating, reviews}, allUsers} = useLoaderData() as LoaderData<typeof loader>;
    if(avgRating===undefined || reviews===undefined) return null;
    return(
        <div style={{width:'80%', maxWidth:'800px', display:'inline-block', padding:'50px'}}>

            {reviews.length > 0 ? <div>
                <H3>Your reviews: (Average: {round10(avgRating)}/5)</H3>
                {/* <H3>Your reviews: {avgRating?`(Average: ${round10(avgRating)}/5)`:''}</H3> */}
                {reviews && (reviews.map((review, i) => <ReviewCardComponent 
                    key={i} 
                    review={review}
                    onClick={(review.category&&review.to) ?()=>{
                        nav(`/${review.category}/${review.to}`)
                    }: undefined}
                />))}
            </div>:
                <H3>You haven't reviewed anything yet.</H3>
            }
            {user?.isAdmin && allUsers &&
                <AdminDashboard allUsers={allUsers}/>
            }
        </div>
    );
}