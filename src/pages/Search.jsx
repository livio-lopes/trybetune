import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import LoadingScreen from '../components/LoadingScreen';
import CardAlbum from '../components/CardAlbum';

export default class Search extends Component {
  state = {
    inputSearch: '',
    disableSearch: true,
    loadingSearch: false,
    resultSearch: [],
    printResult: false,
    search: '',
  };

  handleSearch = ({ target }) => {
    const { value } = target;
    this.setState({
      inputSearch: value,
      disableSearch: value.length < 2,
    });
  };

  clickSearch = () => {
    const { inputSearch } = this.state;
    this.setState({
      loadingSearch: true });
    searchAlbumsAPI(inputSearch).then((r) => {
      this.setState({
        resultSearch: r,
        search: r.length === 0 ? '' : inputSearch,
        loadingSearch: false,
        printResult: true,
        inputSearch: '',

      });
    });
  };

  results = () => {
    const { search, resultSearch } = this.state;
    return (
      <div>
        <h2>{`Resultado de álbuns de: ${search}`}</h2>
        <div>
          {resultSearch.map((e, i) => (<CardAlbum
            key={ i }
            { ...e }
          />))}

        </div>
      </div>
    );
  };

  renderResults = () => {
    const { resultSearch } = this.state;
    return (
      <div>
        {resultSearch.length === 0
          ? (<h2>Nenhum álbum foi encontrado</h2>)
          : this.results()}
      </div>

    );
  };

  renderSearch = () => {
    const { inputSearch, disableSearch } = this.state;
    return (
      <form>
        <label htmlFor="inputSearch">
          <input
            type="text"
            name="inputSearch"
            id="inputSearch"
            value={ inputSearch }
            onChange={ this.handleSearch }
            data-testid="search-artist-input"
          />
        </label>
        <button
          type="button"
          disabled={ disableSearch }
          data-testid="search-artist-button"
          onClick={ this.clickSearch }
        >
          Pesquisar

        </button>
      </form>
    );
  };

  render() {
    const { loadingSearch, printResult } = this.state;
    const { userName } = this.props;
    return (
      <div data-testid="page-search">
        Search
        <Header userName={ userName } />
        {loadingSearch ? <LoadingScreen /> : this.renderSearch()}
        {printResult && this.renderResults()}
      </div>
    );
  }
}

Search.propTypes = {
  userName: PropTypes.string,
}.isRequired;
