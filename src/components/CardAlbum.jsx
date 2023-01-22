import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export default class CardAlbum extends Component {
  render() {
    const {
      collectionName,
      artworkUrl100,
      artistName,
      collectionId,
      artistId } = this.props;
    return (
      <div>
        <Link
          key={ artistId }
          to={ `/album/${collectionId}` }
          data-testid={ `link-to-album-${collectionId}` }
        >
          <img src={ artworkUrl100 } alt={ artistName } />
          <h3>{collectionName}</h3>
          <p>{artistName}</p>

        </Link>
      </div>
    );
  }
}

CardAlbum.propTypes = {
  collectionName: PropTypes.string,
  artworkUrl100: PropTypes.string,
  artistName: PropTypes.string,
}.isRequired;
