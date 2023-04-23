import { Card } from "@blueprintjs/core";
import { ProductInfo, ReviewProps } from "./productTypes";
import Rate from 'rc-rate';
import 'rc-rate/assets/index.css';
import { useUserStore } from "../state/userStore";
import { round10 } from "../util";

export const ReviewCardComponent = (props:{review: ReviewProps, onClick?:()=>void}) => {
    const {review} = props;
    const user = useUserStore((s)=>s.user);

    // shouldn't be possible to have a review without a rating or comment, but just in case
    if(review.rating==null && review.comment==null) return null;

    // user's own rating is handled in a separate place
    if(user?.username === review.username) return null;
    
    return (
        <Card style={{margin:'10px'}} onClick={props.onClick} interactive={!!props.onClick}>
            <h4 style={{margin:'10px 0'}}><b>{review.username}</b></h4>
            <h4 style={{margin:'10px 0'}}><b>{review.productName}</b></h4>
            {/* <hr/> */}
            {review.rating!=null && <Rate disabled value={review.rating}/>}
            {review.comment!=null && <p style={{marginTop:'5px'}}>{review.comment}</p>}
        </Card>
    );
};
// <EditableReviewComponent product={product}/>
export const ReviewPropsComponent = (props:{productInfo: ProductInfo}) => {
    const {productInfo} = props;
    return (
        <div style={{textAlign:'initial'}}>
            {productInfo.reviews.length > 0 ? <>
                <hr/>
                <h2>Reviews: {productInfo.reviews.length}</h2>
                <h4>Average Rating: ({round10(productInfo.avgRating)}/5)</h4>
                <Rate value={productInfo.avgRating} allowHalf disabled/>
                {productInfo.reviews.map((review) => <ReviewCardComponent key={review.username} review={review}/>)}
            </>:<h2>No reviews yet</h2>}
        </div>
    );
};