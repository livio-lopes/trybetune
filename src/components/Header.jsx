import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Header extends Component {
  render() {
    const { userName } = this.props;
    return (
      <div data-testid="header-component">
        Header
        <h1 data-testid="header-user-name">{userName}</h1>
      </div>
    );
  }
}

Header.propTypes = {
  userName: PropTypes.string,
}.isRequerid;
