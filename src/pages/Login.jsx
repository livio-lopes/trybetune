import React, { Component } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';
import Search from './Search';
import Album from './Album';
import Favorites from './Favorites';
import Profile from './Profile';
import ProfileEdit from './ProfileEdit';
import NotFound from './NotFound';
import LoadingScreen from '../components/LoadingScreen';

export default class Login extends Component {
  renderForm = () => {
    const { inputName, disableLogin, handleLogin, clickLogin } = this.props;
    return (
      <form action="">
        <label htmlFor="inputName">
          <input
            data-testid="login-name-input"
            type="text"
            name="inputName"
            id="inputName"
            value={ inputName }
            onChange={ handleLogin }
            placeholder="Qual o seu nome?"
          />
        </label>
        <button
          data-testid="login-submit-button"
          type="button"
          disabled={ disableLogin }
          onClick={ clickLogin }
        >
          Entrar
        </button>
      </form>
    );
  };

  render() {
    const { loadindScreen, logged } = this.props;
    return (
      <div data-testid="page-login">
        <Switch>
          <Route path="/search" component={ Search } />
          <Route path="/album/:id" component={ Album } />
          <Route path="/favorites" component={ Favorites } />
          <Route exact path="/profile" component={ Profile } />
          <Route path="/profile/edit" component={ ProfileEdit } />
          <Route path="*" component={ NotFound } />
        </Switch>
        {loadindScreen ? <LoadingScreen /> : this.renderForm()}
        {logged && (<Redirect to="/search" />)}
      </div>
    );
  }
}

Login.propTypes = {
  inputName: PropTypes.string,
  disableLogin: PropTypes.bool,
  handleLogin: PropTypes.func,
  clickLogin: PropTypes.func,
}.isRequired;
