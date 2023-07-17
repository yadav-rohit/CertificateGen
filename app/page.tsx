import React from 'react';
import CertificateGenerator from './CertificateGenerator';

const App = () => {
  return (
    <div style={{textAlign: 'center' , display: 'flex' , flexDirection: 'column' , height: '100svh' , width: '100vw',  padding:'10px'}}>
      <h1 style={{margin: '0.5em' , fontSize: '3em' , fontFamily: 'monospace'}}>Certificate Generator</h1>
      <CertificateGenerator />
    </div>
  );
};

export default App;
