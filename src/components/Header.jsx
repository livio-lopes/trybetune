import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export default class Header extends Component {
  render() {
    const { userName } = this.props;
    return (
      <div data-testid="header-component">
        Header
        <h1 data-testid="header-user-name">{userName}</h1>
        <ul>
          <li><Link to="/search" data-testid="link-to-search">Pesquisa</Link></li>
          <li><Link to="/favorites" data-testid="link-to-favorites">Favoritas</Link></li>
          <li><Link to="/profile" data-testid="link-to-profile">Perfil</Link></li>
        </ul>
      </div>
    );
  }
}

Header.propTypes = {
  userName: PropTypes.string,
}.isRequerid;
