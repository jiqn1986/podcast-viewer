import Card from 'react-bootstrap/Card';
import { useNavigate } from 'react-router-dom';
import { PodcastInfo } from '../../models/Podcast.model';

function PodcastCard(props: PodcastInfo) {

    const navigate = useNavigate();

    const handleCardClick = () => {
        navigate(`/podcast/${props.id}`)
    };

  return (
    <Card className="text-start p-3 shadow">
        <Card.Img className="image-top pointer" variant="top" src={props.image} onClick={handleCardClick}/>
        <hr />
        <Card.Body className="p-1" onClick={handleCardClick}>
            <Card.Title className="strong pointer">{props.name}</Card.Title>
            <Card.Text className='pointer'>
                <small>by {props.author}</small>
            </Card.Text>
        </Card.Body>
        <hr />
        <Card.Body className="p-1">
            <h6 className="strong">Description</h6>
            <p>
                {props.description !== '' 
                    ? props.description
                    : 'No description available'
                }
            </p>
        </Card.Body>
    </Card>
            
  );
}

export default PodcastCard;