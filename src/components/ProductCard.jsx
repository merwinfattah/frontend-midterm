import { Box, Card, CardBody, CardFooter, Text } from '@chakra-ui/react';

const ProductCard = (children) => {
    const cardStyle = {
        backgroundColor: '#000000',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        width: children.width || '300px', // Set a default width if not provided
        height: children.height || '300px', 
        cursor: 'pointer',
        color: '#ffffff',
    };

    const cardBodyStyle = {
        backgroundImage: `url(${children.thumbnail})`,
        backgroundPosition: 'center',
    };
    
    return (
        <Card style={cardStyle} onClick={children.onClick}>
            <CardBody style={cardBodyStyle}>
            </CardBody>
            <CardFooter>
                <Box className={`text-left`}>
                    <Text>{children.title}</Text>
                    <Text>Rp. {children.price}</Text>
                </Box>
            </CardFooter>
        </Card>
    )
}

export default ProductCard;