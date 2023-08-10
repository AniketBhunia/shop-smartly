export interface Product {
    product_id:number;
    product_name:string;
    product_quantity:number;
    product_status:string;
    product_description:string;
    product_category:string;
    product_current_price:number;
    product_discount_price:number;
    product_image:number[];
    seller_id:number;
    // imageUrl:string;
    image:string;
}
export interface Review {
    review_id : number;
    product_id :number;
    user_id : number;
    posted_date : string;
    user_name: string;
    product_review_rating : number;
    product_image:number[];
    product_review_description : string;
    image:string;

}