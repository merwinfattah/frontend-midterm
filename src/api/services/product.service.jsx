import { apiGet } from "../http-get";

const ProductDataService = {
    getAll() {
        return apiGet.get("/products");
    },
    get(id) {
        return apiGet.get(`/products/${id}`);
    }
}

export default ProductDataService;