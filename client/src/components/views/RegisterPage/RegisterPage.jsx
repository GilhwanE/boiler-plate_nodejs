import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { registerUser } from '../../../_actions/user_action';
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

function RegisterPage(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [Email, setEmail] = useState('');
  const [Password, setPassword] = useState('');
  const [Name, setName] = useState('');
  const [ConfirmPssword, setConfirmPassword] = useState('');

  const onEmailHandler = (event) => {
    setEmail(event.currentTarget.value);
  };

  const onPasswordHandler = (event) => {
    setPassword(event.currentTarget.value);
  };

  const onConfirmPasswordHandler = (event) => {
    setConfirmPassword(event.currentTarget.value);
  };

  const onNameHandler = (event) => {
    setName(event.currentTarget.value);
  };

  const onSubmitHandler = (event) => {
    event.preventdefault();

    if (Password !== ConfirmPssword) {
      return alert('비밀번호가 다릅니다');
    }

    let body = {
      email: Email,
      password: Password,
      name: Name,
    };

    dispatch(registerUser(body)).then((response) => {
      if (response.payload.success) {
        navigate(-1);
      } else {
        alert('회원가입에 실패했습니다');
      }
    });
  };

  return (
    <Container>
      <LoginForm onSubmit={onSubmitHandler}>
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

        <label>Confirm password</label>
        <input
          type="password"
          name="password"
          autoComplete="on"
          value={ConfirmPssword}
          onChange={onConfirmPasswordHandler}
        />

        <label>Name</label>
        <input type="text" value={Name} onChange={onNameHandler} />

        <SubButton type="submit">회원가입</SubButton>
      </LoginForm>
    </Container>
  );
}

export default RegisterPage;
