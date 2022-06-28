import React from 'react';
import { useEffect } from 'react';
import axios from 'axios';

function LandingPage(props) {
  useEffect(() => {
    axios.get('/api/hello').then((res) => {
      console.log(res.data);
    });
  }, []);
  return <>Landing</>;
}

export default LandingPage;
