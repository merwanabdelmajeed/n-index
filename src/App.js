import React from 'react';
import Questionnaire from './Questionnaire';
import { useEffect } from "react";


function App() {
  useEffect(() => {
    window.scrollTo(0, 0); // Scrolls to the top of the page
  }, []);
  return (
    <div className="App">
      <Questionnaire />
    </div>
  );
}

export default App;
