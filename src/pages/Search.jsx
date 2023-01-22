import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';

export default class Search extends Component {
  state = {
    inputSearch: '',
    disableSearch: true,
  };

  handleSearch = ({ target }) => {
    const { value } = target;
    this.setState({
      inputSearch: value,
      disableSearch: value.length < 2,
    });
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
        >
          Pesquisar

        </button>
      </form>
    );
  };

  render() {
    const { userName } = this.props;
    return (
      <div data-testid="page-search">
        Search
        <Header userName={ userName } />
        {this.renderSearch()}

      </div>
    );
  }
}

Search.propTypes = {
  userName: PropTypes.string,
}.isRequired;
