import { LoaderFunction, useLoaderData } from "react-router-dom";
import { LoaderData } from "../routerTypes";
import axios from "axios";
import { ProductProps } from "./productCard";
interface ProductInfo extends ProductProps {
    reviews: ReviewProps[];
};
type ReviewProps = {
    username: string;
    rating: number;
    comment: string;
};

export const loader = (async ({ params }) =>{
    const productInfo = await axios.get(`/api/productInfo/${params.productId}`).catch(()=>{
        throw new Error('Failed to load product info of ' +params.productId+ ' product');
    }).then((resp)=>{
        console.log(resp.data);
        return resp.data as ProductInfo;
    });
    return productInfo;
}) satisfies LoaderFunction;

export const ReviewPropsComponent = () => {
    const productInfo = useLoaderData() as LoaderData<typeof loader>;
    if(!productInfo?.reviews.length) return (<div></div>);
    return (
        <div>
                <hr/>
                <hr/>
                {/* <h4>Average Rating: ({props.averageRating})</h4> */}
                <h4>Reviews: ({productInfo.reviews.length})</h4>
                {productInfo.reviews.map((review, index) => {
                    return (
                        <div key={index}>
                            <h4><b>{review.username}</b></h4>
                            <h4><b>{review.rating}</b></h4>
                            <p>{review.comment}</p>
                            <hr/>
                        </div>
                    );
                })}
        </div>
    );
};