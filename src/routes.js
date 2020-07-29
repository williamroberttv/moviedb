import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import Home from './pages/Home';
import Details from './pages/Details';

function Routes() {
  <BrowserRouter>
    <Route exact path="/" component={Home} />
    <Route path="/filme" component={Details} />
  </BrowserRouter>;
}

export default Routes;