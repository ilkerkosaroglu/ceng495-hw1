
export type ReviewProps = {
    user: string;
    rating: number;
    comment: string;
};

export const reviewPropsComponent = (props: {reviews:ReviewProps[], averageRating:number}) => {
    return (
        <div>
                <hr/>
                <hr/>
                <h4>Average Rating: ({props.averageRating})</h4>
                <h4>Reviews: ({props.reviews.length})</h4>
                {props.reviews.map((review, index) => {
                    return (
                        <div key={index}>
                            <h4><b>{review.user}</b></h4>
                            <h4><b>{review.rating}</b></h4>
                            <p>{review.comment}</p>
                            <hr/>
                        </div>
                    );
                })}
        </div>
    );
};