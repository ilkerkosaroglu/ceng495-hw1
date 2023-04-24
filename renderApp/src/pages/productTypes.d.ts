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
    avgRating: number;
};

export type ReviewProps = {
    username?: string; // user _id
    to: string, // product _id
    productName?: string; // only applies to dashboard
    category?: string; // only applies to dashboard
    rating: number;
    comment: string;
};
