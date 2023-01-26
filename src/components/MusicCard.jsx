import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { addSong, getFavoriteSongs } from '../services/favoriteSongsAPI';

export default class MusicCard extends Component {
  state = { saveTrack: false };

  componentDidMount() {
    this.carregaFavorito();
  }

  handleClick = ({ target }) => {
    const { loadScreen } = this.props;
    const { checked } = target;
    this.setState({ saveTrack: checked });
    if (checked) {
      loadScreen(addSong, { ...this.props });
    }
  };

  carregaFavorito = async () => {
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
          Favorita

          <input
            data-testid={ `checkbox-music-${trackId}` }
            type="checkbox"
            name="saveTrack"
            id={ trackId }
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
