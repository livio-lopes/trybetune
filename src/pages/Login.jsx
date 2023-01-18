import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Search from './Search';
import Album from './Album';
import Favorites from './Favorites';
import Profile from './Profile';
import ProfileEdit from './ProfileEdit';
import NotFound from './NotFound';

export default class Login extends Component {
  state = {
    loginNameInput: '',
  };

  handleChange = ({ target }) => {
    {}
    this.setState({
      [name]=value,
    })
  };

  render() {
    return (
      <div data-testid="page-login">
        <form>
          <label htmlFor="loginNameInput">
            <input
              type="text"
              name="loginNameInput"
              id="loginNameInput"
              placeholder="Nome de Usuário"
              data-testid="login-name-input"
            />
          </label>
          <button
            type="button"
            data-testid="login-submit-button"
          >
            Entrar

          </button>
        </form>
        <Switch>
          <Route path="/search" component={ Search } />
          <Route path="/album/:id" component={ Album } />
          <Route path="/favorites" component={ Favorites } />
          <Route path="/profile" component={ Profile } />
          <Route path="/profile/edit" component={ ProfileEdit } />
          <Route path="*" component={ NotFound } />
        </Switch>
      </div>

    );
  }
}
