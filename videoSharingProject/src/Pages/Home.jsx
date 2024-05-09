
import styled from 'styled-components'
import VideoCards from '../Components/VideoCards/VideoCards'
import { useEffect, useState } from 'react'
import axios from 'axios'
import PropTypes from 'prop-types';

const Container = styled.div`
display:flex;
justify-content:center;
margin-top:25px
`
const Wrapper = styled.div`
display:flex;
flex-wrap:wrap;
gap:52px;
`
export default function Home({ type }) {

    const [videos, setVideos] = useState([])
    // console.log(type, "type==>>>>>")
    useEffect(() => {
        const fetchVideos = async () => {
            try {
                const res = await axios.get(`http://localhost:9000/api/videos/${type}`, { withCredentials: true });
                // console.log(res.data, "===>>> response");
                setVideos(res.data);
            } catch (error) {
                console.error("Error fetching videos:", error);
            }
        };
        fetchVideos();
    }, [type]);
    return (
        <Container>
            <Wrapper>
                {videos?.map(video => (
                    <VideoCards key={video._id} video={video} />
                ))}

            </Wrapper>
        </Container>
    )
}
Home.propTypes = {
    type: PropTypes.string,
}