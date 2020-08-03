import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Route from './routes';
import Home from '../pages/Home';
import Details from '../pages/Details';

function Routes() {
  return (
    <BrowserRouter>
      <Route exact path="/" component={Home} />
      <Route path="/movie" component={Details} isPrivate />
    </BrowserRouter>
  );
}

export default Routes;
