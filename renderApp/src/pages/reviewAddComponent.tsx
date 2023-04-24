import Rate from "rc-rate";
import { ProductInfo, ReviewProps } from "./productTypes";
import { create } from "zustand";
import { useCallback, useEffect, useState } from "react";
import { ActionFunction, Form, redirect, useSubmit } from "react-router-dom";
import axios from "axios";
import { Button, ButtonGroup, Card, Classes } from "@blueprintjs/core";
import { showNotification } from "../util";
import { useUserStore } from "../state/userStore";

type StoreType = {selfReview:ReviewProps|null, setSelfReview:(user:ReviewProps|null)=>void};
export const useSelfReview = create<StoreType>((set) => ({
    selfReview: null,
    setSelfReview: (review) => set({selfReview: review}),
}));

export const action = (async ({request, params})=>{
    const user = useUserStore.getState().user;
    const formData = await request.formData();
    const productId = params.productId;
    const newRating = formData.get('rating');
    const newComment = formData.get('comment');
    const data = {productId, rating: newRating, comment: newComment};
    await axios.put('/api/review/'+user?._id+'/edit', data).then((res)=>{
        showNotification({
            intent: 'success',
            message: 'Review submitted successfully!',
        });
    }).catch(e=>{
        console.error("err submitting review:", e, data, '/api/review/'+user?._id+'/edit');
        showNotification({
            intent: 'danger',
            message: 'Review error!',
        });
    });
    return redirect(window.location.pathname);
}) satisfies ActionFunction;

export const ReviewAddComponent = (props:{product: ProductInfo}) => {
    const {product} = props;
    const selfReview = useSelfReview((s)=>s.selfReview);
    const oldReview = selfReview?.to === product._id ? selfReview : null;
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');
    const [editButtonsActive, setEditButtonsActive] = useState(false);
    const submit = useSubmit();

    useEffect(()=>{
        if(oldReview){
            setRating(rating || oldReview.rating || 0);
            setComment(comment || oldReview.comment || '');
        }
    }, [oldReview, rating, comment]);

    const onSubmit = useCallback((e: React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        const ratingToSend = rating.toString() || oldReview?.rating?.toString() || '';
        const commentToSend = e.currentTarget.comment.value as string || oldReview?.comment || '';
        submit({rating: ratingToSend, comment: commentToSend}, {method: 'put', action: '/review/'+product._id+'/edit'});
    }, [submit, rating, product._id, oldReview]);

    useEffect(()=>{
        // check if there are ongoing edits
        if(rating===(oldReview?.rating||0) && comment===(oldReview?.comment||'')){
            setEditButtonsActive(false);
        }else{
            setEditButtonsActive(true);
        }
    }, [rating, comment, oldReview]);

    return (
        <div style={{textAlign:'initial'}}>
            <Card>
                <Form action={"/review/"+product._id+"/edit"} method="post" onSubmit={onSubmit}>
                <h2>Rate this product: <Rate value={rating} onChange={(val:number)=>{
                    setRating(val);
                }} /></h2>
                <h4>Your comment for this product:</h4>
                <textarea className={Classes.INPUT+" "+Classes.ROUND} value={comment} onChange={(e)=>{
                    setComment(e.target.value);
                }} style={{width:'360px', height:'120px'}}  name="comment" id="desc-input"
                        placeholder={'Your comment here'} defaultValue={oldReview?.comment}/>
                        <ButtonGroup>
                            <Button className="m" type="submit" disabled={!editButtonsActive} intent="primary" icon='send-to'>Submit</Button>
                            <Button className="m" disabled={!editButtonsActive} intent="none" icon='reset' onClick={()=>{
                                setRating(oldReview?.rating || 0);
                                setComment(oldReview?.comment || '');
                            }}>Reset</Button>
                        </ButtonGroup>
                </Form>
            </Card>
        </div>
    );
};