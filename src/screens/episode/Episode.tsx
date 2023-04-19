import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
//import './Podcast.css';
import { Col, ListGroup, Table } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import { Link, useParams } from 'react-router-dom';
import { getPodcastDetails } from '../../services/podcast.service';
import { useEffect, useState } from 'react';
import { PodcastInfo } from '../../models/Podcast.model';
import { formatDate, msToTime } from '../../helpers/timeHelper';
import { EpisodeInfo } from '../../models/Episode.model';
import { Response, ResponseContent } from '../../models/Response.model';
import PodcastCard from '../../components/podcast-card/PodcastCard';

function Episode() {

    const episode: EpisodeInfo = {
        id: 0,
        name: '',
        duration: 0,
        date: '',
        url: ''
    };
    const emptyInfo: PodcastInfo = {
        id: 0,
        name: '',
        author: '',
        image: ''
    }

    const [podcastInfo, setPodcastInfo] = useState(emptyInfo);
    const [podcastEpisode, setPodcastEpisode] = useState(episode);
    const params = useParams();

    useEffect(() => {
        if (params.podcastId && params.episodeId) {
            const podcastId = parseInt(params.podcastId);
            const episodeId = parseInt(params.episodeId);
            /**
             * Reusing same service since no endpoint was provided to get and especific episode info
             */
            const podcastDetails = getPodcastDetails(params.podcastId);
    
            podcastDetails.then(
                (podcast: any) => {
                    const podcastResult: Response = JSON.parse(podcast.data.contents);
                    podcastResult.results.forEach((result: ResponseContent) => {
                        if (result.kind === 'podcast-episode' && result.trackId === episodeId) {
                            episode.id = result.trackId;
                            episode.name = result.trackName;
                            episode.description = result.shortDescription !== ''
                                ? result.shortDescription
                                : result.description;
                            episode.date = result.releaseDate;
                            episode.url = result.episodeUrl;
                            episode.duration = result.trackTimeMillis;
                            setPodcastEpisode(episode);
                        } else if (result.kind === 'podcast') {
                            const info: PodcastInfo = {
                                id: podcastId,
                                name: result.trackName,
                                author: result.artistName,
                                image: result.artworkUrl600,
                                description: result.description || ''
                            };
                            setPodcastInfo(info);
                        }
                    });                    
                }
            );
        }
    }, [params.podcastId, params.episodeId])

  return (
    <Container className="mt-5">
        <Row>
            <Col lg={3} md={3} sm={2} xs={12}>
                <PodcastCard
                    id={podcastInfo.id}
                    image={podcastInfo.image}
                    name={podcastInfo.name}
                    author={podcastInfo.author}
                    description={podcastInfo.description} />
            </Col>
            <Col lg={9} md={9} sm={10} xs={12}>
                <Card className="w-100 shadow text-start p-2">
                    <Card.Title className="strong">
                        <h3 className="strong ps-3">{podcastEpisode.name}</h3>
                    </Card.Title>
                    <Card.Text>
                        {podcastEpisode.description}
                    </Card.Text>
                    {podcastEpisode.url !== '' && (
                        <div>
                            <audio controls preload="auto" className='w-100'>
                                <source src={podcastEpisode.url} type="audio/mpeg" />
                                <source src={podcastEpisode.url} type='audio/ogg; codecs="vorbis"'></source>
                                Your browser does not support the audio element.
                            </audio>
                        </div>
                    )}
                </Card>
            </Col>
        </Row>
    </Container>
  );
}

export default Episode;