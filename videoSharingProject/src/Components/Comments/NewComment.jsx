import axios from 'axios'
import { useEffect, useState } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types';
import Comments from './Comments';
import { useDispatch, useSelector } from "react-redux"
import { commentSuccess } from '../../Redux/comments';
import { allCommentsSuccess } from '../../Redux/allCommnetsSlice';

const Container = styled.div`

`
const NewComments = styled.div`
display:flex;
align-items:center;
gap:10px;
`
const Avatar = styled.img`
width:50px;
height:50px;
border-radius:50%;
`
const Input = styled.input`
border:none;
border-bottom:1px solid ${({ theme }) => theme.soft};
background-color:transparent;
outline:none;
padding:15px;
width:100%;
color:${({ theme }) => theme.text}
`
export default function NewComment({ videoId }) {
    const dispatch = useDispatch()
    const { allComments } = useSelector((state) => state.allCommnets);
    // console.log(allComments, "all comments")
    const { user } = useSelector((state) => state.user);
    // const [comments, setComments] = useState([]);
    const [desc, setDesc] = useState("");

    // console.log(desc, "new comment...")
    const fetchComments = async () => {
        try {
            const res = await axios.get(`http://localhost:9000/api/comments/${videoId}`, { withCredentials: true })
            // console.log(res.data, "comments ")
            dispatch(allCommentsSuccess(res.data))
            setDesc("")
            // setComments(res.data)
        } catch (error) {
            // console.log(error)
        }
    }
    useEffect(() => {
        fetchComments()
    }, [])

    const submitHandler = async (e) => {
        e.preventDefault();
        const res = await axios.post("http://localhost:9000/api/comments", { desc, videoId }, { withCredentials: true });
        dispatch(commentSuccess(res?.data))
        // console.log(res.data);
        fetchComments()
    }
    // console.log(comments, "===>>>>>  comment")
    return (
        <Container>
            <NewComments>
                <Avatar src={user?.img} />
                <form onSubmit={submitHandler}>
                    <Input value={desc} placeholder='Add a comment....' onChange={e => setDesc(e.target.value)} />
                </form>
            </NewComments>
            {allComments?.map(newComment =>
                <Comments key={newComment?._id} newComment={newComment} />
            )}
        </Container>
    )
}
NewComment.propTypes = {
    videoId: PropTypes.string
}