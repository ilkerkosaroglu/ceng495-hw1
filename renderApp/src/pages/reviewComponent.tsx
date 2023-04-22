import { Card } from "@blueprintjs/core";
import { ProductInfo, ReviewProps } from "./productTypes";
import Rate from 'rc-rate';
import 'rc-rate/assets/index.css';

const ReviewCardComponent = (props:{review: ReviewProps}) => {
    const {review} = props;
    // shouldn't be possible to have a review without a rating or comment, but just in case
    if(review.rating==null && review.comment==null) return (<></>);
    return (
        <Card style={{margin:'10px'}}>
            <h4 style={{margin:'10px 0'}}><b>{review.username}</b></h4>
            {/* <hr/> */}
            {review.rating!=null && <Rate value={review.rating}/>}
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
                {/* <h4>Average Rating: ({props.averageRating})</h4> */}
                {productInfo.reviews.map((review) => <ReviewCardComponent key={review.username} review={review}/>)}
            </>:<h2>No reviews yet</h2>}
        </div>
    );
};