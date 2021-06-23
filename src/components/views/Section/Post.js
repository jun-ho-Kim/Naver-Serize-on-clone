import React from "react";
import PropsTypes from "prop-types";
import {Link} from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
    font-size: 12px;
    margin-left: 15px;
    /* padding: 0px 5px; */
`;

const Image = styled.div`
    background-image: url(${props=>props.bgUrl});
    height: 120px;
    background-size: cover;
    border-radius: 4px;
    background-position: center, center;
    transition: opacity 0.1s linear;
`;
const Title = styled.span`
    display: block;
    margin-bottom: 3px;

`;
const Rating = styled.span`
    position: absolute;
    top:5px;
    right: 5px;
    opacity: 0;
    transition: opacity 0.1s linear;
`;
const Year = styled.span`
    font-size: 10px;
    color: black;
`;
const ImageContainer = styled.div`
    position: relative;
    margin-bottom: 5px;
    &:hover {
        ${Image} {
            opacity: 0.3;
        }
        ${Rating} {
            opacity: 1;
        }
    }
`;
const Poster = ({id, imageUrl, title, rating, year, isMovie = false}) => (
    <Link to={isMovie?`/movie/${id}`: `/show/${id}`}>
        <Container>
            <ImageContainer>
                <Image bgUrl={imageUrl
                ? `https://image.tmdb.org/t/p/w300${imageUrl}`
                : require("../../assets/noPosterSmall.png")
                }/>
                    <Rating>
                        <span role="img" aria-label="rating">
                        ⭐
                        </span>
                        {rating}/10
                    </Rating>
            </ImageContainer>
            <Title>{title.length>18? `${title.substring(0,18)}...`:title}</Title>
            <Year>{year}</Year>
        </Container>
    </Link>
);

Poster.prototype = {
    id: PropsTypes.number.isRequired,
    imageUrl: PropsTypes.string,
    title: PropsTypes.string.isRequired,
    rating: PropsTypes.string,
    year: PropsTypes.string,
    isMovie: PropsTypes.bool,
};

export default Poster;