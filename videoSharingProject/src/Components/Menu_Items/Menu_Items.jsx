import styled from "styled-components"
import logo from "../Images/logo.png"
import HomeIcon from '@mui/icons-material/Home';
import ExploreIcon from '@mui/icons-material/Explore';
import SubscriptionsIcon from '@mui/icons-material/Subscriptions';
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary';
import HistoryIcon from '@mui/icons-material/History';
import LibraryMusicIcon from '@mui/icons-material/LibraryMusic';
import SportsBasketballIcon from '@mui/icons-material/SportsBasketball';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import MovieCreationIcon from '@mui/icons-material/MovieCreation';
import ArticleIcon from '@mui/icons-material/Article';
import LiveTvIcon from '@mui/icons-material/LiveTv';
import SettingsIcon from '@mui/icons-material/Settings';
import FlagIcon from '@mui/icons-material/Flag';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import SettingsBrightnessIcon from '@mui/icons-material/SettingsBrightness';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import { useSelector } from "react-redux"

import PropTypes from 'prop-types';
import { Link } from "react-router-dom";

const Wrapper = styled.div`
padding:18px 26px;
`
const Logo = styled.div`
display:flex;
align-items:center;
gap:5px;
font-weight:bold;
margin-bottom:25px
`
const Container = styled.div`
flex:1;
background-color:${({ theme }) => theme.bgLighter};
height:100vh;
color:${({ theme }) => theme.text};
font-size:14px;
position:sticky;
top:0
`

const Img = styled.img`
height:25px;
`
const Items = styled.div`
display:flex;
align-items:center;
gap:20px;
cursor:pointer;
padding:7.5px 0px;

&:hover{
    background-color:${({ theme }) => theme.soft};
}
`
const Hr = styled.hr`
margin:15px 0pxx;
border:0.5px solid #373737
`
const Login = styled.div`
margin:10px 0px;
`
const LoginBtn = styled.button`
display:flex;
align-items:center;
padding:5px 15px;
background-color:transparent;
border:1px solid aqua;
color:aqua;
border-radus:2px;
font-weight:500;
margin-top:10px;
cursor:pointer;
`
const Title = styled.h1`
font-size:14px;
font-weight:500;
color:#aaaaaa;
margin-bottom:20px;
`


export const MenuItems = ({ setMyTheme, myTheme }) => {


    const { user } = useSelector(state => state.user)

    return (


        <Container>
            <Wrapper>
                <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
                    <Logo>
                        <Img src={logo} />
                        MyTube
                    </Logo>
                </Link>

                <Items><HomeIcon />Home </Items>
                <Link to="trends" style={{ textDecoration: "none", color: "inherit" }}>
                    <Items> <ExploreIcon />Explore </Items>
                </Link>
                <Link to="subscriptions" style={{ textDecoration: "none", color: "inherit" }}>
                    <Items> <SubscriptionsIcon /> Subscriptions</Items>
                </Link>
                <Hr />
                <Items> <VideoLibraryIcon /> Library</Items>
                <Items> <HistoryIcon /> History</Items>
                <Hr />

                {!user && <>
                    <Login>
                        Sign in to like video, comment and subscribe
                        <Link to="signin" style={{ textDecoration: "none" }}>
                            <LoginBtn>
                                <AccountCircleOutlinedIcon />
                                SINGIN
                            </LoginBtn>
                        </Link>
                    </Login>
                    <Hr />
                </>}
                <Title>BEST OF MYTUBE</Title>
                <Items> <LibraryMusicIcon /> Music</Items>
                <Items> <SportsBasketballIcon /> Sports</Items>
                <Items> <SportsEsportsIcon /> Gaming</Items>
                <Items> <MovieCreationIcon /> Movies</Items>
                <Items> <ArticleIcon /> News</Items>
                <Items> <LiveTvIcon /> live</Items>
                <Hr />
                <Items> <SettingsIcon /> Settings</Items>
                <Items> <FlagIcon /> Report</Items>
                <Items> <HelpOutlineIcon /> HelP</Items>
                <Items onClick={() => setMyTheme(!myTheme)}> <SettingsBrightnessIcon /> LightMode</Items>

            </Wrapper>
        </Container>
    )
}

// MenuItems.propTypes = {
//     myTheme: PropTypes.func.isRequired,
// };
MenuItems.propTypes = {
    setMyTheme: PropTypes.func.isRequired,
    myTheme: PropTypes.oneOfType([
        PropTypes.bool,
        PropTypes.func
    ]).isRequired
};