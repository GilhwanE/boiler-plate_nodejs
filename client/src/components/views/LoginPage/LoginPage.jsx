import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { loginUser } from '../../../_actions/user_action';
import { useNavigate } from 'react-router-dom';

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 1250px;
  margin: 0 auto;
  min-height: 100vh;
`;

const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
`;

const SubButton = styled.button`
  margin-top: 10px;
`;

function LoginPage(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [Email, setEmail] = useState('');
  const [Password, setPassword] = useState('');

  const onEmailHandler = (e) => {
    setEmail(e.target.value);
  };

  const onPasswordHandler = (e) => {
    setPassword(e.target.value);
  };

  const onSubmitHandler = (e) => {
    e.preventdefault();
    console.log('ggg');
    // console.log('Email', Email);
    // console.log('Password', Password);

    let body = {
      email: Email,
      password: Password,
    };

    dispatch(loginUser(body)).then((response) => {
      if (response.payload.loginSuccess) {
        navigate(-1);
        console.log('성공');
      } else {
        alert('Error');
      }
    });
  };

  return (
    <form onSubmit={onSubmitHandler}>
      <label>Email</label>
      <input type="email" value={Email} onChange={onEmailHandler} />

      <label>password</label>
      <input
        type="password"
        name="password"
        autoComplete="on"
        value={Password}
        onChange={onPasswordHandler}
      />
      <button type="submit">로그인</button>
    </form>
  );
}

export default LoginPage;
