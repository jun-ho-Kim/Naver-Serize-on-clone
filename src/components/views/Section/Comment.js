import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import { useHistory } from 'react-router-dom';
import Loader from '../../common/Loader'; 

export const Comment = ({postId}) => {
    const history = useHistory();
    const {register, getValues, watch, handleSubmit, setValue, reset} = useForm();
    const [comments, setComments] = useState();
    const [loading, setLoading] = useState(false);
    const [commentLength, setCommentLength] = useState();
    const { commentValue } = watch();
    let variable;
    let array;
    const getComments = async() => {
        try {
            setLoading(true)
            let variable = {postId}
            await axios.post('/api/comment/getComment', variable)
                .then(response => {
                    setComments(response.data.comments)
                });
        } catch(error) {
            console.log("get comment err", error);
        } finally {
        setLoading(false);
        }
    };

    const hanldeOnChange = (event) => {
        if(!localStorage.getItem('userId')) {
            alert('로그인 후 이용해주세요');
            history.push('/login')
        };
        setCommentLength(event.target.value);
    };

    const handleonSubmit = async() => {
        try {
            if(!localStorage.getItem('userId')) {
                alert('로그인 후 이용해주세요')
            } else {
                variable = {writer: localStorage.getItem('userId'), postId, content: commentValue }
                await axios.post('/api/comment/saveComment', variable)
                .then(response => {
                    array = response.data.result
                    // setComments(...comments, response.data.result[0])
            })
            }
        } catch {
        } finally {
            reset(commentValue);
        }
    };

    useEffect(() => {
        getComments();
    }, [,comments])

    return (
    <div className='h-screen w-screen flex flex-col justify-start items-center bg-white'>
        <form
            className='flex flex-col w-full justify-center items-center'
            onSubmit={handleSubmit(handleonSubmit)}>
                <textarea
                    ref={register()}
                    name="commentValue"
                    placeholder="댓글..."
                    className='w-6/12 h-28 rounded-md border-2 border-gray-400'
                    maxLength={500}
                    onChange={hanldeOnChange}
                />
                <div className='flex justify-between w-6/12'>
                    <span className='ml-2 mt-2'>{commentLength?.length ? commentLength?.length : 0}/500</span>
                    <button className='mt-1 bg-green-600 h-10 px-4 rounded-lg hover:text-white'>제출</button>

                </div>

        </form>
            <div className='w-6/12 flex flex-col justify-start items-start'>
                {comments && comments.map((comment, index) => (
                    <div key={index} className='mt-2 border-b-2 w-full'>
                        <div className='flex'>
                            <div 
                                style={{backgroundImage: `url(${comment.writer.image})`}}
                                className='w-5 h-5 bg-center bg-cover mr-3' 
                            />
                            <span className=' text-base font-semibold'>
                                {comment.writer.name.length>3 ? `${comment.writer.name.substring(0,3)}***`: `${comment.writer.name}***`}
                            </span>
                        </div>
                        <p className='my-2'>{comment.content}</p>
                        <span className='opacity-60'>{comment.createdAt.substring(2,10).replace(/-/g, ".")}</span>
                    </div>
                ))}
            </div>
    </div>
    )
}