import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { moviesApi } from '../../../api';
import styled from "styled-components";
import  {Link} from 'react-router-dom'

const Image = styled.div`
`;

const Rating = styled.span`
`;

const Title = styled.span`
`;

const ImageContainer = styled.div`
    &:hover {
        ${Image} {
            opacity: 0.3;
        }
        ${Rating} {
            opacity: 1;
        }
        ${Title} {
            opacity: 1;
        }
    }
`;

export const Search = () => {
    const { register, getValues, watch, handleSubmit, reset } = useForm();
    const [searchResults, setSearchResults] = useState();

    const {searchValue} = watch();
    const handleOnSubmit = async() => {
        const {data: {results}} = await moviesApi.search(searchValue);
        console.log("result", results);
        setSearchResults(results);
        if(results.length === 0) {
            alert("검색결과를 찾을 수 없습니다.")
        };
        reset(searchValue)
    };

    return (
        <div className='flex h-screen flex-col items-center justify-start'>
            <form 
                onSubmit={handleSubmit(handleOnSubmit)} 
                className='border border-gray-400 py-2 rounded-lg'
            >
                <label>
                    <input
                        ref={register()}
                        name='searchValue'
                        className='focus:outline-none w-56'
                        placeholder='검색어를 영어로 입력해주세요...'
                    />
                    <button>🔍</button>
                </label>
            </form>
            <div className='flex flex-wrap w-2/6 mt-6'>
                
                {searchResults && searchResults.map((results, index) => (
                <Link to={`/movie/${results.id}`}>
                    <div key={index} className='' >
                        <ImageContainer className='relative hover:opacity-100'>
                            <Image
                                className='w-24 h-36 bg-cover bg-center mt-8 mx-2 rounded-md' 
                                style={{backgroundImage: `url(https://image.tmdb.org/t/p/original${results.poster_path})`}} />
                                <Rating className='absolute top-0 right-3 text-black opacity-0'>⭐ {results.vote_average}/10</Rating>
                                <Title className='absolute top-1/3 left-2 w-5/6 opacity-0 text-black text-center'>{results.title}</Title>
                                {/* </div> */}
                        </ImageContainer>
                    </div>
                </Link>
                ))
                
            }
            </div>
        </div>
    )
}