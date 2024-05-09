import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import VideoCards from "../Components/VideoCards/VideoCards";


const Container = styled.div`
        display:flex;
        flex-wrap:wrap;
        gap:20px;
`


export default function Search() {
    const [videos, setVideos] = useState();
    const querry = useLocation().search
    useEffect(() => {
        const fetchVideos = async () => {
            const res = await axios.get(`http://localhost:9000/api/videos/search${querry}`);
            // console.log(res.data)
            setVideos(res.data)
        }
        fetchVideos();
    }, [querry])
    return (
        <Container>
            {videos?.map(video => (
                <VideoCards key={video._id} video={video} />
            ))}
        </Container>
    )
}
