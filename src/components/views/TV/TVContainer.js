import React, { useEffect, useState } from 'react';
import { tvApi } from '../../../api';
import TVPresenter from './TVPresenter';

export default function TVContainer() {
    const [topRated, setTopRated] = useState([]);
    const [popular, setPopular] = useState([]);
    const [airingToday, setAiringToday] = useState([]);
    const [loading, setLoading] = useState(true);
    const [] = useState([]);

    async function fetchData() {
        const {data: {results: topRated}} = await tvApi.topRated();
        console.log("topRated", topRated);
        const {data: {results: popular}} = await tvApi.popular();
        const {data: {results: airingToday}} = await tvApi.airingToday();
        setTopRated(topRated);
        setPopular(popular);
        setAiringToday(airingToday);
    }
    useEffect(() => {
        try {
            fetchData();
        } catch {

        } finally {
            setLoading(false);
        }
    }, [])
    return (
        <TVPresenter
            topRated={topRated}
            popular={popular}
            loading={loading}
        />
    )
    
    

}