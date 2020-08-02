import React from 'react';
import ScrollContainer from 'react-indiana-drag-scroll';
import { imgUrl } from '../services/api';
import { MdPlayArrow, MdStar } from 'react-icons/md';

function SectionPosterVertical(props) {
  return (
    <div className="vertical-main">
      <div className="vertical-header">
        <h3>{props.title}</h3>
        <p>{props.description}</p>
      </div>
      <div className="vertical-main">
        <ScrollContainer
          ignoreElements="svg"
          vertical={false}
          className="scroll-container"
        >
          {props.movies.map((movie) =>
            movie.poster_path ? (
              <div className="vertical-movie" key={movie.id}>
                <div className="img-container">
                  <img
                    src={imgUrl + movie.poster_path}
                    alt={'poster do filme' + movie.title}
                    onClick={() => props.deitals(movie.id)}
                  />
                  <MdPlayArrow
                    onClick={() => props.details(movie.id)}
                    className="icon-vertical"
                    size={100}
                    color="#ff7e6b"
                  />
                </div>
                <h3>{movie.title}</h3>
                <div>
                  <p>{movie.release_date.split('-', 1)}</p>
                </div>
                <div className="rate">
                  <MdStar size={14} color="gold" style={{ marginRight: 10 }} />
                  <p>
                    {movie.vote_average} ({movie.vote_count})
                  </p>
                </div>
              </div>
            ) : (
              false
            )
          )}
        </ScrollContainer>
      </div>
    </div>
  );
}

export default SectionPosterVertical;
