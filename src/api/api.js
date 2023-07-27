import axios from "axios";
 

export async function AllCategoryData() {
    const categoryList = await axios.get('https://dummyjson.com/products/categories');
    return categoryList;
};


export async function productsData() {
    const products = await axios.get('https://dummyjson.com/products');
    return products;
};

export async function jeweleryData() {
    const products = await axios.get('https://dummyjson.com/products/category/womens-jewellery');
    return products;
};
export async function mensData() {
    const products = await axios.get('https://dummyjson.com/products/category/mens-shirts');
    return products;
};
export async function womensDressData() {
    const products = await axios.get('https://dummyjson.com/products/category/womens-dresses');
    return products;
};
export async function mensWatchesData() {
    const products = await axios.get('https://dummyjson.com/products/category/mens-watches');
    return products;
};
export async function smartphonesData() {
    const products = await axios.get('https://dummyjson.com/products/category/smartphones');
    return products;
};
export async function laptopsData(){
    const products = await axios.get('https://dummyjson.com/products/category/laptops');
    return products;
};
export async function lightingData() {
    const products = await axios.get('https://dummyjson.com/products/category/lighting');
    return products;
};
export async function automotiveData() {
    const products = await axios.get('https://dummyjson.com/products/category/automotive');
    return products;
};
export async function womensWatchData(){
    const products = await axios.get('https://dummyjson.com/products/category/womens-watches');
    return products;
};
export async function womensBagData(){
    const products = await axios.get('https://dummyjson.com/products/category/womens-bags');
    return products;
};
export async function womensShoeData(){
    const products = await axios.get('https://dummyjson.com/products/category/womens-shoes');
    return products;
};
export async function homeDecorData(){
    const products = await axios.get('https://dummyjson.com/products/category/home-decoration');
    return products;
};
export async function furnitureData(){
    const products = await axios.get('https://dummyjson.com/products/category/furniture');
    return products;
};
export async function motorcycleData(){
    const products = await axios.get('https://dummyjson.com/products/category/motorcycle');
    return products;
};
export async function groceriesData(){
    const products = await axios.get('https://dummyjson.com/products/category/groceries');
    return products;
};
export async function mensShoeData(){
    const products = await axios.get('https://dummyjson.com/products/category/mens-shoes');
    return products;
};
export async function sunglassesData(){
    const products = await axios.get('https://dummyjson.com/products/category/sunglasses');
    return products;
};
export async function fragrancesData(){
    const products = await axios.get('https://dummyjson.com/products/category/fragrances');
    return products;
};
export async function skincareData(){
    const products = await axios.get('https://dummyjson.com/products/category/skincare');
    return products;
};
export async function topsData(){
    const products = await axios.get('https://dummyjson.com/products/category/tops');
    return products;
};

