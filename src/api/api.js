import axios from "axios";
 
export async function AllCategoryData() {
    const categoryList = await axios.get('https://dummyjson.com/products/categories');
    return categoryList;
};

export async function productsData() {
    const products = await axios.get('https://dummyjson.com/products?limit=100');
    return products;
};
