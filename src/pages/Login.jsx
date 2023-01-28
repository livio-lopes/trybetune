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
import '../styles/Login.css';
import logo from '../pictures/logo.svg';

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
      <div className="div-login">
        <img className="logo-login" src={ logo } alt="Logo TrybeTune" />

        <label
          htmlFor="inputName"
        >
          <input
            className="input-login"
            data-testid="login-name-input"
            type="text"
            name="inputName"
            id="inputName"
            value={ inputName }
            onChange={ handleLogin }
            placeholder="qual o seu nome?"
          />
        </label>
        <button
          className="btn-login"
          data-testid="login-submit-button"
          type="button"
          disabled={ disableLogin }
          onClick={ clickLogin }
        >
          ENTRAR
        </button>

      </div>
    );
  };

  render() {
    const { loadindScreen, logged } = this.props;
    const { loadingScreenLogged } = this.state;
    return (
      <div
        className="container-login"
        data-testid="page-login"
      >
        {loadindScreen ? <LoadingScreen /> : this.renderForm()}
        {logged && (<Redirect to="/search" />)}
        {loadingScreenLogged && <LoadingScreen />}
        <Switch>
          <Route exact path="/search">
            <Search
              { ...this.state }
            />

          </Route>
          <Route
            exact
            path="/album/:id"
          >
            { (props) => (<Album
              { ...props }
              { ...this.state }

            />)}

          </Route>
          <Route exact path="/favorites">
            <Favorites { ...this.state } />
          </Route>
          <Route exact path="/profile"><Profile { ...this.state } /></Route>
          <Route exact path="/profile/edit"><ProfileEdit { ...this.state } /></Route>
          <Route path="*" component={ NotFound } />
        </Switch>
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
