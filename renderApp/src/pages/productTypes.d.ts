export interface ProductProps {
    _id: string;
    name: string;
    description: string;
    price: number;
    image: string;
    seller: string;
};

export interface ProductInfo extends ProductProps {
    reviews: ReviewProps[];
};

export type ReviewProps = {
    username: string;
    rating: number;
    comment: string;
};
