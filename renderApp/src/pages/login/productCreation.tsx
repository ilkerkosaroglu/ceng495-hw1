import { Button, Classes, FormGroup, H5, InputGroup, MenuItem, NumericInput } from "@blueprintjs/core";
import { Suggest } from "@blueprintjs/select";
import { ActionFunction, Form, LoaderFunction, redirect, useNavigate, useSubmit } from "react-router-dom";
import { useState } from "react";
import { useExtraProps } from "./productExtraStore";
import "@blueprintjs/select/lib/css/blueprint-select.css";
import { useUserStore } from "../../state/userStore";
import { showNotification } from "../../util";
import axios from "axios";

export const loader = (async () => {
    const {user} = useUserStore.getState();

    if(!user?.isAdmin){
        throw redirect("/login");
    }

    return 1;
}) satisfies LoaderFunction;

// export const action = (async ({ request })=>{
//     const data = await request.formData();
//     data.get("productData");
//     // await axios.delete(`/api/user/${userId}`).catch(e=>{
//     //     console.error("error on user deletion:", e);
//     // });
//     return redirect("/newProduct");
// }) satisfies ActionFunction;

const Suggester = (props:{extraProps:string[], setExtraProps:(items:string[])=>void, change:(s:string)=>void, picked:(str:string)=>void,[p:string]:any})=>{
    const {extraProps, setExtraProps} = props;
    return (
                    <Suggest {...props} items = {extraProps} 
                    itemRenderer={(item, {handleClick, modifiers})=>{
                        return (
                            <MenuItem
                                key={item}
                                roleStructure="listoption"
                                onClick={handleClick}
                                shouldDismissPopover={false}
                                text={item}
                            />
                        );
                    }}
                    createNewItemRenderer={(query, active, handleClick)=>{
                        return (
                            <MenuItem
                                icon="add"
                                text={`Create "${query}"`}
                                active={active}
                                key={query}

                                onClick={(e)=>{
                                    handleClick(e);
                                    if(query in extraProps) return;
                                    setExtraProps([...extraProps, query]);
                                }}
                                shouldDismissPopover={false}
                            />
                        );
                    }}
                    inputValueRenderer={(item)=>{
                        return item;
                    }}
                    createNewItemFromQuery={(query)=>{
                        props.change(query);
                        return query;
                    }} 
                    onItemSelect={props.picked}
                    />
    );
};

export const ProductCreationComponent = ()=>{
    const [url, setUrl] = useState('');
    const {categories, setCategories} = useExtraProps();
    // const submit = useSubmit();
    const [cat, setCat] = useState('');
    return (
            <div style={{margin:'50px 100px'}}>
                <Form action="/products" method="post"
                    style={{display:'flex', justifyContent:'center'}}
                    onSubmit={async (e:any)=>{
                        //add extra props
                        e.preventDefault();
                        // console.log(e);
                        // console.log(e.target[0]);
                        const data = {
                            name: e.target[0].value,
                            description: e.target[1].value,
                            price: e.target[2].value,
                            seller: e.target[5].value,
                            image: e.target[6].value,
                            category: e.target[7].value,
                            colour: e.target[8].value,
                            size: e.target[9].value,
                            spec: {[e.target[10].value]: e.target[11].value},
                        };
                        const p = window.location.pathname; 
                        await axios.put('/api/products/new', data).then((resp)=>{
                            showNotification({
                                intent:'success',
                                message:'Product created successfully!'
                            });
                        }).catch((e)=>{
                            showNotification({
                                intent:'danger',
                                message:'Product creation failed!'
                            });
                        });
                        // submit(data, {method:'put', action:'/api/products/new'});
                        // nav(p);
                        redirect(p);
                    }}
                >
                <FormGroup label="Create new item:">
                    <InputGroup className="m" round name="name" id="product-name"
                    placeholder="Name of your product"/>
                    
                    <textarea className={Classes.INPUT+" "+Classes.ROUND} style={{width:'360px', height:'120px'}}  name="description" id="desc-input"
                    placeholder="Description"/>

                    <NumericInput className="m" fill name="price" id="price-input"
                    placeholder="Price (TL)"/>

                    <InputGroup className="m" round name="seller" id="seller-input"
                    placeholder="Seller"/>

                    <div style={{display:'flex', justifyContent:'center'}}>
                    {
                        url ? <img src={url} alt="preview of URL" style={{width:'100px', height:'100px'}}/>
                        :
                        <div className={Classes.SKELETON} style={{width:'100px', height:'100px'}}/>
                    }
                    </div>

                    <InputGroup className="m" round value={url} onChange={(e)=>{
                        setUrl(e.target.value);
                    }} name="image" id="text-input"
                    placeholder="Image URL"/>



                    <H5>Category:</H5>
                    <Suggester round className="m" extraProps={categories} change={setCat} setExtraProps={setCategories} picked={(str)=>{
                        console.log("picked:", str);
                        setCat(str);
                    }}/>
                    <H5 className="m">Extra properties:</H5>
                    <InputGroup className="m" round name="colour" id="colour-input"
                    placeholder="Colour (optional)"/>
                    <InputGroup className="m" round name="size" id="size-input"
                    placeholder="Size (optional)"/>
                    <FormGroup subLabel="Spec (optional)" inline labelFor="opt" style={{display:'flex', alignItems:'center'}}>
                    <input className={'m '+Classes.INPUT+" "+Classes.ROUND} name="colour" id="opt"
                    placeholder="Field: (RAM/Size)"/>
                    <input className={'m '+Classes.INPUT+" "+Classes.ROUND} name="colour" id="opt"
                    placeholder="Value"/>
                    </FormGroup>
                    
                    <Button className="m p" style={{borderRadius:'8px'}} type="submit" intent="primary">Create</Button>
                </FormGroup>
                </Form>
            </div>
    );
}