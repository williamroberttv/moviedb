import React from 'react';
import Routes from './Routes';
import { MovieIdProvider } from './Context/ContextProvider';

function App() {
  return (
    <MovieIdProvider>
      <Routes />
    </MovieIdProvider>
  );
}

export default App;
