import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Loader from "../../common/Loader";
import Favorite from "../Section/favorite";
import {Comment} from "../Section/Comment";
import { Helmet } from 'react-helmet'; 
import { Video } from "../Section/Video";

const Container = styled.div`
    margin-left: 20%;
    padding: 50px;
    height: calc(100vh - 50px);
    width:100%;
    position: relative;
    display:flex;
    justify-content: center;
`;
const Backdrop = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 60%;
    height: 65%;
    justify-content: center;
    background-image: url(${props => props.bgImage});
    background-position: center center;
    background-size: cover;
    filter: blur(3px);
    opacity: 0.5;
    z-index:0;
    margin-top: 40px;

`;
const Content = styled.div`
    // margin-left: 6%;
    display: flex;
    width: 100%;
    height:100%;
    position: relative;
    z-index: 1;
`;
const Cover = styled.div`
    width: 15%;
    height: 50%;
    background-image: url(${props => props.bgImage});
    background-position: center center;
    background-size: cover;
`;
const Data = styled.div`
    width: 65%;
    margin-left: 15px;

`;
const TitleImdb = styled.div`
    /* width: 80%;  */
    /* margin-left: 12px; */
    display: flex;
    justify-content: flex-start;
`;

const Liked = styled.div`
    /* margin-left: 7px; */
    margin-top:3px;
    margin-right: 12px;    
    align-self: center;
    font-size: 26px;
    cursor: pointer;
`;


const Title = styled.h3`
    font-size: 32px;
`;

const ImdbIcon = styled.div` 
    display: flex;
    justify-content: center;
    align-items: center;
`;
const ImdbLink = styled.a` 
    width: 55px;
    height: 22px;

    background-color: #E2B616;
    color: black;
    font-size: 12px;
    border-radius: 3px;
    font-weight: 800;
    margin-left: 15px;
    display: flex;
    justify-content: center;
    align-items: center; 
    color: black;

`;

const VideoContainer = styled.div`
`;
const VideoLink = styled.a`
  display: inline-block;
  position: relative;
  /* width: 85px; */
    /* height: 52px; */
    width: 35px;
    height: 22px;
    margin-left: 7px;
    margin-top: 3px;
  background-position: center center;
  background-size: cover;
    background-image: url(${props => props.src});
`;

const ItemContainer = styled.div`
    margin: 20px 0px;
`;
const Item = styled.span`
    /* display:flex; */
    /* margin-bottom: 8px; */
    max-width:50%;
`;
const Divider = styled.span`
    padding: 0px 10px;
`;
const Overview = styled.p`
    font-size: 12px;
    opacity: 0.7;
    line-height: 1.5;
    /* min-width:60%; */
    max-width:50%;
`;

const DetailPresenter = ({id, result, loading, isMovie, videoKey}) => 
    loading ? <Loader /> : (
        <>
        <Container>
        <Helmet><title>상세정보 | Serise-One</title></Helmet>
            {/* {console.log("externalResult:", externalResult)} */}
            {result.backdrop_path && 
            <Backdrop
            bgImage={result.backdrop_path 
                ? `https://image.tmdb.org/t/p/original${result.backdrop_path}`
                : require("../../assets/noPosterSmall.png")} />
            }
            <Content>
                <Cover
                    bgImage={
                        result.poster_path
                        ? `https://image.tmdb.org/t/p/original${result.poster_path}`
                        : require("../../assets/noPosterSmall.png")
                    }
                />
                <Data>
                    <TitleImdb>
                    {/* <Liked onClick={toggleAway}>
                            {currentLiked ? "💖" : "🤍"}
                        </Liked>                            */}
                        <Title>
                            {result.title
                            ? result.title
                            :result.name}
                        </Title>
                        <Item>
                        <ImdbIcon>
                        {result.imdb_id &&
                            <ImdbLink href={`https://www.imdb.com/title/${result.imdb_id}`}>
                                영화정보
                            </ImdbLink>
                        }
                        {/* {externalResult.imdb_id &&
                            <ImdbLink href={`https://www.imdb.com/title/${externalResult.imdb_id}`}>
                            IMDB
                            </ImdbLink>
                        } */}
                        

                        {/* <Liked onClick={toggleAway}>
                            {currentLiked ? "💖" : "🤍"}
                        </Liked>                     */}
                        </ImdbIcon>
                        </Item>
                        {isMovie === true ?
                            <Favorite isMovie={isMovie} title={result.title} coverImg={result.poster_path} movieId={id} userId={localStorage.getItem('userId')} />
                        : <Favorite isMovie={isMovie} showId={id} title={result.name} coverImg={result.poster_path} userId={localStorage.getItem('userId')} />
                        }
    
                    </TitleImdb>
                    <ItemContainer>
                        <Item>
                            {result.release_date 
                            ? `📅 ${result.release_date.substring(0,4)}`
                            : `📅 ${result.first_air_date.substring(0,4)}`}
                        </Item>
                        <Divider>•</Divider>
                        <Item>
                            {result.runtime
                            ? `🕗 ${result.runtime} m`
                            : `🕗 ${result.episode_run_time[0]} m`}
                        </Item>
                        <Divider>•</Divider>
                        <Item>
                            {result.genres && 
                            result.genres.map((genre, index)=>
                            index === result.genres.length -1
                            ? genre.name : `${genre.name}/`
                            )}
                        </Item>
                    </ItemContainer>
                    <Overview>{result.overview}</Overview>
            {/* <ContentNav
            id={result.id}
            pathname={pathname}
            isMovie={isMovie} 
            />             */}
                </Data>
            </Content>
        </Container>
        <Video videoKey={videoKey} />
        <Comment postId={id} />
        </>
    )
    ;
    
    DetailPresenter.prototype = {
        result: PropTypes.object,
        loading: PropTypes.bool.isRequired,
    };


export default DetailPresenter;