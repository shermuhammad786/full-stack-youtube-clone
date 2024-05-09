import styled from "styled-components"
import SearchIcon from '@mui/icons-material/Search';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux"
import { VideoCallOutlined } from "@mui/icons-material";
import { useState } from "react";
import Upload from "../UploadVideo/Upload";
import { logout } from "../../Redux/userSlice";
import axios from "axios";



const Container = styled.div`
position:sticky;
top:0px;
background-color:${({ theme }) => theme.bgLighter};
height:56px;
`
const Wrapper = styled.div`
display:flex;
align-items:center;
justify-content:flex-end;
height:100%;
padding:0px 20px;
position:relative;
`
const Search = styled.div`
position:absolute;
left:0px;
right:0px;
margin:auto;
border:1px solid #ccc;
width:40%;
display:flex;
justify-content:space-between;
align-items:center;
border-radius:3px;
padding:5px;
color:${({ theme }) => theme.text};

`
const Input = styled.input`
width:100%;
padding:5px;
border:none;
outline:none;
background-color:transparent;
color:${({ theme }) => theme.text};
`
const Button = styled.button`
display:flex;
align-items:center;
padding:5px 15px;
background-color:transparent;
border:1px solid aqua;
color:aqua;
border-radus:2px;
font-weight:500;
cursor:pointer;
`
const User = styled.div`
display:flex;
aling-items:center;
gap:10px;
font-weight:500;
color:${({ theme }) => theme.text}
`
const Avatar = styled.img`
width:32px;
height:32px;
border-radius:50%;
background-color:#999;
`
const DropdownBtn = styled.div`
color:${({ theme }) => theme.text};
display:flex;
cursor:pointer;
gap:10px;
`
const Dropdown = styled.div`
position: relative;
  display: inline-block;
`
const DropdownContent = styled.div`
display:none;
position: absolute;
background-color: #f1f1f1;
min-width: 160px;
overflow: auto;
box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
z-index: 1;
`

const DropDownItems = styled.a`
color: black;
padding: 12px 16px;
text-decoration: none;
display: block;

&:hover{
    background-color: #ddd;
}
`



export default function Navbar() {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [open, setOpen] = useState(false)
    const [block, setBlock] = useState("none")
    const [q, setQ] = useState("")
    const { user } = useSelector(state => state.user)
    const settingsDisplay = () => {
        if (block === "block") {
            setBlock("none")
        } else {
            setBlock("block")
        }
    }
    const logoutHandler = async () => {

        dispatch(logout());
        try {

            await axios.post("http://localhost:9000/api/auth/signout", {}, { withCredentials: true });
        } catch (error) {
            console.log(error);
        }

        // console.log(res.data)
    }

    const homeHandler = () => {
        navigate("/")
        if (block === "block") {
            setBlock("none")
        } else {
            setBlock("block")
        }
    }
    // console.log(user , "user iamge")
    return (
        <>
            <Container>
                <Wrapper>
                    <Search>
                        <Input placeholder="Search" onChange={e => setQ(e.target.value)} />
                        <SearchIcon style={{ cursor: "pointer" }} onClick={() => navigate(`/search?q=${q}`)} />
                    </Search>
                    {user ? (
                        <>
                            <Dropdown>
                                <DropdownBtn  >
                                    <VideoCallOutlined onClick={() => setOpen(true)} />
                                    <User onClick={settingsDisplay}>
                                        <Avatar src={user?.img} alt={user.username[0]} />
                                        {user?.username}
                                    </User>
                                </DropdownBtn>
                                <DropdownContent style={{ display: block }}>
                                    <DropDownItems onClick={homeHandler} >Home</DropDownItems>
                                    <DropDownItems onClick={logoutHandler}>Logout</DropDownItems>
                                </DropdownContent>
                            </Dropdown>

                        </>
                    ) : <Link to="/signin" style={{ textDecoration: "none" }}>
                        <Button>
                            <AccountCircleOutlinedIcon />
                            SIGNIN
                        </Button>
                    </Link>}
                </Wrapper>
            </Container>
            {open && <Upload setOpen={setOpen} />}
        </>
    )
}
