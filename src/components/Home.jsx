import { Wrap, WrapItem } from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import VideoDataService from "../api/services/video.service";
import ProductDataService from "../api/services/product.service";
import ThumbnailCard from "./ThumbnailCard";
import { useNavigate } from 'react-router-dom';


const Home = () => {
    const [videos, setVideos] = useState([]);
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();


    async function retrieveVideos() {
        await VideoDataService.getAll()
            .then(response => {
                setVideos(response.data);
                console.log(response.data);
            })
            .catch(e => {
                console.error(e);
            });
    }

    async function retrieveProducts() {
        await ProductDataService.getAll()
            .then(response => {
                setProducts(response.data);
                console.log(response.data);
            })
            .catch(e => {
                console.error(e);
            });
    }

    useEffect(() => {
        try {
            retrieveVideos();
            retrieveProducts();
        } catch (error) {
            console.error(error);
        }
    }, []);

        
    return (
        <React.Fragment>
            <h1 className={`mb-8 text-[#04e413]`}>Tokopedia Clone</h1>
            <Wrap spacing='10px'>
                {videos.map((video) => ( 
                    <WrapItem key={video._id}>
                        <ThumbnailCard  
                        title={products.find((product) => product.video_id === video._id).title} 
                        thumbnail={video.thumbnail}
                        onClick={() => navigate(`/video-detail/${video._id}`)}
                         />
                    </WrapItem>
                ))}
            </Wrap>
        </React.Fragment>
    )
}

export default Home