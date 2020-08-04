import React from 'react';
import ScrollContainer from 'react-indiana-drag-scroll';
import { MdStar, MdPlayArrow } from 'react-icons/md';
import { imgUrl } from '../services/api';

function SectionPosterHorizontal(props) {
  return (
    <div className="horizontal-section" data-testid={props.test}>
      <div className="horizontal-header">
        <h3>{props.title}</h3>
        <p>{props.description}</p>
      </div>
      <div className="horizontal-main">
        <ScrollContainer
          ignoreElements="svg"
          vertical={false}
          className="scroll-container"
        >
          {props.movies.map((movie) =>
            movie.backdrop_path ? (
              <div className="horizontal-movie" key={movie.id}>
                <div className="img-container">
                  <img
                    src={imgUrl + movie.backdrop_path}
                    alt={'poster do filme' + movie.title}
                    onClick={() => props.details(movie.id)}
                  />
                  <MdPlayArrow
                    onClick={() => props.details(movie.id)}
                    className="icon"
                    size={80}
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

export default SectionPosterHorizontal;
