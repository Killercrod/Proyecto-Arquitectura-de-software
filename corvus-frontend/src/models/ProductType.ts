import type { Category } from "./categoryType";
import type { ProductImage } from "./ProductImageType";
// export interface ProductImage {
// 	id: number;
// 	url: string; // adjust to the real field name your API returns
// }

export interface Product{
    id: number;
    name: string;
    description: string;
    category: Category;
    price: number;
    stock: number;
    images: ProductImage[];
};

export type UpdateProduct = Partial<Product>;

export const emptyProduct: Product = {
    id: 0,
    name: "",
    description: "",
    category: {
        id: 0,
        name: "",
    },
    price:0,
    stock: 0,
    images: []
}
