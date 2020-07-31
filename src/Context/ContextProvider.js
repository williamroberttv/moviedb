import React, { createContext, useState, useContext } from 'react';

const MovieIdContext = createContext();

export const MovieIdProvider = (props) => {
  const [movieId, setMovieId] = useState();
  const handleMovieId = (id) => setMovieId(id);

  return (
    <MovieIdContext.Provider value={{ movieId, handleMovieId }}>
      {props.children}
    </MovieIdContext.Provider>
  );
};

export const useMovieId = () => {
  const context = useContext(MovieIdContext);

  if (!context) return null;

  return context;
};
