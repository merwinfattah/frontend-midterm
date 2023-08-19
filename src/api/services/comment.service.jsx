import { apiGet } from "../http-get";
import { api } from "../http-common";

const CommentDataService = {
    get(id) {
        return apiGet.get(`/comments/${id}`);
    },
    create(data) {
        return api.post("/comments", data);
    }
}

export default CommentDataService;