import React from 'react';
import { Router } from "@reach/router";

import UploadPage from './pages/UploadPage';
import ResultPage from './pages/ResultPage';

export default () => {
  return (
    <Router>
      <UploadPage path='/' />
      <ResultPage path='/result' />
    </Router>
  )
}