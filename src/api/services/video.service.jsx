import { apiGet } from "../http-get";

const VideoDataService = {
    getAll() {
        return apiGet.get("/videos");
    }
}

export default VideoDataService;