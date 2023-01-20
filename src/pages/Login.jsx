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
import { getUser } from '../services/userAPI';

export default class Login extends Component {
  state = {
    userName: '',
    loadingScreenLogged: false,
  };

  componentDidMount() {
    this.userLogged();
  }

  userLogged = () => {
    this.setState({ loadingScreenLogged: true });
    getUser().then((r) => {
      this.setState({
        loadingScreenLogged: false,
        userName: r.name,
      });
    });
  };

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
    const { loadingScreenLogged } = this.state;
    return (
      <div data-testid="page-login">
        <Switch>
          <Route path="/search"><Search { ...this.state } /></Route>
          <Route path="/album/:id"><Album { ...this.state } /></Route>
          <Route path="/favorites"><Favorites { ...this.state } /></Route>
          <Route exact path="/profile"><Profile { ...this.state } /></Route>
          <Route path="/profile/edit"><ProfileEdit { ...this.state } /></Route>
          <Route path="*" component={ NotFound } />
        </Switch>
        {loadindScreen ? <LoadingScreen /> : this.renderForm()}
        {logged && (<Redirect to="/search" />)}
        {loadingScreenLogged && <LoadingScreen />}
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
