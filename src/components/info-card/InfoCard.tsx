import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import './InfoCard.css';
import { PodcastInfo } from '../../models/Podcast.model';
import { useNavigate } from 'react-router-dom';

function InfoCard(props: PodcastInfo) {

    const navigate = useNavigate()

    const handleCardClick = () => {
        navigate(`/podcast/${props.id}`);
    }

  return (
    <Col lg={3} md={3} sm={6} xs={12} className="pt-5 mt-5" key={props.id}>
        <Card className="shadow pointer" onClick={handleCardClick}>
            <Card.Img className="card-top-image" src={props.image} />
            <Card.Body className='text-center'>
                <Card.Title className="text-uppercase fs-6 fw-bold">{props.name}</Card.Title>
                <Card.Text>
                    <small className="text-muted">Author: {props.author}</small>
                </Card.Text>
            </Card.Body>
        </Card>
    </Col>
  );
}

export default InfoCard;