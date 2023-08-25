import React, { useState, useEffect } from 'react';
import Main from './components/main/Main';

const App = () => {
  useEffect(() => {
    localStorage.setItem(
      'token',
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2OTI5NDg5MTd9.zVPtHVRaVUqRfEsYmS78ofrNDRov8iInb_nyQA1m1AE'
    );
  }, []);
  return (
    <div className="bg-[#27272B]">
      <Main />
    </div>
  );
};

export default App;
