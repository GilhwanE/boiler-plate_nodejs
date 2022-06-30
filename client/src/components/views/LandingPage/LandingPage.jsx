import React from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const Container = styled.div`
  width: 100%;
  height: 100vh;
`;

function LandingPage(props) {
  useEffect(() => {
    axios.get('/api/hello').then((res) => {
      console.log(res.data);
    });
  }, []);

  const onClickHandler = () => {
    axios.get('api/users/logout').then((response) => {
      if (response.data.success) {
      }
    });
  };
  return (
    <Container>
      <h2>랜딩페이지</h2>
      <button onClick={onClickHandler}> 로그아웃 </button>
    </Container>
  );
}

export default LandingPage;
