import { Card, CardBody, CardHeader, Text } from '@chakra-ui/react';


const ThumbnailCard = (children) => {
    const cardStyle = {
        backgroundImage: `url(${children.thumbnail})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        width: children.width || '280px', // Set a default width if not provided
        height: children.height || '600px', 
        cursor: 'pointer',
    };

    const textStyle = {
        color: '#ffffff',
    };
    
    return (
        <Card style={cardStyle} onClick={children.onClick}>
            <CardHeader>
                <Text style={textStyle}>
                    {children.title}
                </Text>
            </CardHeader>
            <CardBody></CardBody>
        </Card>
    )
}

export default ThumbnailCard;