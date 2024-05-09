import styled from 'styled-components'
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { format as formatTimeAgo } from 'timeago.js/esm';
import { useEffect, useState } from 'react';
import axios from 'axios';



const Container = styled.div`
width:${(props) => props.type !== "sm" && "360px"};
margin-bottom:${(props) => props.type === "sm" ? "10px" : "45px"};
cursor:pointer;
display:${(props) => props.type === "sm" && "flex"};
gap:10px;
`
const Image = styled.img`
width:100%;
height:${(props) => props.type === "sm" ? "120px" : "202px"};
background-color:#999;
flex:1;
`
const Details = styled.div`
display:flex;
margin-top:${(props) => props.type !== "sm" && "16px"};
gap:12px;
flex:1;
`
const ChannelImage = styled.img`
width:36px;
height:36px;
border-radius:50%;
background-color:#999;
display:${(props) => props.type === "sm" && "none"}
`
const Texts = styled.div`

`
const Title = styled.h1`
font-size:16px;
font-weight:500;
color:${({ theme }) => theme.text};

`
const ChannelName = styled.h2`
font-size:14px;
color:${({ theme }) => theme.textSoft};
margin:10px 0px;

`
const Info = styled.div`
font-size:14px;
color:${({ theme }) => theme.textSoft};

`


export default function VideoCards({ type, video }) {

  const [channel, setChannel] = useState([])
  // console.log(video, "video ,===>>>")
  useEffect(() => {
    const fetchChannel = async () => {
      try {
        const res = await axios.get(`http://localhost:9000/api/users/find/${video?.userId}`);
        // console.log(res.data, "===>>> response");
        setChannel(res.data);
      } catch (error) {
        console.error("Error fetching videos:", error);
      }
    };
    fetchChannel();
  }, [video.userId]);
  return (
    <Link to={`/video/${video._id}`} style={{ textDecoration: "none" }}>
      <Container type={type}>
        <Image type={type} src={video.imgUrl} />
        <Details type={type}>
          <ChannelImage type={type} src={channel.img || "data:image/jpeg;base64,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"} />
          <Texts>
            <Title>{video.title}</Title>
            <ChannelName>{channel.username}</ChannelName>
            <Info>{video.views} views * {video.createdAt && formatTimeAgo(video?.createdAt)}
              {/* npm i timeago.js */}
            </Info>
          </Texts>
        </Details>
      </Container>
    </Link>
  )
}

VideoCards.propTypes = {
  type: PropTypes.string, // Make the type prop optional
  video: PropTypes.shape({
    title: PropTypes.string.isRequired,
    _id: PropTypes.string.isRequired,
    userId: PropTypes.string.isRequired,
    imgUrl: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    views: PropTypes.number.isRequired
    // Add more properties if necessary
  }).isRequired
};

// {/* <Link to="/video/test" style={{ textDecoration: "none" }}>
//       <Container type={type}>
//         <Image type={type} src={video.imgUrl} />
//         <Details type={type}>
//           <ChannelImage type={type} src='https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/Flower_jtca001.jpg/1280px-Flower_jtca001.jpg' />
//           <Texts>
//             <Title>{video.title}</Title>
//             <ChannelName>SM Coding</ChannelName>
//             <Info>{video.views} views * {timeAgoString}
//               {/* npm i timeago.js */}
//             </Info>
//           </Texts>
//         </Details>
//       </Container>
//     </Link> */}