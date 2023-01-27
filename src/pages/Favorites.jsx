import React, { Component } from 'react';
import Header from '../components/Header';
import LoadingScreen from '../components/LoadingScreen';
import MusicCard from '../components/MusicCard';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
// import FavoriteMusics from '../components/FavoriteMusics';

export default class Favorites extends Component {
  state = {
    loadingOfFavorites: false,
    listOfFavorites: [],
  };

  componentDidMount() {
    this.recoveryFavorites();
  }

  recoveryFavorites = () => {
    this.setState({ loadingOfFavorites: true });
    getFavoriteSongs().then((r) => {
      this.setState({
        listOfFavorites: r,
        loadingOfFavorites: false,
      });
    });
  };

  // loadScreenFavorite = (callback, param = '') => {
  //   this.setState({ loadingOfFavorites: true });
  //   callback(param).then(() => { this.setState({ loadingOfFavorites: false }); });
  // };

  loadScreen = (callback, param = '') => {
    this.setState({ loadingOfFavorites: true });
    callback(param).then(() => { this.setState({ loadingOfFavorites: false }); });
  };

  render() {
    const { loadingOfFavorites, listOfFavorites } = this.state;
    return (
      <div data-testid="page-favorites">
        <Header />
        {loadingOfFavorites && (<LoadingScreen />)}

        {listOfFavorites.map((e, i) => (

          <MusicCard
            key={ i }
            { ...e }
            // loadScreenFavorite={ this.loadScreenFavorite }
            loadScreen={ this.loadScreen }
          />

        ))}

      </div>
    );
  }
}
