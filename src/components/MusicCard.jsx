import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { addSong } from '../services/favoriteSongsAPI';

export default class MusicCard extends Component {
  handleClick = ({ target }) => {
    const { loadScreen } = this.props;
    const { checked, id } = target;
    if (checked) {
      loadScreen(addSong, id);
    }
  };

  render() {
    const { trackName, previewUrl, trackId } = this.props;
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
          Favorita
          <input
            data-testid={ `checkbox-music-${trackId}` }
            type="checkbox"
            name="saveTrack"
            id={ trackId }
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
