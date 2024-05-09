import styled from "styled-components"
import PropTypes from 'prop-types';
import { useEffect, useState } from "react";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import app from "../../fireabseConfig";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Container = styled.div`
width:100%;
height:100%;
position:absolute;
top:0;
left:0;
background-color:#000000a7;
display:flex;
align-items:center;
justify-content:center;
`
const Wrapper = styled.div`
    width:600px;
    height:600px;
    background-color:${({ theme }) => theme.bgLighter};
    color:${({ theme }) => theme.text};
    padding:20px;
    display:flex;
    flex-direction:column;
    gap:20px;
    position:relative;
    `
const Close = styled.div`
    position:absolute;
    top:10px;
    right:10px;
    cursor:pointer;
    `
const Title = styled.h1`text-align:center;`

const Input = styled.input`
    border:1px solid ${({ theme }) => theme.soft};
    color:${({ theme }) => theme.text};
    border-radus:3px;
    padding:10px;
    background-color:transparent;
    
    `
const Desc = styled.textarea`
    border:1px solid ${({ theme }) => theme.soft};
    color:${({ theme }) => theme.text};
    border-radus:3px;
    padding:10px;
    background-color:transparent;
    `
const Button = styled.button`
    border-radus:3px;
    border:none;
    padding:10px 20px;
    font-weight:500;
    cursor:pointer;
    background-color:${({ theme }) => theme.soft};
    color:${({ theme }) => theme.textSoft};
    `
const Label = styled.label`font-size:14px`
export default function Upload({ setOpen }) {


    const navigate = useNavigate();

    const [video, setVideo] = useState(undefined)
    const [image, setImage] = useState(undefined)
    const [videoPrec, setVideoPerc] = useState(0)
    const [imagePrec, setImagePrec] = useState(0);
    const [inputs, setInputs] = useState({});
    const [tags, setTags] = useState([]);

    useEffect(() => {
        video && uploadFile(video, "videoUrl")
    }, [video])
    useEffect(() => {
        image && uploadFile(image, "imgUrl")
    }, [image])

    const handleChange = (e) => {
        setInputs(prev => {
            return { ...prev, [e.target.name]: e.target.value }
        })
    }
    const tagsHandler = (e) => {
        setTags(e.target.value.split(","));
        // console.log(tags , "tags")
    }

    const uploadHandler = async () => {
        const res = await axios.post("http://localhost:9000/api/videos/add/video", {...inputs , tags} , {withCredentials:true});
        setOpen(false);
        res.status === 200 && navigate(`/video/${res.data._id}`);

    }
    const uploadFile = (file, urlType) => {
        const storage = getStorage(app);
        const fileName = new Date().getTime() + file.name
        const storageRef = ref(storage, fileName);
        const uploadTask = uploadBytesResumable(storageRef, file);


        uploadTask.on('state_changed',
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                urlType === "imgUrl" ? setImagePrec(Math.round(progress)) : setVideoPerc(Math.round(progress));
                switch (snapshot.state) {
                    case 'paused':
                        break;
                    case 'running':
                        break;
                    default:
                        break;
                }
            },
            (error) => {
                console.log(error)
            },
            () => {
                // Upload completed successfully, now we can get the download URL
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    // console.log('File available at', downloadURL);
                    setInputs((prev) => {
                        // console.log(prev, "===>>> prev")
                        return { ...prev, [urlType]: downloadURL };
                    })
                    // console.log(urlType , "url type==>>> ")
                });
            }
        );


    }

    // console.log(inputs, "===>>> unpo9its")

    return (
        <Container>
            <Wrapper>
                <Close onClick={() => setOpen(false)}>X</Close>
                <Title>Upload a new video</Title>
                <Label>Video:</Label>

                {videoPrec > 0 ? ("Uploading..." + videoPrec + " %") :
                    <Input type="file" name="title" accept="video/*" onChange={e => setVideo(e.target.files[0])} />
                }

                <Input type="text" name="title" placeholder="Title" onChange={handleChange} />

                <Desc placeholder="Description" name="desc" rows={8} onChange={(handleChange)} />
                <Input type="text" placeholder="Seprate the tags with commas." onChange={tagsHandler} />
                <Label>image:</Label>
                {imagePrec > 0 ? ("Uploading..." + imagePrec + " %") :
                    <Input type="file" accept="image/*" onChange={e => setImage(e.target.files[0])} />
                }
                <Button onClick={uploadHandler}>Upload</Button>
            </Wrapper>
        </Container>
    )
}

Upload.propTypes = {
    setOpen: PropTypes.func.isRequired, // Make the type prop optional

};