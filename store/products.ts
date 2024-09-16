import { defineStore } from "pinia";

export const useProductsStore = defineStore('products', {
    state: () => ({
        products: []
    }), 
    actions: {
        async getAllProducts() {
            const { data: allProducts } = await useFetch('https://dummyjson.com/products');
            this.products = allProducts?.value?.products;
        }
    }
})