import React, { useState, useEffect } from 'react';
import './styles.css';
import './resposivity.css';
import { api, apiKey } from '../../services/api';
import { MdSearch } from 'react-icons/md';
import { useHistory } from 'react-router-dom';
import { useMovieId } from '../../Context/ContextProvider';
import SectionPosterHorizontal from '../../Components/SectionPosterHorizontal';
import SectionPosterVertical from '../../Components/SectionPosterVertical';

function Home() {
  const [popularMovies, setPopularMovies] = useState([]);
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [upcomingMovies, setUpcomingMovies] = useState([]);
  const [nowPlayingMovies, setNowPlayingMovies] = useState([]);
  const [searchedMovies, setSearchedMovies] = useState([]);
  const [movieInput, setMovieInput] = useState();
  const [showSearchedSection, setShowSearchedSection] = useState(false);

  const history = useHistory();
  const { handleMovieId } = useMovieId();
  function renderMovies(path, spot) {
    api.get(`${path}?api_key=${apiKey}&language=pt-BR`).then((response) => {
      spot(response.data.results);
    });
  }

  function getSearchedMovies() {
    api
      .get(`search/movie?api_key=${apiKey}&language=pt-BR&query=${movieInput}`)
      .then((response) => {
        setSearchedMovies(response.data.results);
        console.log(response.data.results);
      });
    setShowSearchedSection(true);
  }

  function getMovieDetails(id) {
    handleMovieId(id);
    history.push('/movie');
  }

  useEffect(() => {
    renderMovies('movie/popular', setPopularMovies);
  }, [popularMovies]);

  useEffect(() => {
    renderMovies('movie/top_rated', setTopRatedMovies);
  }, [topRatedMovies]);

  useEffect(() => {
    renderMovies('movie/upcoming', setUpcomingMovies);
  }, [upcomingMovies]);

  useEffect(() => {
    renderMovies('movie/now_playing', setNowPlayingMovies);
  }, [nowPlayingMovies]);

  return (
    <div className="container">
      <header className="home-header">
        <div className="logo-container">
          <img src={require('../../assets/logo.svg')} alt="logo" />
          <h1>
            <span>Movie</span>DB
          </h1>
        </div>
        <div className="search">
          <button onClick={() => getSearchedMovies()}>
            <MdSearch size={20} color="#636363" />
          </button>
          <input
            type="text"
            placeholder="Buscar"
            onChange={(event) => setMovieInput(event.target.value)}
            onKeyDown={(event) =>
              event.keyCode === 13 ? getSearchedMovies() : false
            }
          />
        </div>
      </header>
      <section className="main">
        {showSearchedSection ? (
          <SectionPosterHorizontal
            details={getMovieDetails}
            title={'Busca'}
            description={`Todos os resultados para ${movieInput}`}
            movies={searchedMovies}
          />
        ) : (
          false
        )}
        <SectionPosterHorizontal
          details={getMovieDetails}
          title={'Nos Cinemas'}
          description={'Filmes em cartaz nos cinemas'}
          movies={nowPlayingMovies}
        />
        <SectionPosterVertical
          title={'Populares'}
          description={'Filmes que estão em alta'}
          details={getMovieDetails}
          movies={popularMovies}
        />
        <SectionPosterVertical
          title={'Mais avaliados'}
          description={'Filmes mais curtidos pela galera'}
          details={getMovieDetails}
          movies={topRatedMovies}
        />
        <SectionPosterVertical
          title={'Em breve'}
          description={'Filmes que chegarão em breve'}
          details={getMovieDetails}
          movies={upcomingMovies}
        />
      </section>
    </div>
  );
}

export default Home;
