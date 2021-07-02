import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import styled from "styled-components";

const Container = styled.div`
    display: flex;
    justify-content: center;
    :not(:last-child){
        margin-bottom: 50px;
        margin-top: 30px;
    }`;

function Favorite(props) {
    const history = useHistory();
    console.log("like props", props)
    const [favorited, setFavorited] = useState(false);
    const [favoriteNumber, setFavoriteNumber] = useState(0);
    console.log("liked", favorited, "likeNumber", favoriteNumber);
    let variable;
    if(props.isMovie) {
        variable = {movieId : props.movieId, userId: props.userId, title: props.title, coverImg: props.coverImg} 
    } else {
        variable = {showId : props.showId, userId: props.userId}
    }
    const handleLikeClick = async () => {
        if(!localStorage.getItem('userId')) {
            alert("로그인 후 이용해주세요");
            history.push('/login');
        }
        if(!favorited) {
            await axios.post('/api/favorite/addToFavorite', variable)
            .then(response => {
                if(response.data.success) {
                    setFavorited(true);
                    setFavoriteNumber(favoriteNumber+1);
                } else {
                    alert('오류가 발생했습니다.');
                }
            })
        } else {
            await axios.post('/api/favorite/removeToFavorite', variable)
            .then(response => {
                if(response.data.success) {
                    setFavorited(false);
                    setFavoriteNumber(favoriteNumber-1);
                } else {
                    alert('오류가 발생했습니다.');
                }
            })
            
        }
    }

    async function fetchData() {
        await axios.post('/api/favorite/favoriteNumber', variable)
            .then(response => {
                if(response.data.success) {
                    setFavoriteNumber(response.data.favoritesNumber)
                } else {
                    alert('Failed to get likes')
                }
            });
        await axios.post('/api/favorite/favorited', variable)
            .then(response => {
                if(response.data.success) {
                    if(response.data.favorited) {
                        setFavorited(true)
                    } else {
                        setFavorited(false)
                    }
                } else {
                    console.log(response.data.err)
                }
            })
    }


    useEffect(() => {
        fetchData();
    }, [])
    return (
        <div className='flex  text-lg'>
            <span className='mx-2' onClick={handleLikeClick}>{favorited ? '❤' : '🤍'} </span>
            <Container>{favoriteNumber}</Container>
        </div>
    )
}

export default Favorite