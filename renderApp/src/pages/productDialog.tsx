import { Dialog } from "@blueprintjs/core";
import { ProductProps } from "./productCard";
import { ProductInfoComponent } from "./productInfo";
import { Outlet } from "react-router-dom";

export const ProductDialogComponent = (props:{isOpen:boolean, setOpen:(open:boolean)=>void, product:ProductProps}) => {
    return (
        <Dialog isOpen={props.isOpen} onClose={()=>props.setOpen(false)}
            title={props.product.name}
        >
            <div style={{padding:'20px'}}>
                <ProductInfoComponent product={props.product} noText/>
            </div>
            <Outlet/>
        </Dialog>
    );
};