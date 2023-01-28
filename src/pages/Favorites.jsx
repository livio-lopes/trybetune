import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import LoadingScreen from '../components/LoadingScreen';
import MusicCard from '../components/MusicCard';

export default class Favorites extends Component {
  state = {
    loadingFavorites: false,
    listFavorites: [],
  };

  componentDidMount() {
    this.recoveryFavorites();
  }

  loadScreen = (callback, param = '') => {
    this.setState({ loadingFavorites: true });
    callback(param).then(() => { this.setState({ loadingFavorites: false }); });
    getFavoriteSongs().then((r) => {
      this.setState({
        listFavorites: [...r],
      });
    });
  };

  recoveryFavorites = () => {
    this.setState({ loadingFavorites: true });
    getFavoriteSongs().then((r) => {
      this.setState({
        listFavorites: r,
        loadingFavorites: false,

      });
    });
  };

  render() {
    const { loadingFavorites, listFavorites } = this.state;
    return (
      <div data-testid="page-favorites">
        Favorites
        <Header />
        {loadingFavorites && (<LoadingScreen />)}
        {listFavorites.map((e, i) => (
          <MusicCard
            key={ i }
            { ...e }
            loadScreen={ this.loadScreen }
          />))}

      </div>
    );
  }
}

Favorites.propTypes = {
  getHandleFavorite: PropTypes.bool,
}.isRequired;
