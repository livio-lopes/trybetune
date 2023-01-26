import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import musicsAPI from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';
import LoadingScreen from '../components/LoadingScreen';

export default class Album extends Component {
  state = {
    infoAlbum: {},
    listTracks: [],
    loadingFavorite: false,

  };

  componentDidMount() {
    this.getInfoAlbum();
  }

  loadScreen = (callback, param = '') => {
    this.setState({ loadingFavorite: true });
    callback(param).then(() => { this.setState({ loadingFavorite: false }); });
  };

  getInfoAlbum = () => {
    const { match: { params: { id } } } = this.props;
    musicsAPI(id).then((d) => this.setState({
      infoAlbum: d[0],
      listTracks: d.filter((e, i) => i !== 0),
    }));
  };

  getFavorite = (id) => {
    const { listFavorites } = this.state;
    return listFavorites.some((t) => t.trackId === id);
  };

  render() {
    const { infoAlbum, listTracks, loadingFavorite } = this.state;
    const { artistName, collectionName, artworkUrl100 } = infoAlbum;
    return (
      <div data-testid="page-album">
        <Header />
        <div>
          <img src={ artworkUrl100 } alt={ collectionName } />
          <h2 data-testid="album-name">{collectionName}</h2>
          <p data-testid="artist-name">{artistName}</p>
        </div>
        <div>
          <ul>
            {listTracks.map((e, i) => (
              <MusicCard
                key={ i }
                { ...e }
                saveTrack={ () => this.getFavorite() }
                loadScreen={ this.loadScreen }
              />
            ))}
          </ul>
          {loadingFavorite && (<LoadingScreen />)}
        </div>
      </div>
    );
  }
}

Album.propTypes = {
  selectedAlbum: PropTypes.string,
}.isRequired;
