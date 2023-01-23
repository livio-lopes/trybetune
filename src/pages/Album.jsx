import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import musicsAPI from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';

export default class Album extends Component {
  state = {
    infoAlbum: {},
    listTracks: [],

  };

  componentDidMount() {
    this.getInfoAlbum();
  }

  getInfoAlbum = () => {
    const { match: { params: { id } } } = this.props;
    musicsAPI(id).then((d) => this.setState({
      infoAlbum: d[0],
      listTracks: d.filter((e, i) => i !== 0),
    }));
  };

  render() {
    const { infoAlbum, listTracks } = this.state;
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
            {listTracks.map(({ trackName, previewUrl }, i) => (
              <MusicCard key={ i } trackName={ trackName } previewUrl={ previewUrl } />
            ))}
          </ul>
        </div>
      </div>
    );
  }
}

Album.propTypes = {
  selectedAlbum: PropTypes.string,
}.isRequired;
