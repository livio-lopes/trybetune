import React, { Component } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import Search from './Search';
import Album from './Album';
import Favorites from './Favorites';
import Profile from './Profile';
import ProfileEdit from './ProfileEdit';
import NotFound from './NotFound';
import { createUser } from '../services/userAPI';
import LoadingScreen from '../components/LoadingScreen';

export default class Login extends Component {
  state = {
    inputName: '',
    disableLogin: true,
    loadindScreen: false,
    logged: undefined,
  };

  handleLogin = ({ target }) => {
    const { value } = target;
    const minInput = 3;
    this.setState({
      inputName: value,
      disableLogin: value.length < minInput,
    });
  };

  clickLogin = () => {
    const { inputName } = this.state;
    this.setState({ loadindScreen: true });
    createUser({ name: inputName })
      .then((r) => this.setState({ logged: r,
        loadindScreen: false }));
  };

  renderForm = () => {
    const { inputName, disableLogin } = this.state;
    return (
      <form action="">
        <label htmlFor="inputName">
          <input
            data-testid="login-name-input"
            type="text"
            name="inputName"
            id="inputName"
            value={ inputName }
            onChange={ this.handleLogin }
            placeholder="Qual o seu nome?"
          />
        </label>
        <button
          data-testid="login-submit-button"
          type="button"
          disabled={ disableLogin }
          onClick={ () => { this.clickLogin(); } }
        >
          Entrar
        </button>
      </form>
    );
  };

  render() {
    const { loadindScreen, logged } = this.state;
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
        {logged && <Redirect to="/search" />}
      </div>
    );
  }
}
