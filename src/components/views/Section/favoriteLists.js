import axios from 'axios';
import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import { Helmet } from 'react-helmet'; 
import Loader from '../../common/Loader';

const Container = styled.div`
    // height: calc(100vh - 50px);
    height: 100vh;
    width:100%;
    display:flex;
    justify-content: center;
`;

const Content = styled.div`
    display: grid;
    grid-template-columns: auto auto;
    grid-template-rows: 70px;
    gap: 60px;
    // display: flex;
`;

const FavoriteGrid = styled.div`
    display: grid;
    grid-template-columns: 50px 200px 40px;
`;

const Image = styled.div`
    background-size: cover;
    background-position: center center;
    max-width: 100%;
    height: 100px;
`;

const FavoriteTitle = styled.h4`
    font-size: 15px;
    margin-left: 15px;
`;

const FavoriteButton = styled.button`
    background-color: #00C73C;
    color: #FFFFFF;
    height: 30px;
    width: 60px;
    border: none;
    font-size: 9px;
    margin-top: 50%;
`;

function FavoriteLists() {
    const [FavoriteLists, setFavoriteLists] = useState();
    const [DeleteOk, setDeleteOk] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleOnClick = async(movieId) => {
        let variable;
        console.log("event", movieId)
        if(movieId) {
            variable = {movieId, userId: localStorage.getItem("userId")} 
        } else {
            // variable = {showId : FavoriteLists.showId, userId: FavoriteLists.userId}
        }
        await axios.post('/api/favorite/removeToFavorite', variable)
        .then(response => {
            try {
                if(response.data.success) {
                    setDeleteOk(true);
                }
            } catch(error) {
                console.log(error)
            } finally {
                setDeleteOk(false)
            }
        })
    }

    const fetchData = async() => {
        try {
            setLoading(true);
            const variable = { userId: localStorage.getItem('userId') };
            await axios.post('/api/favorite/favoriteLists', variable)
            .then(response => {
                if(response.data.success) {
                    setFavoriteLists(response.data.lists);
                } else {
                    alert('관심 목록을 불러오지 못했습니다.')
                }
            });
        } catch(error) {
            console.log("error", error);
        } finally {
            setLoading(false);
        }
    }
    useEffect(() => {
        fetchData();
    }, [DeleteOk])
    return (
        <Container>
            <Helmet>
                <title>관심목록 | Serise-One</title>
            </Helmet>
        {loading && <Loader />}            
        {FavoriteLists && (
            <Content>
            {FavoriteLists.map(movie => (
            <FavoriteGrid key={movie._id}>
                <Image style={{backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.coverImg})`}} />
                <FavoriteTitle>{movie.title}</FavoriteTitle>
                <FavoriteButton onClick={() => handleOnClick(movie.movieId)}>✔관심</FavoriteButton>
            </FavoriteGrid>
            ))}
            </Content>
        )}            
        </Container>
    )
}

export default FavoriteLists;
