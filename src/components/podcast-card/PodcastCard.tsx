import Card from 'react-bootstrap/Card';
import { Link, useParams } from 'react-router-dom';
import { PodcastInfo } from '../../models/Podcast.model';

function PodcastCard(props: PodcastInfo) {

  return (
    <Card className="text-start p-3 shadow">
        <Card.Img className="p-5 pb-3" variant="top" src={props.image} />
        <hr />
        <Card.Body className="p-1">
            <Card.Title className="strong">{props.name}</Card.Title>
            <Card.Text>
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