import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import { loginUser, registerUser } from "../../../_actions/user_actions";
import { Link } from "react-router-dom";
import { Helmet } from 'react-helmet'; 
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { Button } from '../../common/button';
import { FormError } from '../../common/form-error'
import moment from "moment";

function RegisterPage(props) {
  const {getValues, register, handleSubmit, errors, formState} = useForm();
  const {email, password, name, lastname} = getValues();
  const dispatch = useDispatch();

    
      // initialValues={{
      //   email: '',
      //   lastName: '',
      //   name: '',
      //   password: '',
      //   confirmPassword: ''
      // }}
     
      const handleOnSubmit = () => {
        setTimeout(() => {
          let dataToSubmit = {
            email,
            password,
            name,
            lastname,
            image: `http://gravatar.com/avatar/${moment().unix()}?d=identicon`
          };

          dispatch(registerUser(dataToSubmit)).then(response => {
            if (response.payload.success) {
              props.history.push("/login");
            } else {
              alert(response.payload.err.errmsg)
            }
          })

      })
    }
    
     
        return (
          <div className="w-screen h-screen min-w-max flex justify-center">
            <Helmet>
                <title>회원가입 | Serise-One</title>
            </Helmet>
            <div className='font-bold'>
            <h1
                className='mb-2 text-2xl font-bold text-center'
            >
                회원가입
            </h1>
            <form
                className='grid gap-2 '
                onSubmit={handleSubmit(handleOnSubmit)}
            >   
                <label>이메일</label>
                <input
                    className="border font-bold border-gray-400 rounded-md py-3 px-5 focus:ring-1 focus:ring-black focus:ring-offset-1 focus:ring-offset-gray-500 focus:ring-opacity-80 outline-none transition duration-500"
                    ref={register({
                        required: "이메일을 입력해주세요",
                        pattern: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s  @"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                    })}
                    name="email"
                    type="email"
                    placeholder="이메일"
                    size={27}
                />
                {errors.email?.message && <FormError error={errors.email?.message} />}
                {errors.email?.type === "pattern" && <FormError error="이메일을 입력해주세요" />}
                <label>이름</label>
                <input
                    className="border font-bold border-gray-400 rounded-md py-3 px-5 focus:ring-1 focus:ring-black focus:ring-offset-1 focus:ring-offset-gray-500 focus:ring-opacity-80 outline-none transition duration-500"
                    ref={register({
                        required: "닉네임을 입력해주세요."
                    })}
                    name="name"
                    type="text"
                    placeholder="이름"
                />
                {errors.nickName?.message && <FormError error={errors.nickName?.message} />}
                {errors.nickName?.type === "pattern" && <FormError error="닉네임을 입력해주세요" />}
                <label>성</label>
                <input
                    className="border font-bold border-gray-400 rounded-md py-3 px-5 focus:ring-1 focus:ring-black focus:ring-offset-1 focus:ring-offset-gray-500 focus:ring-opacity-80 outline-none transition duration-500"
                    ref={register({
                        required: "닉네임을 입력해주세요."
                    })}
                    name="lastname"
                    type="text"
                    placeholder="이름"
                />        
                <label>비밀번호</label>      
                <input
                    className="border font-bold border-gray-400 rounded-md py-3 px-5 focus:ring-1 focus:ring-black focus:ring-offset-1 focus:ring-offset-gray-500 focus:ring-opacity-80 outline-none transition duration-500"
                    ref={register({
                            required: "비밀번호를 입력하세요",
                            minLength: {
                                value: 5,
                                message: '비밀번호는 5자리 이상 입력해야 합니다.'
                            },
                            maxLength: {
                                value: 16,
                                message: '비밀번호는 16자리 이하 입력해야 합니다.'
                            }
                        })}
                    size={27}
                    maxLength={16}
                    name="password"
                    type="password"
                    placeholder="비밀번호"
                />
                {errors.password?.message && <FormError error={errors.password?.message}/>}
                <label>비밀번호 확인</label>  
                <input
                    className='border font-bold border-gray-400 rounded-md py-3 px-5 focus:ring-1 focus:ring-black focus:ring-offset-1 focus:ring-offset-gray-500 focus:ring-opacity-80 outline-none transition duration-500'
                    ref={register({
                        required: "비밀번호를 입력하세요",
                        validate: (v) => {
                            if(v !== getValues().password) {
                                return "비밀번호가 일치하지 않습니다."
                            }
                            return true
                        }
                    })}
                    maxLength={16}
                    name="passwordConfirm"
                    type="password"
                    placeholder="비밀번호확인"
                />
                {errors.passwordConfirm?.message && <FormError error={errors.passwordConfirm?.message} />}
                {/* <label>접근권한</label>  
                <select
                    className='border font-bold border-gray-400 rounded-md py-3 px-5 focus:ring-1 focus:ring-black focus:ring-offset-1 focus:ring-offset-gray-500 focus:ring-opacity-80 outline-none transition duration-500'
                    name="role"
                    ref={register({required: true})}
                >

                {Object.keys(UserRole).map((role, index) => (
                    <option key={index}>{role}</option>
                )
                )}
                </select> */}

                <Button
                    canClick={formState.isValid}
                    text="회원가입"
                />
                <Link to='/'
                    className='mt-3 hover:underline text-center font-extrabold text-sm text-gray-400 hover:text-pink-500'
                >로그인</Link>
              
            </form>
            </div>
        </div>
  );
};


export default RegisterPage
