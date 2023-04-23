import { redirect, useLoaderData, useNavigate } from "react-router-dom";
import { useUserStore } from "../../state/userStore";
import { H3, H4 } from "@blueprintjs/core";
import { ReviewCardComponent } from "../reviewComponent";
import { LoaderData } from "../../routerTypes";
import axios from "axios";
import { ReviewProps } from "../productTypes";
import { round10 } from "../../util";

type UserReviews = {
    avgRating:number,
    reviews: ReviewProps[],
}

export const loader = async ()=>{
    const {user} = useUserStore.getState();
    if (!user) {
      throw redirect("/login");
    }
    const {data: userReviews} = await axios.post(`/api/userReviews`, {userId: user._id}).catch(()=>{
        throw new Error('Failed to load user reviews of ' +user.username);
    });
    return userReviews as UserReviews;
}
export const DashboardComponent = ()=>{
    const {user} = useUserStore();
    const nav = useNavigate();
    const {avgRating, reviews} = useLoaderData() as LoaderData<typeof loader>;
    if(!avgRating || !reviews) return null;
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
            <div style={{margin:'50px 100px'}}>
                {user?.isAdmin && <div>
                    <H4> Admin Dashboard </H4>
                    </div>}
            </div>
        </div>
    );
}