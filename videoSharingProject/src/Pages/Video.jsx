
import styled from 'styled-components'
import NewComment from '../Components/Comments/NewComment'
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import ThumbDownOutlinedIcon from '@mui/icons-material/ThumbDownOutlined';
import ReplyOutlinedIcon from '@mui/icons-material/ReplyOutlined';
import AddTaskOutlinedIcon from '@mui/icons-material/AddTaskOutlined';
// import Comments from '../Components/Comments/Comments';
// import VideoCards from '../Components/VideoCards/VideoCards';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from "react-redux"
import { useLocation } from "react-router-dom"
import axios from 'axios';
import { dislike, fetchSuccess, like } from '../Redux/videoSlice';
import { format as formatTimeAgo } from 'timeago.js/esm';
import channelDefaultimage from "../../public/assests/channel.jpeg"
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import { subscription } from '../Redux/userSlice';
import Recommendation from '../Components/Recommendation/Recommendation';







const Container = styled.div`
display:flex;
gap:24px;
`
const Content = styled.div`
flex:5;
`

const VideoWrapper = styled.div`
`
// const DisplayVideo = styled.video`

// `
const Title = styled.h1`
font-size:18px;
font-weight:400;
margin-top:20px;
margin-bottom:10px;
color:${({ theme }) => theme.text};  
`
const Details = styled.div`
display:flex;
align-items:center;
justify-content:space-between;

`
const Info = styled.span`
color:${({ theme }) => theme.text};

`
const Buttons = styled.div`
display:flex;
gap:20px;
color:${({ theme }) => theme.text};
`
const Button = styled.button`
display:flex;
align-items:center;
gap:5px;
cursor:pointer;
background-color:transparent;
color:${({ theme }) => theme.text};
border:none;
`
const Hr = styled.hr`
margin:15px 0px;
border:0.5px solid gray;
`
const Channel = styled.div`
display:flex;
justify-content:space-between
`

const ChannelInfo = styled.div`
    display:flex;
    gap:20px;
`

const ChannelImage = styled.img`
width:50px;
height:50px;
border-radius:50%;
`
const ChannelDetails = styled.div`
display:flex;
flex-direction:column;
color:${({ theme }) => theme.text};
`
const ChannelName = styled.span`
    font-size:500;
`
const ChannelCounter = styled.span`
margin-top:5px;
margin-bottom:10px;
color:${({ theme }) => theme.text};
font-size:12px
`
const Description = styled.p`
font-size:14px;

`

const Subscribe = styled.button`
background-color:#cc1a00;
font-weight:500;
color:white;
border:none;
border-radus:3px;
height:max-content;
padding:10px 20px;
cursor:pointer;
`
const VideoFrame = styled.video`
max-height:520px;
width:100%;
object-fit:cover,
`


export default function Video() {

  const { user } = useSelector((state) => state.user);
  const { currentVideo } = useSelector((state) => state.video);
  // const users = useSelector(state => state.user)
  // console.log(users , "subcjlfsadjjfo==>>> ")
  const dispatch = useDispatch()

  const path = useLocation().pathname.split("/")[2]
  // console.log(path)

  //  const [video , setVideo] = useState({});
  const [channel, setChannel] = useState({});
  const [subs, setSubs] = useState(null)
  const [loader, setLoader] = useState(true)


  useEffect(() => {
    const fetchData = async () => {
      try {
        const videoRes = await axios.get(`http://localhost:9000/api/videos/find/${path}`)
        const channelRes = await axios.get(`http://localhost:9000/api/users/find/${videoRes.data.userId}`)

        dispatch(fetchSuccess(videoRes.data))

        setChannel(channelRes.data);
        setSubs(channel.subscribers)

        // console.log(channel, "channel in useEffect==>>>>  ")
      } catch (error) {
        // console.log(error, "eror==>>>>  ")
      }
    }
    fetchData()
  }, [path, dispatch, channel.subscribers])

  // console.log(user, "user")
  // console.log(channel, "channel")
  // console.log(currentVideo, "cureent video")
  const likeHandler = async () => {
    await axios.put(`http://localhost:9000/api/users/like/${currentVideo._id}`, {}, { withCredentials: true })
    dispatch(like(user._id))
  }
  const dislikeHandler = async () => {
    await axios.put(`http://localhost:9000/api/users/dislike/${currentVideo._id}`, {}, { withCredentials: true })
    dispatch(dislike(user._id))
  }
  const subscriptionHandler = async () => {
    try {
      setLoader(false)
      channel && user?.subscribedUsers?.includes(channel._id) ? setSubs(prev => prev + 1) : setSubs(prev => prev - 1)

      user?.subscribedUsers?.includes(channel._id)
        ?
        await axios.put(`http://localhost:9000/api/users/unsub/${channel._id}`, {}, { withCredentials: true })
        :
        await axios.put(`http://localhost:9000/api/users/sub/${channel._id}`, {}, { withCredentials: true })

      setLoader(true)
      dispatch(subscription(channel._id))
    } catch (error) {
      setLoader(true)
    } finally {
      loader(true);
    }
  }


  useEffect(() => {
    document.title = "video";
  }, [user?.subscribedUsers, channel?._id])
  // element.allowFullScreen = true;
  return (
    <Container>
      <Content>
        <VideoWrapper>
          <VideoFrame src={currentVideo?.videoUrl} controls></VideoFrame>
        </VideoWrapper>
        <Title>{currentVideo?.title}</Title>
        <Details>
          <Info>{currentVideo?.views} views * {formatTimeAgo(currentVideo?.createdAt)}</Info>
          <Buttons>
            <Button onClick={likeHandler}>{currentVideo?.likes?.includes(user?._id) ? <ThumbUpIcon /> : <ThumbUpOutlinedIcon />}{currentVideo?.likes?.length}Likes</Button>
            <Button onClick={dislikeHandler}>{currentVideo?.dislikes?.includes(user?._id) ? <ThumbDownIcon /> : <ThumbDownOutlinedIcon />}Dislike</Button>
            <Button><ReplyOutlinedIcon />Share</Button>
            <Button><AddTaskOutlinedIcon />Save</Button>
          </Buttons>
        </Details>
        <Hr />
        <Channel>
          <ChannelInfo>
            <ChannelImage src={channel?.img === "" ? channelDefaultimage : channel?.img} />
            <ChannelDetails>
              <ChannelName>{channel?.username}</ChannelName>
              <ChannelCounter>{subs} Subcribers</ChannelCounter>
              <Description>{currentVideo?.desc}</Description>
            </ChannelDetails>
          </ChannelInfo>
          {
            loader === true ?
              <Subscribe onClick={subscriptionHandler}>{user?.subscribedUsers?.includes(channel?._id) ? "SUBSCRIBED" : "SUBSCRIBE"}</Subscribe> :
              <Subscribe>LOADING...</Subscribe>
          }
        </Channel>
        <Hr />
        <NewComment videoId={currentVideo?._id} />
      </Content>
      <Recommendation tags={currentVideo?.tags} />

    </Container>
  )
}
