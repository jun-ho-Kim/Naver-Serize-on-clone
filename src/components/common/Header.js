import React, { useState } from "react";
import { Link, withRouter } from "react-router-dom";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { auth, logoutUser } from "../../_actions/user_actions";

const Div = styled.div`
    width: max;
    padding: 5px 0px;
`;

const rightTap = styled.span`
`



const TopHeader = styled.header`
    display: flex;
    align-items: center;
    justify-content: space-around;
`;

const ProfileList = styled.div`
    display: flex;
`;

const Header = styled.header`
 width:100%;
 height: 155px;
 background-color: #FFFFFF;
 z-index: 10;
 `;
 const List = styled.ul`
 padding:0 10%;
 height: 50px;
 list-style:none;
 display: flex;
 align-items: center;
 border: 2px solid #F1F1F1;
 `;
 
 const Item = styled.li`
 margin:0;
 padding:0;
 list-style:none;
 width:70px;
 height: 100%;
 dispay: flex;
 text-align: center;
 align-items: center;
 justify-content: center;    
 background-color: 
 ${props => (props.current ? "#03C73C" : "transparent")};
 `;
 const BoxLink = styled(Link)`
    margin:0;
    padding:0;
    text-decoration: none;
    color: #07050A;
    font-size:40px;
`;
 const TapBox = styled.div`
    height: 100%;
    padding: 0.6rem 0;
 `
 
 const TapLink = styled(Link)`
    margin:0;
    text-decoration: none;
    font-size: 18px;
    font-weight: 600;
    color: ${props => (props.current ? "#FFFFFF": "#07050A")};
`;

 export default  withRouter (({location: {pathname}}) => {
    const dispatch = useDispatch();
    const [isAuth, setIsAuth] = useState(false);
    const user = dispatch(auth())
    .then(response => {
        if(response.payload) {
            console.log("response", response.payload);
            if(response.payload.isAuth) {
                setIsAuth(true);
            }

        }
    });
    const handleOnLogout = () => {
        dispatch(logoutUser)
        .then(response => {
            console.log("logout response", response);
        })
    }


    console.log("heaeder USer", user)
    return (
    <Header>
        {console.log("heaer props")}
        <Div>
            <TopHeader>

            <h1>
                <BoxLink to='/'>Serise One</BoxLink>
            </h1>
            {isAuth === false ? (
            <ProfileList>
                    <Link className='mr-4' to='/login' > 로그인 </Link>
                    <Link to='/create-account' > 회원가입</Link>
            </ProfileList>
            ) : (<Link 
                    to='/logout'>로그아웃</Link>)
        }
        </TopHeader>
        </Div>
        <List>
            <Item current={pathname ==="/"}>
                <TapBox className={'ml'}>
                    <TapLink current={pathname ==="/"} to="/">영화</TapLink>
                </TapBox>
            </Item>
            {/* <Item current={pathname ==="/show"}>
                <TapBox>
                    <TapLink current={pathname ==="/show"} to="/show">방송</TapLink>
                </TapBox>
            </Item> */}
            <Item current={pathname === "/search"}>
                <TapBox>
                    <TapLink current={pathname ==="/search"} to="/search">검색</TapLink>
                </TapBox>
            </Item>
            <Item current={pathname ==="/my/library"}>
                <TapBox>
                    <TapLink current={pathname ==="/my/library"} to="/my/library">My</TapLink>
                </TapBox>
            </Item>
        </List>
    </Header>
    )
});