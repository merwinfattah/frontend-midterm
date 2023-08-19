import React, { useState, useEffect } from 'react';
import { Flex, Box, Text, List, ListItem, UnorderedList, AspectRatio, FormControl, FormLabel, Input, Textarea, Button, Link as ChakraLink, defineStyle, defineStyleConfig} from '@chakra-ui/react';
import { useLocation, useNavigate, Link as ReactRouterLink } from 'react-router-dom';
import VideoDataService from "../api/services/video.service";
import ProductDataService from "../api/services/product.service";
import CommentDataService from '../api/services/comment.service';
import ProductCard from './ProductCard';

const white = defineStyle({
    color: '#ffffff',
})

export const styles = defineStyleConfig({
    color: {white},
})

const VideoDetail = () => {
    const location = useLocation(); // Get the location object
    const navigate = useNavigate();
    const pathnameParts = location.pathname.split('/'); // Split the pathname into parts
    const id = pathnameParts[pathnameParts.length - 1]; // Get the last part as the id
    console.log(id);
    const [videos, setVideos] = useState([]);
    const [products, setProducts] = useState([]);
    const [comments, setComments] = useState([]);
    const [comment, setComment] = useState({
        username: '',
        comment: '',
        timestamp: Date.now(),
        video_id: id,
    });

    async function handleUsernameInput(e) {
        setComment({
            ...comment,
            username: e.target.value,
        });
    }

    async function handleCommentInput(e) {
        setComment({
            ...comment,
            comment: e.target.value,
        });
    }

    async function handleSubmit(e) {
        e.preventDefault();
        await CommentDataService.create(comment)
            .then(response => {
                console.log(response.data);
            })
            .catch(e => {
                console.error(e);
            });

        setComments([...comments, comment]);
        setComment({
            ...comment,
            username: '',
            comment: '',
        });
    }

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

    async function retrieveComments(id) {
        await CommentDataService.get(id)
            .then(response => {
                setComments(response.data);
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
            retrieveComments(id);
        } catch (error) {
            console.error(error);
        }
    }, [id]);

    return (
        <React.Fragment>
            <Box>
                <ChakraLink as={ReactRouterLink} to='/' color={styles}>Back to Home</ChakraLink>
                <h1 className={`text-[#04e413] mb-10`}>Product Video</h1>
            </Box>
            <Flex gap={6}>
                <Box w='80%' h='100%'>
                    <h2 className={`text-left mb-3 text-lg text-white`}>Other Products</h2>
                    <List spacing='10px'>
                        {products.filter((product) => product.video_id !== id).map((product) => (
                            <ListItem key={product._id}>
                                <ProductCard 
                                    title={product.title}
                                    thumbnail={videos.find((video) => video._id === product.video_id)?.thumbnail}
                                    price={product.price}
                                    onClick={() => navigate(`/video-detail/${product.video_id}`)}
                                />
                            </ListItem>
                        ))}
                    </List>
                </Box>
                <Box  w='100%' h='100%'>
                    <AspectRatio maxW='560px' ratio={1}>
                        <iframe
                            title={products.find((product) => product.video_id === id)?.title}
                            src={videos.find((video) => video._id === id)?.url}
                            allowFullScreen
                        />
                    </AspectRatio>
                </Box>   
                <Box  w='80%' h='100%'>
                    <h2 className={`text-left mb-3 text-lg text-white`}>Comments</h2>
                    <UnorderedList spacing='2.5'>
                        {comments.filter((comment) => comment.video_id === id).map((comment) => {
                         const createdDate = new Date(comment.timestamp);
                         const formattedDate = createdDate.toLocaleDateString('id-ID', {
                           day: '2-digit',
                           month: 'long',
                           year: 'numeric',
                         });
                        return (
                            <ListItem key={comment._id} color='whiteAlpha.500'>
                                <Box className={`text-left text-white`}>
                                    {comment.username}
                                    <small className={`block`}>{formattedDate}</small>
                                </Box>
                                <Text className={`text-left text-white mt-3`}>{comment.comment}</Text>
                            </ListItem>
                        )})}
                    </UnorderedList>
                    <h2 className={`text-left mb-3 text-lg text-white mt-8`}>Add Comment</h2>
                    <form onSubmit={handleSubmit}>
                        <FormControl id="username">
                            <FormLabel id="username" className={`text-white`}>Username</FormLabel>
                            <Input type="text" id="username" className={`text-white`} onChange={handleUsernameInput} value={comment.username}  />
                        </FormControl>
                        <FormControl id="comment">
                            <FormLabel id="comment" className={`text-white`}>Comment</FormLabel>
                            <Textarea id="comment" className={`text-white`} onChange={handleCommentInput} value={comment.comment} />
                        </FormControl>
                        <Button type='submit' className={`mt-5`}>Submit</Button>
                    </form>
                </Box>
            </Flex>
        </React.Fragment>
    )
}

export default VideoDetail;