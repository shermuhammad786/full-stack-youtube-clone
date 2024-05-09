import styled from "styled-components"
import propTypes from "prop-types"
import { useEffect, useState } from "react"
import axios from "axios";
import VideoCards from "../VideoCards/VideoCards";
const Container = styled.div`
flex:2;
`
export default function Recommendation({ tags }) {
    // console.log(tags, "tags")
    const [videos, setVideos] = useState();
    useEffect(() => {
        const fetchVideos = async () => {
            const res = await axios.get(`http://localhost:9000/api/videos/tags?tags=${tags}`);
            setVideos(res.data)
            // console.log(res.data, "tags data")
        }
        fetchVideos();
    }, [tags])

    return (
        <Container>
            {videos?.map(video => (
                <VideoCards type="sm" key={video._id} video={video} />
            ))}
        </Container>
    )
}

Recommendation.propTypes = {
    tags: propTypes.array
}