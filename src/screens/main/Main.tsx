import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import InfoCard from '../../components/info-card/InfoCard';
import Badge from 'react-bootstrap/Badge';
import './Main.css';
import { useContext, useEffect, useState } from 'react';
import { PODCAST_STORAGE_NAME, getPodcasts, storageRequest } from '../../services/podcast.service';
import { PodcastInfo } from '../../models/Podcast.model';
import { LoadingContext } from '../../App';

function Main() {
    const loadingContext = useContext(LoadingContext);

    const emptyList: Array<PodcastInfo> = []
    const [podcastsList, setPodcastsList] = useState(emptyList);
    const [podcastsListForSearch, setPodcastsListForSearch] = useState(emptyList);
    const [totalPodcasts, setTotalPodcasts] = useState(0);

    const handleFilter = (event: React.KeyboardEvent<HTMLInputElement>) => {
        const input = event.target as HTMLInputElement;
        const filteredPodcast = podcastsListForSearch.filter(podcast => {
            console.log(podcast.name.includes(input.value), podcast.name)
            return podcast.name.toLocaleLowerCase().includes(input.value.toLocaleLowerCase())
                || podcast.author.toLocaleLowerCase().includes(input.value.toLocaleLowerCase())
        });
        setPodcastsList(filteredPodcast);
        setTotalPodcasts(filteredPodcast.length);
    }

    useEffect(() => {
        loadingContext.setLoading(true);
        getPodcasts().then(
            (response:any) => {
                const podcastsList: any = [];
                response.data.feed.entry.map( (entry: any) => {
                    const podcast: PodcastInfo = {
                        id: entry.id.attributes['im:id'],
                        image: entry['im:image'][2].label,
                        name: entry['im:name'].label,
                        author: entry['im:artist'].label
                    };
                    podcastsList.push(podcast);
                })
                setPodcastsList(podcastsList);
                setPodcastsListForSearch(podcastsList);
                setTotalPodcasts(podcastsList.length);
                storageRequest(PODCAST_STORAGE_NAME, response);
                loadingContext.setLoading(false);
            }
        ).catch((e: Error) => {
            console.error(e);
            loadingContext.setLoading(false);
        });
    }, [])
  return (
    <Container className="mt-5">
        <Form className="row justify-content-end">
            <div className="mb-3 col-auto">
                <Badge bg="primary" className="col-form-label p-1 mt-1 badge-text">{totalPodcasts}</Badge>
            </div>
            <div className="col-auto">
                <input type="text" className="form-control" placeholder="Filter podcasts..." onKeyUp={handleFilter}/>
            </div>
        </Form>
      <Row>
        {
            podcastsList && podcastsList.map((podcast: PodcastInfo) => {
                return (
                    <InfoCard
                        id={podcast.id}
                        image={podcast.image}
                        name={podcast.name}
                        author={podcast.author}
                        key={podcast.id}/>
                )
            })
        }
      </Row>
    </Container>
  );
}

export default Main;