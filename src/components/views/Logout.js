import React from 'react';
import { logoutUser } from '../../_actions/user_actions';
import { useDispatch } from "react-redux";
import { useHistory, useLocation } from 'react-router-dom';

export const Logout = async () => {
    const dispatch = useDispatch();
    const history = useHistory();
    dispatch(logoutUser())
    .then(response => {
        if(response.payload.success) {
            localStorage.removeItem('userId')
            alert("로그아웃이 완료되었습니다.");
            history.push("/")
            window.location.reload()
        } else {
            history.push("/");
        }
    })
    return ;
    
}