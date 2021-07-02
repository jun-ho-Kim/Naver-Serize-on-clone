import React, { useState } from "react";
import { useHistory, withRouter } from "react-router-dom";
import { loginUser } from "../../../_actions/user_actions";
import { Link } from "react-router-dom";
import { Helmet } from 'react-helmet'; 
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { Button } from '../../common/button';
import { FormError } from '../../common/form-error'


export const LoginPage = () => {
  const {register, getValues, handleSubmit, errors, formState} = useForm();
  const history = useHistory();
  const {email, password} = getValues();
  const dispatch = useDispatch();

  const [formErrorMessage, setFormErrorMessage] = useState('')

  console.log("email password", email,password)
  const handleOnSubmit = () => {
    setTimeout(() => {
      let dataToSubmit = {
        email,
        password,
      };
      dispatch(loginUser(dataToSubmit))
        .then(response => {
          if (response.payload.loginSuccess) {
            window.localStorage.setItem('userId', response.payload.userId);
            alert("로그인이 완료되었습니다.")
            history.push("/");
          } else {
            setFormErrorMessage('이메일이나 비밀번호를 다시 확인해주세요.')
          }
        })
        .catch(err => {
          console.log("error", err)
        });
      });
    }
        return (
          <div className={'min-h-screen flex justify-center text-black'}>
          <Helmet><title>login | Serise-One</title></Helmet>
          <div>
          <h1
              className='mb-8 text-2xl font-bold text-center'
          >로그인</h1>
          
          <form
              className={'grid gap-6'}
              onSubmit={handleSubmit(handleOnSubmit)}
          >  
              <input
                  className="border font-bold border-gray-400 rounded-md py-3 px-5 focus:ring-1 focus:ring-black focus:ring-offset-1 focus:ring-offset-gray-500 focus:ring-opacity-80 outline-none transition duration-500"
                  ref={
                    register({required: "이메일을 입력해주세요",
                    pattern: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                  })}
                  name="email"
                  type="email"
                  placeholder="이메일"
                  size={27}
              />
              {errors.email?.type === "pattern" && (<FormError error={"이메일을 입력해주세요"} /> )}
              {errors.email?.message && <FormError error={errors.email?.message}/>}
              <input
                  className="border font-bold border-gray-400 rounded-md py-3 px-5 focus:ring-1 focus:ring-black focus:ring-offset-1 focus:ring-offset-gray-500 focus:ring-opacity-80 outline-none transition duration-500"
                  ref={register({
                      required: "비밀번호를 입력해주세요.",
                      minLength: {
                          value: 3,
                          message: '비밀번호는 5자리 이상 입력해야 합니다.'
                      },
                      maxLength: {
                          value: 16,
                          message: '비밀번호는 16자리 이하 입력해야 합니다.'
                      }
                  })}
                  maxLength={16}
                  name="password"
                  type="password"
                  placeholder="비밀번호"
              />
              {errors.password?.message && <FormError error={errors.password?.message}/>}
              <Button
                  canClick={formState.isValid}
                  text="로그인"
              />
              <Link to='/create-account'
                  className='mt-3 hover:underline text-center font-extrabold text-sm text-gray-400 hover:text-pink-500'
              >회원가입</Link>
          </form>
          </div>
      </div>
  );
};

// export default withRouter(LoginPage);


