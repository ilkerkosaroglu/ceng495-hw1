import { Dialog } from "@blueprintjs/core";
import { ProductProps } from "./productCard";
import { ProductInfoComponent } from "./productInfo";

export const ProductDialogComponent = (props:{isOpen:boolean, setOpen:(open:boolean)=>void, product:ProductProps}) => {
    return (
        <Dialog isOpen={props.isOpen} onClose={()=>props.setOpen(false)}
            title="Product Dialog"
        >
            <div style={{padding:'20px'}}>
                <ProductInfoComponent product={props.product}/>
            </div>
        </Dialog>
    );
};