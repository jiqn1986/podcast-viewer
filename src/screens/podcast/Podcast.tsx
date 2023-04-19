import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import './Podcast.css';
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

function Podcast() {

    const episodes: EpisodeInfo[] = [];
    const emptyInfo: PodcastInfo = {
        id: 0,
        name: '',
        author: '',
        image: ''
    }

    const [podcastInfo, setPodcastInfo] = useState(emptyInfo);
    const [podcastEpisodes, setPodcastEpisodes] = useState(episodes);
    const params = useParams();

    useEffect(() => {
        if (params.podcastId) {
            const podcastDetails = getPodcastDetails(params.podcastId);
            const podcastId = parseInt(params.podcastId);
    
            podcastDetails.then(
                (podcast: any) => {
                    const podcastResult: Response = JSON.parse(podcast.data.contents);
                    podcastResult.results.forEach((result: ResponseContent) => {
                        if (result.kind === 'podcast-episode') {
                            const episode: EpisodeInfo = {
                                id: result.trackId,
                                name: result.trackName,
                                date: result.releaseDate,
                                description: result.shortDescription,
                                duration: result.trackTimeMillis,
                                url: result.episodeUrl
                            };
                            episodes.push(episode);
                        } else if (result.kind === 'podcast') {
                            console.log(result)
                            const info: PodcastInfo = {
                                id: podcastId,
                                name: result.trackName,
                                author: result.artistName,
                                image: result.artworkUrl600,
                                description: result.description || ''
                            };
                            console.log(info)
                            setPodcastInfo(info);
                        }
                    });
                    console.log('ACA', podcastResult)
                    setPodcastEpisodes(episodes);
                }
            );
        }
    }, [params.podcastId])

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
                    <h3 className="strong ps-3">Episodes: {podcastEpisodes.length}</h3>
                </Card>
                <Card className="w-100 shadow text-start p-3 mt-3">
                    <Table striped hover>
                        <thead>
                            <tr>
                                <th>Title</th>
                                <th>Date</th>
                                <th>Duration</th>
                            </tr>
                        </thead>
                        <tbody>
                            { podcastEpisodes.map((episode, i) => {
                                return (
                                    <tr key={i}>
                                    <td>
                                        <Link to={`episode/${episode.id}`}>
                                            {episode.name}
                                        </Link>
                                    </td>
                                    <td className="text-start">{formatDate(episode.date)}</td>
                                    <td className="text-center">{msToTime(episode.duration)}</td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </Table>
                </Card>
            </Col>
        </Row>
    </Container>
  );
}

export default Podcast;