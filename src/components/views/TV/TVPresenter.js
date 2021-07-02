import React from "react";
import Loader from "../../common/Loader";
import Section from "../Section/Section";
import Poster from "../Section/Post";
import { Helmet } from 'react-helmet'; 

const TVPresenter = ({topRated, popular, err, loading}) => 
    loading? <Loader /> : (
        <div>
            <Helmet>
                <title>TV | Serise-One</title>
            </Helmet>        
            {topRated && topRated.length > 0 && (
                <Section title="top 100 방송">
                    {topRated.map((show) => (
                        <Poster
                            key={show.id}
                            id={show.id}
                            imageUrl={show.poster_path}
                            title={show.name}
                            rating={show.vote_average}
                            year={show.first_air_date.substring(0,4)}
                        />
                    ))}
                </Section>
            )}
            {popular && popular.length > 0 && (
                <Section title="인기 방송">
                    {topRated.map((show) => (
                        <Poster
                            key={show.id}
                            id={show.id}
                            imageUrl={show.poster_path}
                            title={show.name}
                            rating={show.vote_average}
                            year={show.first_air_date.substring(0,4)}
                        />
                    ))}
                </Section>
            )}            
        </div>
    );

export default TVPresenter;