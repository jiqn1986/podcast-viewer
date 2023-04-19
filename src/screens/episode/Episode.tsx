import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import { Col } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import { useParams } from 'react-router-dom';
import { getPodcastDetails } from '../../services/podcast.service';
import { useContext, useEffect, useState } from 'react';
import { PodcastInfo } from '../../models/Podcast.model';
import { EpisodeInfo } from '../../models/Episode.model';
import { Response, ResponseContent } from '../../models/Response.model';
import PodcastCard from '../../components/podcast-card/PodcastCard';
import { LoadingContext } from '../../App';

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

    const loadingContext = useContext(LoadingContext);
    const [podcastInfo, setPodcastInfo] = useState(emptyInfo);
    const [podcastEpisode, setPodcastEpisode] = useState(episode);
    const params = useParams();

    useEffect(() => {
        loadingContext.setLoading(true);
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
                            episode.description = episode.description?.replace(/\n/g, "<br />")
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
                    loadingContext.setLoading(false);                  
                }
            ).catch((e: Error) => {
                console.error(e);
                loadingContext.setLoading(false);
            });
        }
    }, [params.podcastId, params.episodeId])

  return (
    <Container className="mt-5">
        {!loadingContext.loading && (
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
                        <div
                            dangerouslySetInnerHTML={{__html: podcastEpisode.description || ''}}
                            />
                        </Card.Text>
                        {podcastEpisode.url !== '' && (
                            <span>
                                <audio controls preload="auto" className='w-100'>
                                    <source src={podcastEpisode.url} type="audio/mpeg" />
                                    <source src={podcastEpisode.url} type='audio/ogg; codecs="vorbis"'></source>
                                    Your browser does not support the audio element.
                                </audio>
                            </span>
                        )}
                    </Card>
                </Col>
            </Row>
         )}
         {loadingContext.loading && (
             <h5 className="text-center">Please wait ...</h5>
         )}
    </Container>
  );
}

export default Episode;