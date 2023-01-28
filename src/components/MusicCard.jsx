import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';

export default class MusicCard extends Component {
  state = { saveTrack: false };

  componentDidMount() {
    this.loadFavorite();
  }

  // componentDidUpdate() {
  //   const { loadScreenFavorite } = this.props;
  // }

  handleChange = ({ target }) => {
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

  // handleClick = ({ target }) => {
  //   const { checked } = target;
  //   const { loadScreenFavorite } = this.props;
  //   if (!checked) loadScreenFavorite(removeSong, { ...this.props });
  // };

  render() {
    const { trackName, previewUrl, trackId, key } = this.props;
    const { saveTrack } = this.state;
    return (
      <div>
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
            // data-testid={ `checkbox-music-${trackId}` }
            type="checkbox"
            name="saveTrack"
            id={ trackId }
            checked={ saveTrack }
            onChange={ this.handleChange }
          />
          Favorita

        </label>
      </div>
    );
  }
}

MusicCard.propTypes = {
  trackName: PropTypes.string,
  previewUrl: PropTypes.string,
}.isRequired;
