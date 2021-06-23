import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const Container = styled.div`
    display: flex;
    justify-content: center;
    :not(:last-child){
        margin-bottom: 50px;
        margin-top: 30px;
    }`;
const Title = styled.span`
    font-size: 22px;
    font-weight: 600;
    margin-left: 17px;
    /* padding-top: 20px; */
    `;
const Grid = styled.div`
    margin-top: 25px;
    display: grid;
    grid-template-columns: repeat(5, 100px);
    grid-gap: 25px;
    `;


const Section = ({title, children}) => (
    <Container>
        <span className={'text-lg font-semibold ml-4 pt-5 text-red-600'}>{title}</span>
        <Grid>{children}</Grid>
    </Container>
);

Section.propTypes = {
    title: PropTypes.string.isRequired,
    children: PropTypes.oneOfType([
          PropTypes.arrayOf(PropTypes.node),
          PropTypes.node
        ])
};

export default Section;
