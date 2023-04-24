import axios from "axios";
import { ReviewPropsComponent } from "./reviewComponent";
import { ProductInfoComponent } from "./productInfo";

import { LoaderData } from "../routerTypes";
import { LoaderFunction, useLoaderData } from "react-router-dom";
import { ProductInfo } from "./productTypes";
import { useEffect, useState } from "react";
import { ReviewAddComponent } from "./reviewAddComponent";
import { useUserStore } from "../state/userStore";

export const loader = (async ({ params }) =>{
    const productInfo = await axios.get(`/api/productInfo/${params.productId}`).catch(()=>{
        throw new Error('Failed to load product info of ' +params.productId+ ' product');
    }).then((resp)=>{
        return resp.data as ProductInfo;
    });
    return productInfo;
}) satisfies LoaderFunction;


export const ProductDetailedComponent = () => {
    const productInfoCurrent = useLoaderData() as LoaderData<typeof loader>;
    const user = useUserStore(s=>s.user);

    // to prevent flickering on close
    let [product, setLastProductInfo] = useState<ProductInfo | null>(productInfoCurrent);
    useEffect(()=>{
        if(productInfoCurrent){
            setLastProductInfo(productInfoCurrent);
        };
    }, [productInfoCurrent, setLastProductInfo]);

    if(!product) return null;

    return(
        <div style={{padding:'20px', textAlign:'center'}}>
            <ProductInfoComponent product={product} noText/>
            {user?._id&&<ReviewAddComponent product={product}/>}
            <ReviewPropsComponent productInfo={product}/>
        </div>
    );
};