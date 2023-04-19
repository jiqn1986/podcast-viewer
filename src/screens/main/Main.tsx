import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import InfoCard from '../../components/info-card/InfoCard';
import Badge from 'react-bootstrap/Badge';
import './Main.css';
import { useEffect, useState } from 'react';
import { getPodcasts } from '../../services/podcast.service';
import { PodcastInfo } from '../../models/Podcast.model';

function Main() {
    const [podcastsList, setPodcastsList] = useState([]);

    useEffect(() => {
        getPodcasts().then(
            (response:any) => {
                const podcastsList: any = [];
                response.data.feed.entry.map( (entry: any) => {
                    const podcast = {
                        id: entry.id.attributes['im:id'],
                        image: entry['im:image'][2].label,
                        name: entry['im:name'].label,
                        author: entry['im:artist'].label
                    };
                    podcastsList.push(podcast);
                })
                setPodcastsList(podcastsList);
            }
        )
    }, [])
  return (
    <Container className="mt-5">
        <Form className="row justify-content-end">
            <div className="mb-3 col-auto">
                <Badge bg="primary" className="col-form-label p-1 mt-1 badge-text">100</Badge>
            </div>
            <div className="col-auto">
                <Form.Control type="text" className="" placeholder="Filter podcasts..." />
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
                        author={podcast.author}/>
                )
            })
        }
      </Row>
    </Container>
  );
}

export default Main;