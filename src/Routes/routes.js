import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useMovieId } from '../Context/ContextProvider';

export default function RouteWrapper({
  component: Component,
  isPrivate,
  ...rest
}) {
  const { movieId } = useMovieId();
  const storagedItem = localStorage.getItem('movie_id');

  if (!movieId && !storagedItem && isPrivate) {
    return <Redirect to="/" />;
  }

  return <Route {...rest} component={Component} />;
}
