import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { moviesApi, tvApi } from "../../../api";
import DetailPresenter from "./DetailPresenter";

export default function DetailContainer() {
    const [result, setResult] = useState();
    const [loading, setLoading] = useState(true);
    const [videoKey, setVideoKey] = useState();
    const {pathname} = useLocation();
    const {id} = useParams();
    const isMovie = pathname.includes('/movie/');
    
    async function fetchData() {
        let result = null;
        const parseId = parseInt(id);
        try {
            if(isMovie) {
                ({data: result} = await moviesApi.movieDetail(parseId));
                setResult(result);
                console.log("movie result", result);
                if(result.videos.results[0].key) {
                    setVideoKey(result.videos.results[0].key) 
                } else {
                    setVideoKey(null)
                }
            } else {
                ({data: result} = await tvApi.showDetail(parseId));
                setResult(result);
                console.log("show result", result);
            }
        } catch {

        } finally {
            setResult(result);
            setLoading(false);

            }
        }
    useEffect(() => {
        fetchData();
    }, [])
    
    return (
        <>
        <DetailPresenter
            key={id}
            id={id}
            result={result}
            isMovie={isMovie}
            loading={loading}
            videoKey={videoKey}
        />
        </>
    )
};