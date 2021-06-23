import React from "react";
import PropTypes from "prop-types";
import Loader from "../../common/Loader";
import Section from "../Section/Section";
import Poster from "../Section/Post";


const MoviePresenter = ({nowPlaying, upcoming, popular, topRated, latest, error, loading}) => 
    loading ? <Loader /> : (
        <div>
            {nowPlaying && nowPlaying.length>0 && (
                <Section title="최신 영화">
                    {nowPlaying.map(movie => (
                    <Poster
                        key={movie.id}
                        id={movie.id} 
                        imageUrl={movie.poster_path}
                        title={movie.title}
                        rating={movie.vote_average}
                        year={movie.release_date.substring(0,4)}
                        isMovie={true}
                        />
                    ))}
                </Section>
            )}
            {popular && popular.length>0 && (
                <Section title="인기 영화">
                    {popular.map(movie=>(
                    <Poster
                        key={movie.id}
                        id={movie.id} 
                        imageUrl={movie.poster_path}
                        title={movie.title}
                        rating={movie.vote_average}
                        year={movie.release_date.substring(0,4)}
                        isMovie={true}
                    />
                        ))}
                </Section>
            )}
            {upcoming && upcoming.length>0 && (
                <Section title="Upcoming Movies">
                    {upcoming.map(movie=>(
                    <Poster
                        key={movie.id}
                        id={movie.id} 
                        imageUrl={movie.poster_path}
                        title={movie.title}
                        rating={movie.vote_average}
                        year={movie.release_date.substring(0,4)}
                        isMovie={true}
                    />
                        ))}
                </Section>
            )}
            {topRated && topRated.length>0 && (
                <Section title="TOP10 영화">
                    {topRated.map(movie => (
                    <Poster
                        key={movie.id}
                        id={movie.id} 
                        imageUrl={movie.poster_path}
                        title={movie.title}
                        rating={movie.vote_average}
                        year={movie.release_date.substring(0,4)}
                        isMovie={true}
                        />
                    ))}
                </Section>
            )}
            {latest && latest.length>0 && (
                <Section title="최신 영화">
                    {latest.map(movie => (
                    <Poster
                        key={movie.id}
                        id={movie.id} 
                        imageUrl={movie.poster_path}
                        title={movie.title}
                        rating={movie.vote_average}
                        year={movie.release_date.substring(0,4)}
                        isMovie={true}
                        />
                    ))}
                </Section>
            )}                    
            {/* {error && <Message color="#e67e22" text={error} />} */}
        </div>
    );
;

MoviePresenter.propTypes = {
    nowPlaying: PropTypes.array,
    popular: PropTypes.array,
    upcoming: PropTypes.array,
    loading: PropTypes.bool.isRequired,
    error: PropTypes.string
}

export default MoviePresenter;