import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';

export default class Search extends Component {
  render() {
    const { userName } = this.props;
    return (
      <div data-testid="page-search">
        Search
        <Header userName={ userName } />
      </div>
    );
  }
}

Search.propTypes = {
  userName: PropTypes.string,
}.isRequired;
