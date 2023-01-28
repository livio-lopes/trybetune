import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';

export default class MusicCard extends Component {
  state = { saveTrack: false };

  componentDidMount() {
    this.loadFavorite();
  }

  handleClick = ({ target }) => {
    const { loadScreen } = this.props;
    const { checked } = target;

    this.setState({ saveTrack: checked });
    if (checked) {
      return loadScreen(addSong, { ...this.props });
    }
    loadScreen(removeSong, { ...this.props });
  };

  loadFavorite = async () => {
    const { trackId } = this.props;
    const listFavorites = await getFavoriteSongs();
    this.setState({
      saveTrack: listFavorites.some((e) => e.trackId === trackId),
    });
  };

  render() {
    const { trackName, previewUrl, trackId } = this.props;
    const { saveTrack } = this.state;
    return (
      <li>
        <span>{trackName}</span>
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          <code>audio</code>
          .
        </audio>
        <label htmlFor="saveTrack">
          <span>Favorita</span>

          <input
            data-testid={ `checkbox-music-${trackId}` }
            type="checkbox"
            name="saveTrack"
            checked={ saveTrack }
            onChange={ this.handleClick }
          />

        </label>
      </li>
    );
  }
}

MusicCard.propTypes = {
  trackName: PropTypes.string,
  previewUrl: PropTypes.string,
}.isRequired;
