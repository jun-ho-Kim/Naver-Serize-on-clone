import React, { useEffect, useState } from "react";
import { useLocation } from "react-router";
import {moviesApi} from "../../../api";
import MoviePresenter from "./MoviePresenter";

export default function MovieContainer() {
    const [nowPlaying, setNowPlaying] = useState([]);
    const [upcoming, setUpcoming] = useState([]);
    const [popular, setPopular] = useState([]);
    const [topRated, setTopTated] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const loaction = useLocation();
    async function fetchData() {
        const {data: {results:nowPlaying}} = await moviesApi.nowPlaying();
        const {data: {results:upcoming}} = await moviesApi.upcoming();
        const {data: {results:popular}} = await moviesApi.popular();
        const {data: {results:topRated}} = await moviesApi.topRated();
        setNowPlaying(nowPlaying)
        setUpcoming(upcoming)
        setPopular(popular)
        setTopTated(topRated)
        // console.log("data", data);
        return {nowPlaying, upcoming, popular, topRated}
    }
    // const [Movies, setMovies] = useState([])
    // const [CurrentPage, setCurrentPage] = useState(0)
    // useEffect(() => {
    //     const endpoint = `https://api.themoviedb.org/3/movie/popular?api_key=4484fda9063dbba85a1726755c5d6321&language=en-US&page=1`
    //     fetchMovies(endpoint)
    // }, [])
    // console.log("MOVIES", Movies);
    // const fetchMovies = (path) => {

    //     fetch(path)
    //     .then(response => response.json())
    //     .then(response => {
    //         console.log(response)
    //         setMovies([...Movies,  ...response.results]) 
    //         setCurrentPage(response.page)
    //     })
    // }

    // const handleClick = () => { 
    //     const endpoint =  `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=${CurrentPage + 1}`;
        
    //     fetchMovies(endpoint);
    // }

    
    useEffect(() => {
        try {
            console.log("location", loaction)
            fetchData();
        } catch{
            setError("cant find movies imformation.");
        } finally{
            setLoading(false);
        }
    }, [])
    return (
        <MoviePresenter
            nowPlaying={nowPlaying}
            upcoming={upcoming}
            popular={popular}
            topRated={topRated}
            error={error}
            loading={loading}
        />
    );  
}