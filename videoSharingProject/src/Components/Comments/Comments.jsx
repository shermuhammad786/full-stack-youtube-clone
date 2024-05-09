import styled from 'styled-components'
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import axios from 'axios';



const Container = styled.div`
display:flex;
gap:10px;
margin:30px 0px;
`
const Avatar = styled.img`
width:50px;
height:50px;
border-radius:50%;
`
const Details = styled.div`
display:flex;
flex-direction:column;
gap:10px;
`
const Name = styled.span`
    font-size:13px;
    font-weight:500px;
    color:${({ theme }) => theme.text};
`
const Date = styled.span`
font-size:12px;
font-weight:400px;
color:${({ theme }) => theme.textSoft};
margin-left:5px;

`
const Text = styled.span`
font-size:14px;
color:${({ theme }) => theme.text};
`
export default function Comments({ newComment }) {
    const [channel, setChannel] = useState();

    useEffect(() => {
        const fetchComment = async () => {
            // console.log(comment , "comments==>>>")
            const res = await axios.get(`http://localhost:9000/api/users/find/${newComment?.userId}`);
            // console.log(res.data , "comments user")
            setChannel(res.data)
        }
        fetchComment()
    }, [newComment.userId, newComment])

    return (
        <Container>
            <Avatar src={channel?.img} />
            <Details>
                <Name>
                    {channel?.username} <Date>1 day ago</Date>
                </Name>
                <Text>
                    {newComment.desc}
                </Text>
            </Details>
        </Container>
    )
}

Comments.propTypes = {
    newComment: PropTypes.object.isRequired
}